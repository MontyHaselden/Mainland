import { format, parseISO } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import type { Booking, ContactMessage } from "@/lib/db/schema";
import { NZ_TIMEZONE, SLOT_LABELS, type BookingSlot } from "@/lib/booking/constants";

type SendResult = { ok: true } | { ok: false; error: string };

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
    <p><strong>Customer:</strong> ${booking.customerName}</p>
    <p><strong>Phone:</strong> ${booking.customerPhone}</p>
    <p><strong>Email:</strong> ${booking.customerEmail}</p>
    ${booking.agentName ? `<p><strong>Agent:</strong> ${booking.agentName}</p>` : ""}
    ${booking.notes ? `<p><strong>Notes:</strong> ${booking.notes}</p>` : ""}
  `;
}

export async function sendCustomerConfirmation(
  booking: Booking
): Promise<SendResult> {
  const slot = booking.slot as BookingSlot;
  const html = `
    <div style="font-family: Georgia, serif; color: #1a2332; max-width: 560px;">
      <h1 style="font-size: 24px;">Booking confirmed</h1>
      <p>Thank you, ${booking.customerName}. Your building inspection with Mainland Building Inspections is confirmed.</p>
      ${bookingDetailsHtml(booking)}
      <p style="color: #5c6b7a;">If you need to make changes, please contact us by phone or email.</p>
    </div>
  `;

  return sendBrevoEmail({
    to: [{ email: booking.customerEmail, name: booking.customerName }],
    subject: `Inspection confirmed — ${formatInspectionDate(booking.inspectionDate)} (${SLOT_LABELS[slot]})`,
    htmlContent: html,
  });
}

export async function sendStaffNewBookingAlert(
  booking: Booking
): Promise<SendResult> {
  const notifyEmail =
    process.env.BUSINESS_NOTIFICATION_EMAIL ?? process.env.STAFF_EMAIL;
  if (!notifyEmail) {
    return { ok: false, error: "No business notification email configured" };
  }

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const dashboardUrl = `${siteUrl}/staff`;

  const html = `
    <div style="font-family: system-ui, sans-serif; color: #1a2332; max-width: 560px;">
      <h1 style="font-size: 22px;">New inspection booking</h1>
      <p>A new booking has been confirmed and needs your acknowledgment in the dashboard.</p>
      ${bookingDetailsHtml(booking)}
      <p><a href="${dashboardUrl}" style="display:inline-block;padding:12px 20px;background:#2d6a4f;color:#fff;text-decoration:none;border-radius:6px;">Open dashboard</a></p>
    </div>
  `;

  return sendBrevoEmail({
    to: [{ email: notifyEmail, name: "Mainland Staff" }],
    subject: `New booking — ${booking.customerName} — ${booking.inspectionDate}`,
    htmlContent: html,
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

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const dashboardUrl = `${siteUrl}/staff`;

  const html = `
    <div style="font-family: system-ui, sans-serif; color: #1a2332; max-width: 560px;">
      <h1 style="font-size: 22px;">New contact form message</h1>
      <p>A new enquiry was submitted on the website.</p>
      ${contactDetailsHtml(message)}
      <p><a href="${dashboardUrl}" style="display:inline-block;padding:12px 20px;background:#2d6a4f;color:#fff;text-decoration:none;border-radius:6px;">Open dashboard</a></p>
    </div>
  `;

  return sendBrevoEmail({
    to: [{ email: notifyEmail, name: "Mainland Staff" }],
    subject: `Contact form — ${message.email}`,
    htmlContent: html,
  });
}
