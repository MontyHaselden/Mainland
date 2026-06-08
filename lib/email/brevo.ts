import { format, parseISO } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import type { Booking, ContactMessage } from "@/lib/db/schema";
import { NZ_TIMEZONE, SLOT_LABELS, type BookingSlot } from "@/lib/booking/constants";
import { formatFloorAreaDisplay } from "@/lib/booking/property-options";
import { SITE_URL } from "@/lib/seo/business";
import { emailLayout } from "@/lib/email/layout";

type SendResult = { ok: true } | { ok: false; error: string };

export function isBrevoConfigured(): boolean {
  return Boolean(process.env.BREVO_API_KEY && process.env.BREVO_SENDER_EMAIL);
}

async function sendBrevoEmail(payload: {
  to: { email: string; name?: string }[];
  subject: string;
  htmlContent: string;
}): Promise<SendResult> {
  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL;
  const senderName =
    process.env.BREVO_SENDER_NAME ?? "Mainland Building Inspections";

  if (!apiKey || !senderEmail) {
    console.warn("Brevo not configured — skipping email send");
    return { ok: false, error: "Email service not configured" };
  }

  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      sender: { name: senderName, email: senderEmail },
      to: payload.to,
      subject: payload.subject,
      htmlContent: payload.htmlContent,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("Brevo send failed:", text);
    return { ok: false, error: "Failed to send email" };
  }

  return { ok: true };
}

function formatInspectionDate(dateStr: string): string {
  const d = toZonedTime(parseISO(dateStr), NZ_TIMEZONE);
  return format(d, "EEEE, d MMMM yyyy");
}

function bookingDetailsHtml(booking: Booking): string {
  const slot = booking.slot as BookingSlot;
  return `
    <p><strong>Date:</strong> ${formatInspectionDate(booking.inspectionDate)}</p>
    <p><strong>Slot:</strong> ${SLOT_LABELS[slot]}</p>
    <p><strong>Property:</strong> ${booking.propertyAddress}</p>
    ${booking.floorAreaSqm != null || booking.floorAreaBand ? `<p><strong>Floor area:</strong> ${formatFloorAreaDisplay(booking.floorAreaSqm, booking.floorAreaBand)}</p>` : ""}
    ${booking.decadeBuilt ? `<p><strong>Decade built:</strong> ${booking.decadeBuilt}</p>` : ""}
    ${booking.propertyType ? `<p><strong>Property type:</strong> ${booking.propertyType}</p>` : ""}
    ${booking.storeys ? `<p><strong>Storeys:</strong> ${booking.storeys}</p>` : ""}
    ${booking.estimatedPrice != null ? `<p><strong>Estimated price:</strong> $${booking.estimatedPrice}</p>` : ""}
    <p><strong>Customer:</strong> ${booking.customerName}</p>
    <p><strong>Phone:</strong> ${booking.customerPhone}</p>
    <p><strong>Email:</strong> ${booking.customerEmail}</p>
    ${booking.notes ? `<p><strong>Notes:</strong> ${booking.notes}</p>` : ""}
  `;
}

export async function sendCustomerBookingRequestReceived(
  booking: Booking,
): Promise<SendResult> {
  const slot = booking.slot as BookingSlot;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? SITE_URL;
  const bodyHtml = `
    <h1 style="margin:0 0 16px;font-size:24px;font-weight:400;color:#1a2332;">Booking request received</h1>
    <p style="margin:0 0 16px;">Thank you, ${booking.customerName}. We&apos;ve received your inspection request and will review the property details shortly.</p>
    <div style="margin:20px 0;padding:16px 18px;background:#f4f7f5;border-radius:8px;border-left:4px solid #2d6a4f;">
      ${bookingDetailsHtml(booking)}
    </div>
    <p style="margin:0;color:#5c6b7a;">We&apos;ll email you again once your booking is confirmed. If anything looks incorrect, reply to this email or call us.</p>
  `;

  return sendBrevoEmail({
    to: [{ email: booking.customerEmail, name: booking.customerName }],
    subject: `Booking request received — ${formatInspectionDate(booking.inspectionDate)} (${SLOT_LABELS[slot]})`,
    htmlContent: emailLayout({
      title: "Booking request received",
      bodyHtml,
      siteUrl,
    }),
  });
}

