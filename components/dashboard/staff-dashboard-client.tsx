"use client";

import { useState } from "react";
import type { Booking, ContactMessage } from "@/lib/db/schema";
import { NewBookingsPanel } from "./new-bookings-panel";
import { TodayPanel } from "./today-panel";
import { UpcomingPanel } from "./upcoming-panel";
import { CrmTable } from "./crm-table";
import { BookingDetailModal } from "./booking-detail-modal";
import { ContactDetailModal } from "./contact-detail-modal";
import { ContactMessagesPanel } from "./contact-messages-panel";

type StaffDashboardClientProps = {
  newBookings: Booking[];
  today: Booking[];
  upcoming: Booking[];
  all: Booking[];
  newContactMessages: ContactMessage[];
  allContactMessages: ContactMessage[];
  dbError: boolean;
};

export function StaffDashboardClient({
  newBookings,
  today,
  upcoming,
  all,
  newContactMessages,
  allContactMessages,
  dbError,
}: StaffDashboardClientProps) {
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [selectedContact, setSelectedContact] = useState<ContactMessage | null>(
    null,
  );

  return (
    <>
      {dbError && (
        <p className="mb-8 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-800">
          Database not connected. Set DATABASE_URL and run migrations.
        </p>
      )}

      <div className="mb-8 flex items-center gap-3">
        <h1 className="font-display text-3xl text-navy">Dashboard</h1>
        {newBookings.length > 0 && (
          <span className="rounded-full bg-amber-500 px-3 py-1 text-xs font-bold text-white">
            {newBookings.length} new booking{newBookings.length === 1 ? "" : "s"}
          </span>
        )}
        {newContactMessages.length > 0 && (
          <span className="rounded-full bg-accent px-3 py-1 text-xs font-bold text-white">
            {newContactMessages.length} new message
            {newContactMessages.length === 1 ? "" : "s"}
          </span>
        )}
      </div>

      <section className="mb-10 rounded-2xl border border-border bg-surface p-6">
        <h2 className="text-lg font-semibold text-navy">Contact messages</h2>
        <p className="mt-1 text-sm text-muted">
          Enquiries from the website contact form. Respond by email, then mark as
          handled.
        </p>
        <div className="mt-6">
          <ContactMessagesPanel
            messages={newContactMessages}
            onSelectMessage={setSelectedContact}
            showAcknowledge
          />
        </div>
      </section>

      <div className="grid gap-10 lg:grid-cols-2">
        <section className="rounded-2xl border border-border bg-surface p-6">
          <h2 className="text-lg font-semibold text-navy">
            New bookings — confirm acknowledgment
          </h2>
          <p className="mt-1 text-sm text-muted">
            Bookings are already confirmed for customers. Acknowledge to clear
            the notification.
          </p>
          <div className="mt-6">
            <NewBookingsPanel
              bookings={newBookings}
              onSelectBooking={setSelectedBooking}
            />
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-surface p-6">
          <h2 className="text-lg font-semibold text-navy">
            Today&apos;s inspections
          </h2>
          <div className="mt-6">
            <TodayPanel
              bookings={today}
              onSelectBooking={setSelectedBooking}
            />
          </div>
        </section>
      </div>

      <section className="mt-10 rounded-2xl border border-border bg-surface p-6">
        <h2 className="text-lg font-semibold text-navy">Upcoming inspections</h2>
        <div className="mt-6">
          <UpcomingPanel
            bookings={upcoming}
            onSelectBooking={setSelectedBooking}
          />
        </div>
      </section>

      <section className="mt-10 rounded-2xl border border-border bg-surface p-6">
        <h2 className="text-lg font-semibold text-navy">All contact messages</h2>
        <div className="mt-6">
          <ContactMessagesPanel
            messages={allContactMessages}
            onSelectMessage={setSelectedContact}
          />
        </div>
      </section>

      <section className="mt-10 rounded-2xl border border-border bg-surface p-6">
        <h2 className="text-lg font-semibold text-navy">All bookings</h2>
        <div className="mt-6">
          <CrmTable
            bookings={all}
            onSelectBooking={setSelectedBooking}
          />
        </div>
      </section>

      <BookingDetailModal
        booking={selectedBooking}
        onClose={() => setSelectedBooking(null)}
      />
      <ContactDetailModal
        message={selectedContact}
        onClose={() => setSelectedContact(null)}
      />
    </>
  );
}
