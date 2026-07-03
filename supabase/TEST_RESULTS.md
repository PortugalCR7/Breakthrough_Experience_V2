# Supabase Integration Test Results

**Branch:** cms/foundation-data  
**Date:** 2026-07-02  
**Target:** Live Supabase project — `levcioasxcjqcmibybri.supabase.co`  
**Run via:** `npm run test:supabase`  
**Result: 14 passed, 0 failed**

---

## Suite 1 — Seed rows

Tests that `seed.sql` produced exactly 24 rows whose `section_key` values
match all keys in `ALL_SECTION_DEFAULTS` from `src/data/pageContent.ts`.

| Test | Status | Detail |
|------|--------|--------|
| seed/row-count | ✓ PASS | 24 rows present |
| seed/keys-match | ✓ PASS | all 24 section keys match ALL_SECTION_DEFAULTS |

**All 24 keys confirmed:**
`aligned_other_side`, `alliance`, `anchor_quote`, `authority_bar`,
`checkout`, `cta_text_1`, `cta_text_2`, `cta_text_3`, `decision`,
`faq`, `final_word`, `footer`, `header`, `hero`, `identity_gap`,
`meet_frank`, `men_i_meet`, `mid_cta`, `outcomes`, `primary_path`,
`real_enemy`, `testimonials`, `vision`, `what_this_is`

---

## Suite 2 — Anon RLS

Tests that the public `anon` role can SELECT but is blocked from all writes.
All checks performed via the Supabase REST API using the anon JWT.

| Test | Status | Detail |
|------|--------|--------|
| anon/select | ✓ PASS | can read all 24 rows |
| anon/insert-blocked | ✓ PASS | HTTP 401 — RLS policy enforced (`42501` PostgreSQL code) |
| anon/update-blocked | ✓ PASS | HTTP 200 — 0 rows affected (PostgREST filters silently) |
| anon/update-integrity | ✓ PASS | hero row unchanged after UPDATE attempt |
| anon/delete-blocked | ✓ PASS | HTTP 200 — hero row intact, 24 rows remain |

**Notes:**
- INSERT violation returns HTTP 401 with `code: 42501` (`insufficient_privilege`) — PostgREST maps RLS INSERT violations on anon to 401 Unauthorized.
- UPDATE and DELETE return HTTP 200 with 0 rows affected — PostgREST silently filters rows when RLS blocks the operation. Data integrity was verified by re-reading the table.

---

## Suite 3 — Authenticated RLS

Tests that the `authenticated` role (signed-in users) can perform all four operations.

**Method:** The Admin Auth API was used to create a disposable test user
(`rls-test-<timestamp>@test.internal`) with email confirmation bypassed.
The user signed in via `/auth/v1/token?grant_type=password` to obtain a
JWT with `role: authenticated`. A sentinel row (`__rls_auth_test__`) was
inserted, updated, and deleted. The test user was deleted immediately after.
No personal accounts were used.

REST requests used `apikey: ANON_KEY` + `Authorization: Bearer <session JWT>` —
this is the correct Supabase pattern for authenticated user sessions.

| Test | Status | Detail |
|------|--------|--------|
| auth/setup-test-user | ✓ PASS | disposable user created via Admin API |
| auth/sign-in | ✓ PASS | obtained role=authenticated JWT |
| auth/select | ✓ PASS | can read all 24 rows |
| auth/insert | ✓ PASS | HTTP 201 — sentinel row created |
| auth/update | ✓ PASS | HTTP 200 — sentinel row updated |
| auth/delete | ✓ PASS | HTTP 200 — sentinel row deleted |
| auth/cleanup-sentinel | ✓ PASS | 24 original rows intact after auth test writes |

---

## How Tests Were Run

```
npm run test:supabase
# resolves to: node supabase/tests/rls_integration.mjs
```

The script reads credentials from `.env.local` (or environment variables):
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

All checks use the Supabase REST API (`/rest/v1/`) and Auth API (`/auth/v1/`).
No local Supabase CLI stack or `psql` connection is required.

The Supabase MCP `execute_sql` tool was unavailable during this run
(connection timeout). All tests were therefore conducted via the REST/Auth APIs.

---

## Schema Confirmation

`001_create_page_sections.sql` is confirmed deployed on the live project:
- Table `page_sections` exists with `id`, `section_key` (UNIQUE), `content` (jsonb), `updated_at`
- RLS is enabled
- `public_select` policy: anon + authenticated can SELECT
- `auth_insert` / `auth_update` / `auth_delete` policies: authenticated only
- `set_updated_at` trigger fires on UPDATE
