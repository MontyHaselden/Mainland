"use client";

import { format, parseISO } from "date-fns";
import type { ContactMessage } from "@/lib/db/schema";
import { ContactAcknowledgeButton } from "./contact-acknowledge-button";

type ContactDetailModalProps = {
  message: ContactMessage | null;
  onClose: () => void;
};

export function ContactDetailModal({
  message,
  onClose,
}: ContactDetailModalProps) {
  if (!message) return null;

  const createdAt = format(
    typeof message.createdAt === "string"
      ? parseISO(message.createdAt)
      : message.createdAt,
    "EEEE, d MMMM yyyy · h:mm a",
  );

  const mailto = `mailto:${message.email}?subject=${encodeURIComponent("Re: Your enquiry — Mainland Building Inspections")}&body=${encodeURIComponent(`\n\n---\nOriginal message (${createdAt}):\n${message.message}`)}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-navy/40 p-4 sm:items-center"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-border bg-surface p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">
              Contact message
            </p>
            <h2 className="font-display mt-1 text-xl text-navy">
              {message.email}
            </h2>
            <p className="mt-1 text-sm text-muted">{createdAt}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-2 py-1 text-muted hover:bg-background"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <dl className="mt-6 space-y-4 text-sm">
          <div>
            <dt className="font-semibold text-navy">Email</dt>
            <dd className="mt-1">
              <a href={`mailto:${message.email}`} className="text-accent">
                {message.email}
              </a>
            </dd>
          </div>
          {message.phone ? (
            <div>
              <dt className="font-semibold text-navy">Phone</dt>
              <dd className="mt-1">
                <a href={`tel:${message.phone.replace(/\s/g, "")}`} className="text-accent">
                  {message.phone}
                </a>
              </dd>
            </div>
          ) : null}
          {message.address ? (
            <div>
              <dt className="font-semibold text-navy">Address</dt>
              <dd className="mt-1 text-muted">{message.address}</dd>
            </div>
          ) : null}
          <div>
            <dt className="font-semibold text-navy">Message</dt>
            <dd className="mt-2 whitespace-pre-wrap rounded-lg border border-border bg-background px-4 py-3 text-muted">
              {message.message}
            </dd>
          </div>
          {message.acknowledgedAt ? (
            <div>
              <dt className="font-semibold text-navy">Status</dt>
              <dd className="mt-1 text-muted">Handled</dd>
            </div>
          ) : null}
        </dl>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={mailto}
            className="inline-flex min-h-12 items-center justify-center rounded-lg bg-accent px-6 font-semibold text-white transition-colors hover:bg-accent-light"
          >
            Respond by email
          </a>
          {!message.acknowledgedAt ? (
            <ContactAcknowledgeButton messageId={message.id} />
          ) : null}
        </div>
      </div>
    </div>
  );
}
