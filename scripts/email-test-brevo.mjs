const apiKey = process.env.BREVO_API_KEY;
const senderEmail = process.env.BREVO_SENDER_EMAIL;
const senderName =
  process.env.BREVO_SENDER_NAME ?? "Mainland Building Inspections";
const notifyEmail =
  process.env.BUSINESS_NOTIFICATION_EMAIL ?? process.env.STAFF_EMAIL;
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://www.mainlandbuildinginspections.co.nz";

if (!apiKey || !senderEmail) {
  console.error("Missing BREVO_API_KEY or BREVO_SENDER_EMAIL in .env.local.");
  process.exit(1);
}

if (!notifyEmail) {
  console.error(
    "Missing BUSINESS_NOTIFICATION_EMAIL or STAFF_EMAIL in .env.local.",
  );
  process.exit(1);
}

const logoUrl = `${siteUrl.replace(/\/$/, "")}/logo/profile/mainland-mark-email-signature-160.png`;
const htmlContent = `<!DOCTYPE html>
<html lang="en"><body style="margin:0;padding:24px;font-family:Georgia,serif;color:#1a2332;">
  <img src="${logoUrl}" width="72" height="72" alt="Mainland Building Inspections" style="display:block;margin-bottom:12px;border-radius:12px;" />
  <h1 style="font-size:22px;font-weight:400;">Brevo test email</h1>
  <p>Your Brevo API key and sender are working.</p>
</body></html>`;

const res = await fetch("https://api.brevo.com/v3/smtp/email", {
  method: "POST",
  headers: {
    "api-key": apiKey,
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  body: JSON.stringify({
    sender: { name: senderName, email: senderEmail },
    to: [{ email: notifyEmail, name: "Mainland Staff" }],
    subject: "Mainland Inspections — Brevo test",
    htmlContent,
  }),
});

if (!res.ok) {
  console.error("Brevo send failed:", await res.text());
  process.exit(1);
}

console.log(`Brevo test email sent to ${notifyEmail}.`);
