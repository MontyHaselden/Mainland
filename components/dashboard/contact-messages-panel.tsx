"use client";

import { format, parseISO } from "date-fns";
import type { ContactMessage } from "@/lib/db/schema";
import { ContactAcknowledgeButton } from "./contact-acknowledge-button";

type ContactMessagesPanelProps = {
  messages: ContactMessage[];
  onSelectMessage?: (message: ContactMessage) => void;
  showAcknowledge?: boolean;
};

function formatCreatedAt(createdAt: Date | string): string {
  const d =
    typeof createdAt === "string" ? parseISO(createdAt) : createdAt;
  return format(d, "d MMM yyyy · h:mm a");
}

function previewText(message: string, max = 120): string {
  const trimmed = message.replace(/\s+/g, " ").trim();
  if (trimmed.length <= max) return trimmed;
  return `${trimmed.slice(0, max)}…`;
}

export function ContactMessagesPanel({
  messages,
  onSelectMessage,
  showAcknowledge = false,
}: ContactMessagesPanelProps) {
  if (messages.length === 0) {
    return (
      <p className="text-sm text-muted">
        {showAcknowledge
          ? "No new contact messages."
          : "No contact messages yet."}
      </p>
    );
  }

  return (
    <ul className="divide-y divide-border">
      {messages.map((msg) => (
        <li key={msg.id} className="flex flex-col gap-3 py-4 first:pt-0">
          <button
            type="button"
            onClick={() => onSelectMessage?.(msg)}
            className="text-left transition-colors hover:text-accent"
          >
            <p className="font-semibold text-navy">{msg.email}</p>
            <p className="mt-1 text-sm text-muted">
              {previewText(msg.message)}
            </p>
            <p className="mt-2 text-xs text-muted">
              {formatCreatedAt(msg.createdAt)}
            </p>
          </button>
          {showAcknowledge && !msg.acknowledgedAt ? (
            <div className="flex flex-wrap gap-2">
              <a
                href={`mailto:${msg.email}?subject=${encodeURIComponent("Re: Your enquiry — Mainland Building Inspections")}`}
                className="inline-flex min-h-10 items-center rounded-lg border border-border px-4 text-xs font-semibold text-navy transition-colors hover:border-accent/40 hover:text-accent"
              >
                Respond by email
              </a>
              <ContactAcknowledgeButton messageId={msg.id} />
            </div>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
