"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { BookingWizard } from "@/components/booking/booking-wizard";
import { ScrollToBookingLink } from "@/components/home/scroll-to-booking-link";
import { SAMPLE_REPORT_PATH } from "@/lib/seo/business";
import { HeroBackground } from "./hero-background";

function easeInOutCubic(progress: number): number {
  return progress < 0.5
    ? 4 * progress * progress * progress
    : 1 - Math.pow(-2 * progress + 2, 3) / 2;
}

/**
 * Pinned scroll phases (shares of 0→1 through the pin track):
 * 1. Title hold — title frozen at rest
 * 2. Animate — title exits up, booking rises in
 * 3. Booking hold — booking locked on hero before exit scroll
 */
const TITLE_HOLD_END = 0.3;
const ANIM_END = 0.72;

/** Shared travel factor — title and booking move in the same lane */
const SLOT_TRAVEL = "(50vh + 16rem)";

function transitionFromScroll(scrollProgress: number): number {
  if (scrollProgress <= TITLE_HOLD_END) return 0;
  if (scrollProgress >= ANIM_END) return 1;
  const raw =
    (scrollProgress - TITLE_HOLD_END) / (ANIM_END - TITLE_HOLD_END);
  return easeInOutCubic(raw);
}

function bookingOpacityFromTransition(transition: number): number {
  if (transition <= 0) return 0;
  if (transition >= 0.2) return 1;
  return transition / 0.2;
}

function titleOpacityFromTransition(transition: number): number {
  if (transition <= 0.75) return 1;
  if (transition >= 1) return 0;
  return 1 - (transition - 0.75) / 0.25;
}

export function HeroExperience() {
  const pinRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const updateScroll = useCallback(() => {
    const el = pinRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const pinHeight = el.offsetHeight - window.innerHeight;
    if (pinHeight <= 0) {
      setScrollProgress(0);
      return;
    }

    const scrolled = Math.min(Math.max(-rect.top, 0), pinHeight);
    setScrollProgress(scrolled / pinHeight);
  }, []);

  useEffect(() => {
    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("resize", updateScroll);
    return () => {
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", updateScroll);
    };
  }, [updateScroll]);

  const transition = transitionFromScroll(scrollProgress);
  const bookingInteractive =
    transition >= 0.98 && scrollProgress < 1;
  const bookingOpacity = bookingOpacityFromTransition(transition);
  const titleOpacity = titleOpacityFromTransition(transition);

  return (
    <div
      ref={pinRef}
      className="hero-pin-section relative isolate z-40 -mt-[var(--site-header-height)]"
    >
      <section className="sticky top-0 z-10 h-screen w-full overflow-hidden">
        <HeroBackground riseRaw={0} />

        <div className="absolute inset-0 z-20 overflow-hidden">
          <div className="mx-auto flex h-full w-full max-w-7xl items-center px-5 pt-[var(--site-header-height)] md:px-8">
            <div className="relative w-full max-w-2xl" style={{ height: "32rem" }}>
              {/* Title — rests in slot, floats up off the top on scroll */}
              <div
                className="absolute inset-0 flex items-center will-change-transform"
                style={{
                  transform: `translate3d(0, calc(${-transition} * ${SLOT_TRAVEL}), 0)`,
                  opacity: titleOpacity,
                  pointerEvents: transition < 0.15 ? "auto" : "none",
                }}
              >
                <div className="hero-title-panel w-full rounded-2xl border border-white/10 bg-navy-deep/55 px-6 py-5 backdrop-blur-md sm:px-7 sm:py-6">
                  <h1 className="font-display text-4xl leading-tight text-white sm:text-5xl lg:text-6xl">
                    Canterbury Building Inspections
                  </h1>
                  <h2 className="font-display mt-3 text-xl text-white/95 sm:text-2xl">
                    Premium Interactive Reporting
                  </h2>
                  <p className="mt-4 max-w-lg text-base text-white/90 lg:text-lg">
                    See exactly what you&apos;re buying before you commit. Our
                    Premium Interactive Reports combine photographs, drone roof
                    inspections, thermal imaging observations, moisture testing,
                    maintenance recommendations and easy-to-understand defect
                    summaries.
                  </p>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <Link
                      href={SAMPLE_REPORT_PATH}
                      className="inline-flex min-h-12 items-center justify-center rounded-lg bg-accent px-6 font-semibold text-white transition-colors hover:bg-accent-light"
                    >
                      View Sample Report
                    </Link>
                    <ScrollToBookingLink className="inline-flex min-h-12 items-center justify-center rounded-lg border border-white/25 px-6 font-semibold text-white transition-colors hover:bg-white/10">
                      Check Dates &amp; Pricing
                    </ScrollToBookingLink>
                  </div>
                </div>
              </div>

              {/* Booking — rises into slot in sync with title exit */}
              <div
                className="absolute inset-0 z-30 flex items-center will-change-transform"
                style={{
                  transform: `translate3d(0, calc(${(1 - transition)} * ${SLOT_TRAVEL}), 0)`,
                  opacity: bookingOpacity,
                  pointerEvents: bookingInteractive ? "auto" : "none",
                }}
              >
                <BookingWizard
                  variant="embedded"
                  submitMode="preview"
                  availabilitySource="mock"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
