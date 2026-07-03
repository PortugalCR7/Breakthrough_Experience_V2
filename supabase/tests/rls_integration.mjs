#!/usr/bin/env node
/**
 * Integration test: page_sections schema + RLS policies
 *
 * Prerequisites:
 *   VITE_SUPABASE_URL          — project REST endpoint
 *   VITE_SUPABASE_ANON_KEY     — public anon JWT
 *   SUPABASE_SERVICE_ROLE_KEY  — service role JWT (admin ops + authenticated tests)
 *
 * Run:
 *   node supabase/tests/rls_integration.mjs
 *   OR via package.json:
 *   npm run test:supabase
 *
 * Strategy for authenticated-role tests:
 *   The service role key is used to create a short-lived disposable test
 *   user via the Admin Auth API. We sign in as that user to obtain a JWT
 *   with role=authenticated, run write tests, then delete the user.
 *   No personal accounts are used.
 */

import { readFileSync } from 'fs';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

// ---------------------------------------------------------------------------
// Load env from .env.local (two directories up from this file)
// ---------------------------------------------------------------------------
const __dir = fileURLToPath(new URL('.', import.meta.url));
const envPath = resolve(__dir, '../../.env.local');

let envVars = {};
try {
  const raw = readFileSync(envPath, 'utf8');
  for (const line of raw.split('\n')) {
    const m = line.match(/^([A-Z_]+)=(.+)$/);
    if (m) envVars[m[1]] = m[2].trim();
  }
} catch {
  // fall through — will catch missing vars below
}

