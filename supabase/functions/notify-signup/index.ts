/**
 * notify-signup — Supabase Edge Function
 *
 * Triggered by a Database Webhook on INSERT to the `signups` table.
 * Sends two emails via Resend:
 *   1. Confirmation to the person who signed up
 *   2. Notification to Frank with the full submission
 *
 * DEPLOYMENT STEPS:
 *   1. Deploy this function:
 *        supabase functions deploy notify-signup --project-ref <your-project-ref>
 *   2. Add secrets:
 *        supabase secrets set RESEND_API_KEY=re_xxxxxxxxxxxx --project-ref <your-project-ref>
 *        supabase secrets set FRANK_EMAIL=frank@yourdomain.com --project-ref <your-project-ref>
 *        supabase secrets set WEBHOOK_SECRET=<generate-a-strong-random-string> --project-ref <your-project-ref>
 *   3. Create the Database Webhook in Supabase dashboard:
 *        Database > Webhooks > Create new webhook
 *        Table: signups | Event: INSERT
 *        Type: Supabase Edge Functions
 *        Function: notify-signup
 *        HTTP Headers: add  x-webhook-secret: <same value as WEBHOOK_SECRET secret above>
 *
 * WEBHOOK AUTHENTICATION:
 *   Every incoming request is verified against the WEBHOOK_SECRET env var via
 *   the x-webhook-secret header. Requests without the correct secret are
 *   rejected with 401 before any email is sent. Set the same value in both
 *   the Supabase secret store (WEBHOOK_SECRET) and the webhook HTTP headers.
 *
 * EMAIL "FROM" ADDRESS:
 *   Currently uses Resend's shared test domain (onboarding@resend.dev).
 *   Once DNS verification completes for the client's sending domain,
 *   update FROM_ADDRESS below to e.g. "applications@yourdomain.com".
 *
 * FAILURE HANDLING:
 *   Email failures are logged server-side but do NOT cause this function
 *   to return an error status. The database write (the source of truth)
 *   is always independent of email delivery.
 */

// TODO: replace with verified sending domain once DNS is set up in Resend
const FROM_ADDRESS = "Breakthrough Experience <onboarding@resend.dev>";
const FRANK_EMAIL_DEFAULT = "frank@breakthroughexperience.com"; // fallback if secret not set

interface SignupRecord {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  profile: string | null;
  created_at: string;
}

interface WebhookPayload {
  type: "INSERT" | "UPDATE" | "DELETE";
  table: string;
  record: SignupRecord;
  schema: string;
}

async function sendEmail(
  apiKey: string,
  to: string,
  subject: string,
  html: string
): Promise<void> {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from: FROM_ADDRESS, to, subject, html }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Resend error ${res.status}: ${body}`);
  }
}

Deno.serve(async (req: Request) => {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  // Verify the request originates from our Supabase webhook, not an arbitrary caller.
  // The webhook is configured to send x-webhook-secret matching the WEBHOOK_SECRET env var.
  const webhookSecret = Deno.env.get("WEBHOOK_SECRET");
  const incomingSecret = req.headers.get("x-webhook-secret");
  if (!webhookSecret || incomingSecret !== webhookSecret) {
    return new Response("Unauthorized", { status: 401 });
  }

  const resendApiKey = Deno.env.get("RESEND_API_KEY");
  const frankEmail = Deno.env.get("FRANK_EMAIL") ?? FRANK_EMAIL_DEFAULT;

  if (!resendApiKey) {
    console.error("RESEND_API_KEY secret is not set — emails will not send");
    // Return 200 so Supabase doesn't retry; the DB write already succeeded
    return new Response(JSON.stringify({ ok: false, reason: "missing_api_key" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  let payload: WebhookPayload;
  try {
    payload = await req.json();
  } catch {
    return new Response("Bad Request", { status: 400 });
  }

  if (payload.type !== "INSERT" || payload.table !== "signups") {
    return new Response(JSON.stringify({ ok: true, skipped: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { first_name, last_name, email, phone, profile } = payload.record;
  const fullName = `${first_name} ${last_name}`;

  const emailResults: { applicant: boolean; frank: boolean } = {
    applicant: false,
    frank: false,
  };

  // 1. Confirmation email to the applicant
  // TODO: update copy with final approved wording before launch
  const applicantSubject = "We received your Breakthrough Experience application";
  const applicantHtml = `
    <p>Hi ${first_name},</p>
    <p>
      Thank you for applying to the Breakthrough Experience. We've received your
      application and will be in touch soon with next steps.
    </p>
    <p>
      In the meantime, if you have any questions, just reply to this email.
    </p>
    <p>
      Talk soon,<br />
      The Breakthrough Experience Team
    </p>
  `;

  try {
    await sendEmail(resendApiKey, email, applicantSubject, applicantHtml);
    emailResults.applicant = true;
  } catch (err) {
    console.error("Failed to send applicant confirmation email:", err);
  }

  // 2. Notification email to Frank
  const frankSubject = `New application: ${fullName}`;
  const frankHtml = `
    <h2>New Breakthrough Experience Application</h2>
    <table style="border-collapse:collapse;width:100%;max-width:480px;">
      <tr>
        <td style="padding:6px 12px;font-weight:bold;background:#f5f5f5;">Name</td>
        <td style="padding:6px 12px;">${fullName}</td>
      </tr>
      <tr>
        <td style="padding:6px 12px;font-weight:bold;background:#f5f5f5;">Email</td>
        <td style="padding:6px 12px;"><a href="mailto:${email}">${email}</a></td>
      </tr>
      <tr>
        <td style="padding:6px 12px;font-weight:bold;background:#f5f5f5;">Phone</td>
        <td style="padding:6px 12px;">${phone ?? "—"}</td>
      </tr>
      <tr>
        <td style="padding:6px 12px;font-weight:bold;background:#f5f5f5;">Profile</td>
        <td style="padding:6px 12px;">${profile ?? "—"}</td>
      </tr>
    </table>
  `;

  try {
    await sendEmail(resendApiKey, frankEmail, frankSubject, frankHtml);
    emailResults.frank = true;
  } catch (err) {
    console.error("Failed to send Frank notification email:", err);
  }

  return new Response(JSON.stringify({ ok: true, emails: emailResults }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
});