export async function sendCustomerConfirmation(
  booking: Booking,
): Promise<SendResult> {
  const slot = booking.slot as BookingSlot;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? SITE_URL;
  const bodyHtml = `
    <h1 style="margin:0 0 16px;font-size:24px;font-weight:400;color:#1a2332;">Booking confirmed</h1>
    <p style="margin:0 0 16px;">Thank you, ${booking.customerName}. Your building inspection is confirmed.</p>
    <div style="margin:20px 0;padding:16px 18px;background:#f4f7f5;border-radius:8px;border-left:4px solid #2d6a4f;">
      ${bookingDetailsHtml(booking)}
    </div>
    <p style="margin:0;color:#5c6b7a;">If you need to make changes, please contact us by phone or email.</p>
  `;

  return sendBrevoEmail({
    to: [{ email: booking.customerEmail, name: booking.customerName }],
    subject: `Inspection confirmed — ${formatInspectionDate(booking.inspectionDate)} (${SLOT_LABELS[slot]})`,
    htmlContent: emailLayout({
      title: "Booking confirmed",
      bodyHtml,
      siteUrl,
    }),
  });
}

export async function sendStaffNewBookingAlert(
  booking: Booking,
): Promise<SendResult> {
  const notifyEmail =
    process.env.BUSINESS_NOTIFICATION_EMAIL ?? process.env.STAFF_EMAIL;
  if (!notifyEmail) {
    return { ok: false, error: "No business notification email configured" };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? SITE_URL;
  const dashboardUrl = `${siteUrl.replace(/\/$/, "")}/staff`;
  const bodyHtml = `
    <h1 style="margin:0 0 16px;font-size:22px;font-weight:600;color:#1a2332;">New booking request</h1>
    <p style="margin:0 0 16px;">A new booking request needs review in the dashboard before confirmation.</p>
    <div style="margin:20px 0;padding:16px 18px;background:#f8f9fb;border-radius:8px;">
      ${bookingDetailsHtml(booking)}
    </div>
    <p style="margin:0;">
      <a href="${dashboardUrl}" style="display:inline-block;padding:12px 20px;background:#2d6a4f;color:#ffffff;text-decoration:none;border-radius:6px;font-family:system-ui,sans-serif;font-size:14px;">Open dashboard</a>
    </p>
  `;

  return sendBrevoEmail({
    to: [{ email: notifyEmail, name: "Mainland Staff" }],
    subject: `New booking — ${booking.customerName} — ${booking.inspectionDate}`,
    htmlContent: emailLayout({
      title: "New booking request",
      bodyHtml,
      siteUrl,
    }),
  });
}

function contactDetailsHtml(message: ContactMessage): string {
  return `
    <p><strong>Email:</strong> ${message.email}</p>
    ${message.phone ? `<p><strong>Phone:</strong> ${message.phone}</p>` : ""}
    ${message.address ? `<p><strong>Address:</strong> ${message.address}</p>` : ""}
    <p><strong>Message:</strong></p>
    <p style="white-space: pre-wrap;">${message.message}</p>
  `;
}

export async function sendStaffContactAlert(
  message: ContactMessage,
): Promise<SendResult> {
  const notifyEmail =
    process.env.BUSINESS_NOTIFICATION_EMAIL ?? process.env.STAFF_EMAIL;
  if (!notifyEmail) {
    return { ok: false, error: "No business notification email configured" };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? SITE_URL;
  const dashboardUrl = `${siteUrl.replace(/\/$/, "")}/staff`;
  const bodyHtml = `
    <h1 style="margin:0 0 16px;font-size:22px;font-weight:600;color:#1a2332;">New contact form message</h1>
    <p style="margin:0 0 16px;">A new enquiry was submitted on the website.</p>
    <div style="margin:20px 0;padding:16px 18px;background:#f8f9fb;border-radius:8px;">
      ${contactDetailsHtml(message)}
    </div>
    <p style="margin:0;">
      <a href="${dashboardUrl}" style="display:inline-block;padding:12px 20px;background:#2d6a4f;color:#ffffff;text-decoration:none;border-radius:6px;font-family:system-ui,sans-serif;font-size:14px;">Open dashboard</a>
    </p>
  `;

  return sendBrevoEmail({
    to: [{ email: notifyEmail, name: "Mainland Staff" }],
    subject: `Contact form — ${message.email}`,
    htmlContent: emailLayout({
      title: "New contact form message",
      bodyHtml,
      siteUrl,
    }),
  });
}