const SUPABASE_URL   = process.env.VITE_SUPABASE_URL        || envVars.VITE_SUPABASE_URL;
const ANON_KEY       = process.env.VITE_SUPABASE_ANON_KEY   || envVars.VITE_SUPABASE_ANON_KEY;
const SERVICE_KEY    = process.env.SUPABASE_SERVICE_ROLE_KEY || envVars.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !ANON_KEY || !SERVICE_KEY) {
  console.error('Missing env vars. Need: VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const REST  = `${SUPABASE_URL}/rest/v1`;
const AUTH  = `${SUPABASE_URL}/auth/v1`;

// ---------------------------------------------------------------------------
// Test runner helpers
// ---------------------------------------------------------------------------
let passed = 0;
let failed = 0;
const results = [];

function ok(name, detail = '') {
  passed++;
  results.push({ status: 'PASS', name, detail });
  console.log(`  ✓  ${name}${detail ? '  ' + detail : ''}`);
}

function fail(name, detail = '') {
  failed++;
  results.push({ status: 'FAIL', name, detail });
  console.error(`  ✗  ${name}  ${detail}`);
}

/**
 * key    — used as both apikey header AND Authorization (for anon/service tokens)
 * authJwt — when provided, used as Authorization Bearer while key stays as apikey
 *            (needed for signed-in user sessions where key=anon but jwt=user session)
 */
async function restRequest(method, path, key, body, authJwt) {
  const bearerToken = authJwt ?? key;
  const opts = {
    method,
    headers: {
      apikey: key,
      Authorization: `Bearer ${bearerToken}`,
      'Content-Type': 'application/json',
      Prefer: 'return=representation',
    },
  };
  if (body !== undefined) opts.body = JSON.stringify(body);
  const res = await fetch(`${REST}${path}`, opts);
  let data;
  const text = await res.text();
  try { data = JSON.parse(text); } catch { data = text; }
  return { status: res.status, data };
}

// ---------------------------------------------------------------------------
// Expected section keys (mirrors ALL_SECTION_DEFAULTS in src/data/pageContent.ts)
// ---------------------------------------------------------------------------
const EXPECTED_KEYS = [
  'hero', 'header', 'vision', 'authority_bar', 'anchor_quote',
  'men_i_meet', 'real_enemy', 'cta_text_1', 'identity_gap',
  'aligned_other_side', 'cta_text_2', 'meet_frank', 'outcomes',
  'what_this_is', 'testimonials', 'mid_cta', 'primary_path',
  'alliance', 'cta_text_3', 'faq', 'decision', 'final_word',
  'checkout', 'footer',
].sort();

// ---------------------------------------------------------------------------
// SUITE 1: Seed verification — all 24 rows present and keys match
// ---------------------------------------------------------------------------
async function suiteSeed() {
  console.log('\n── Suite 1: Seed rows ──────────────────────────────────');
  const { status, data } = await restRequest(
    'GET', '/page_sections?select=section_key&order=section_key', ANON_KEY
  );

  if (status !== 200 || !Array.isArray(data)) {
    fail('seed/fetch', `HTTP ${status} — ${JSON.stringify(data)}`);
    return;
  }

  const actualKeys = data.map(r => r.section_key).sort();

  if (actualKeys.length === 24) {
    ok('seed/row-count', '24 rows present');
  } else {
    fail('seed/row-count', `expected 24, got ${actualKeys.length}`);
  }

  const missing = EXPECTED_KEYS.filter(k => !actualKeys.includes(k));
  const extra   = actualKeys.filter(k => !EXPECTED_KEYS.includes(k));

  if (missing.length === 0 && extra.length === 0) {
    ok('seed/keys-match', 'all 24 section keys match ALL_SECTION_DEFAULTS');
  } else {
    if (missing.length) fail('seed/keys-missing', missing.join(', '));
    if (extra.length)   fail('seed/keys-extra',   extra.join(', '));
  }
}

// ---------------------------------------------------------------------------
// SUITE 2: Anon RLS — can SELECT, cannot INSERT / UPDATE / DELETE
// ---------------------------------------------------------------------------
async function suiteAnonRLS() {
  console.log('\n── Suite 2: Anon RLS ───────────────────────────────────');

  // SELECT — expect 200 + 24 rows
  const sel = await restRequest('GET', '/page_sections?select=section_key', ANON_KEY);
  if (sel.status === 200 && Array.isArray(sel.data) && sel.data.length === 24) {
    ok('anon/select', 'can read all 24 rows');
  } else {
    fail('anon/select', `HTTP ${sel.status}`);
  }

  // INSERT — expect RLS rejection (HTTP 401 or 403, or 0 rows inserted)
  const ins = await restRequest(
    'POST', '/page_sections', ANON_KEY,
    { section_key: '__rls_anon_test__', content: { _test: true } }
  );
  const insBlocked = ins.status === 401 || ins.status === 403 ||
    (ins.data?.code === '42501') ||
    (Array.isArray(ins.data) && ins.data.length === 0);
  if (insBlocked) {
    ok('anon/insert-blocked', `HTTP ${ins.status} — RLS policy enforced`);
  } else {
    fail('anon/insert-blocked', `HTTP ${ins.status} — ${JSON.stringify(ins.data)}`);
  }

  // UPDATE — expect 0 rows affected (RLS silently filters)
  const upd = await restRequest(
    'PATCH', '/page_sections?section_key=eq.hero', ANON_KEY,
    { content: { _rls_tamper: true } }
  );
  const updBlocked = (Array.isArray(upd.data) && upd.data.length === 0) ||
    upd.status === 401 || upd.status === 403;
  if (updBlocked) {
    ok('anon/update-blocked', `HTTP ${upd.status} — 0 rows affected`);
  } else {
    fail('anon/update-blocked', `HTTP ${upd.status} — ${JSON.stringify(upd.data)}`);
  }

  // Verify hero was NOT modified
  const verify = await restRequest(
    'GET', '/page_sections?section_key=eq.hero&select=content', ANON_KEY
  );
  const heroContent = verify.data?.[0]?.content;
  if (heroContent && !heroContent._rls_tamper) {
    ok('anon/update-integrity', 'hero row unchanged after anon UPDATE attempt');
  } else {
    fail('anon/update-integrity', 'hero row may have been modified');
  }

  // DELETE — expect 0 rows deleted (RLS silently filters; PostgREST returns 200+[] or 204)
  const del = await restRequest(
    'DELETE', '/page_sections?section_key=eq.hero', ANON_KEY
  );

  // Verify hero still exists — this is the definitive check
  const countAfterDel = await restRequest(
    'GET', '/page_sections?select=section_key', ANON_KEY
  );
  const heroGone = !Array.isArray(countAfterDel.data) ||
    !countAfterDel.data.find(r => r.section_key === 'hero');

  if (!heroGone) {
    ok('anon/delete-blocked', `HTTP ${del.status} — hero row intact, 24 rows remain`);
  } else {
    fail('anon/delete-blocked', `hero row was actually deleted (HTTP ${del.status})`);
  }
}

// ---------------------------------------------------------------------------
// SUITE 3: Authenticated RLS — all four operations allowed
// ---------------------------------------------------------------------------
async function suiteAuthRLS() {
  console.log('\n── Suite 3: Authenticated RLS ──────────────────────────');

  // Create a disposable test user via Admin API
  const TEST_EMAIL = `rls-test-${Date.now()}@test.internal`;
  const TEST_PASS  = `RLSTest${Date.now()}!`;
  let authToken = null;
  let testUserId = null;

  try {
    const createRes = await fetch(`${AUTH}/admin/users`, {
      method: 'POST',
      headers: {
        apikey: SERVICE_KEY,
        Authorization: `Bearer ${SERVICE_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: TEST_EMAIL,
        password: TEST_PASS,
        email_confirm: true,
      }),
    });
    const createData = await createRes.json();

    if (!createRes.ok || !createData.id) {
      fail('auth/setup-test-user', `Admin user creation failed: ${JSON.stringify(createData)}`);
      return;
    }
    testUserId = createData.id;
    ok('auth/setup-test-user', `disposable user created (${TEST_EMAIL})`);

    // Sign in to get role=authenticated JWT
    const signInRes = await fetch(`${AUTH}/token?grant_type=password`, {
      method: 'POST',
      headers: {
        apikey: ANON_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: TEST_EMAIL, password: TEST_PASS }),
    });
    const signInData = await signInRes.json();

    if (!signInRes.ok || !signInData.access_token) {
      fail('auth/sign-in', `Sign-in failed: ${JSON.stringify(signInData)}`);
      return;
    }
    authToken = signInData.access_token;
    ok('auth/sign-in', 'obtained role=authenticated JWT');

    // All auth REST calls: apikey=ANON_KEY, Authorization=Bearer <user session JWT>
    const authReq = (method, path, body) =>
      restRequest(method, path, ANON_KEY, body, authToken);

    // SELECT
    const sel = await authReq('GET', '/page_sections?select=section_key');
    if (sel.status === 200 && Array.isArray(sel.data) && sel.data.length === 24) {
      ok('auth/select', 'can read all 24 rows');
    } else {
      fail('auth/select', `HTTP ${sel.status} — ${JSON.stringify(sel.data)}`);
    }

    // INSERT a sentinel row
    const ins = await authReq(
      'POST', '/page_sections',
      { section_key: '__rls_auth_test__', content: { _test: true } }
    );
    const insOk = ins.status === 200 || ins.status === 201 ||
      (Array.isArray(ins.data) && ins.data.length > 0);
    if (insOk) {
      ok('auth/insert', `HTTP ${ins.status} — row created`);
    } else {
      fail('auth/insert', `HTTP ${ins.status} — ${JSON.stringify(ins.data)}`);
    }

    // UPDATE the sentinel row
    const upd = await authReq(
      'PATCH', '/page_sections?section_key=eq.__rls_auth_test__',
      { content: { _test: true, _updated: true } }
    );
    const updOk = upd.status === 200 &&
      Array.isArray(upd.data) && upd.data.length > 0;
    if (updOk) {
      ok('auth/update', `HTTP ${upd.status} — row updated`);
    } else {
      fail('auth/update', `HTTP ${upd.status} — ${JSON.stringify(upd.data)}`);
    }

    // DELETE the sentinel row
    const del = await authReq(
      'DELETE', '/page_sections?section_key=eq.__rls_auth_test__'
    );
    const delOk = del.status === 204 || del.status === 200;
    if (delOk) {
      ok('auth/delete', `HTTP ${del.status} — row deleted`);
    } else {
      fail('auth/delete', `HTTP ${del.status} — ${JSON.stringify(del.data)}`);
    }

    // Confirm sentinel is gone; original 24 rows remain
    const finalCount = await restRequest(
      'GET', '/page_sections?select=section_key', ANON_KEY
    );
    const count = Array.isArray(finalCount.data) ? finalCount.data.length : -1;
    if (count === 24) {
      ok('auth/cleanup-sentinel', '24 original rows intact after auth test writes');
    } else {
      fail('auth/cleanup-sentinel', `row count is ${count} after cleanup`);
    }

  } finally {
    // Always delete the test user
    if (testUserId) {
      await fetch(`${AUTH}/admin/users/${testUserId}`, {
        method: 'DELETE',
        headers: {
          apikey: SERVICE_KEY,
          Authorization: `Bearer ${SERVICE_KEY}`,
        },
      });
      console.log(`  ↩  test user ${TEST_EMAIL} deleted`);
    }
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  console.log('═══════════════════════════════════════════════════════');
  console.log(' Breakthrough — page_sections integration tests');
  console.log(' Target:', SUPABASE_URL);
  console.log('═══════════════════════════════════════════════════════');

  await suiteSeed();
  await suiteAnonRLS();
  await suiteAuthRLS();

  console.log('\n═══════════════════════════════════════════════════════');
  console.log(` Results: ${passed} passed, ${failed} failed`);
  console.log('═══════════════════════════════════════════════════════\n');

  if (failed > 0) process.exit(1);
}

main().catch(err => { console.error(err); process.exit(1); });
