"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { BookingWizard } from "@/components/booking/booking-wizard";
import type { MonthAvailabilityResponse } from "@/lib/booking/types";
import { HeroAnimationPanel } from "./hero-animation-panel";
import { HeroBackground } from "./hero-background";

type HeroExperienceProps = {
  bookingInitial: MonthAvailabilityResponse | null;
};

function easeScrollProgress(progress: number): number {
  return progress * progress * (3 - 2 * progress);
}

/** Sync with globals.css */
const HERO_TITLE_HOLD_VH = 80;
const HERO_RISE_VH = 135;
const HERO_BOOKING_HOLD_VH = 100;
const HERO_TOTAL_VH =
  HERO_TITLE_HOLD_VH + HERO_RISE_VH + HERO_BOOKING_HOLD_VH;
const TITLE_HOLD_END = HERO_TITLE_HOLD_VH / HERO_TOTAL_VH;
const BOOKING_RISE_END =
  (HERO_TITLE_HOLD_VH + HERO_RISE_VH) / HERO_TOTAL_VH;

export function HeroExperience({ bookingInitial }: HeroExperienceProps) {
  const pinRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const bookingRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [titleExitPx, setTitleExitPx] = useState(480);
  const [bookingStartPx, setBookingStartPx] = useState(640);

  const measureLayout = useCallback(() => {
    const stage = stageRef.current;
    const title = titleRef.current;
    const booking = bookingRef.current;
    const vh = window.innerHeight;
    if (!stage || !title) return;

    const stageRect = stage.getBoundingClientRect();
    const titleRect = title.getBoundingClientRect();
    const exit =
      titleRect.top - stageRect.top + title.offsetHeight + stageRect.height * 0.08;
    setTitleExitPx(Math.max(exit, 320));

    const cardH = booking?.offsetHeight ?? 420;
    setBookingStartPx(vh * 0.5 + cardH * 0.55);
  }, []);

  useLayoutEffect(() => {
    measureLayout();
    window.addEventListener("resize", measureLayout);
    return () => window.removeEventListener("resize", measureLayout);
  }, [measureLayout]);

  const updateScroll = useCallback(() => {
    const el = pinRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const pinHeight = el.offsetHeight - window.innerHeight;
    if (pinHeight <= 0) return;

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

  const riseRaw =
    scrollProgress <= TITLE_HOLD_END
      ? 0
      : Math.min(
          1,
          (scrollProgress - TITLE_HOLD_END) /
            (BOOKING_RISE_END - TITLE_HOLD_END)
        );
  const eased = easeScrollProgress(scrollProgress);
  const bookingRise = easeScrollProgress(riseRaw);
  const riseAmount = riseRaw >= 1 ? 1 : Math.min(1, bookingRise * 2.5);

  const titleShiftPx = riseAmount * titleExitPx;
  const bookingOffsetPx = bookingStartPx * (1 - riseAmount);
  const bookingVisible = scrollProgress >= TITLE_HOLD_END * 0.98;
  const titleHidden = riseAmount >= 0.98;
  const holdRaw =
    scrollProgress <= BOOKING_RISE_END
      ? 0
      : Math.min(
          1,
          (scrollProgress - BOOKING_RISE_END) / (1 - BOOKING_RISE_END)
        );
  const exitAmount = easeScrollProgress(holdRaw);
  const heroOpacity = 1 - exitAmount;

  const bookingInteractive =
    riseAmount > 0.7 && exitAmount < 0.35 && bookingVisible;

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--hero-exit-progress",
      String(exitAmount)
    );
    return () => {
      document.documentElement.style.removeProperty("--hero-exit-progress");
    };
  }, [exitAmount]);

  return (
    <div ref={pinRef} className="hero-pin-section relative z-40">
      <HeroBackground opacity={heroOpacity} />
      <HeroAnimationPanel
        progress={Math.min(1, eased * 1.1)}
        opacity={heroOpacity}
      />

      <section className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="relative z-20 mx-auto flex h-full w-full max-w-7xl">
          <div
            ref={stageRef}
            className="relative flex h-full w-full min-w-0 flex-col justify-center overflow-hidden px-5 pt-20 pb-8 md:max-w-[46%] md:flex-[0_0_46%] md:px-8 md:pt-24 lg:flex-[0_0_42%]"
          >
            <div
              ref={titleRef}
              className="relative z-0 shrink-0 will-change-transform"
              style={{
                transform: `translate3d(0, -${titleShiftPx}px, 0)`,
                opacity: titleHidden ? 0 : 1,
                visibility: titleHidden ? "hidden" : "visible",
              }}
            >
              <p className="text-sm font-semibold uppercase tracking-widest text-white/80">
                Canterbury &amp; South Island
              </p>
              <h1 className="font-display mt-3 text-4xl leading-tight text-white sm:text-5xl lg:text-6xl">
                Building inspections you can trust
              </h1>
              <p className="mt-4 max-w-md text-base text-white/85 lg:text-lg">
                Clear, thorough reports from licensed inspectors. Book your
                morning or afternoon slot in minutes.
              </p>
            </div>
          </div>

          <div className="hidden min-w-0 flex-1 md:block" aria-hidden />
        </div>

        <div className="pointer-events-none fixed inset-0 z-[35]">
          <div className="relative mx-auto h-full w-full max-w-7xl">
            <div
              ref={bookingRef}
              className="pointer-events-auto absolute left-5 top-1/2 w-[calc(100%-2.5rem)] max-w-md will-change-transform md:left-8"
              style={{
                transform: `translate3d(0, calc(-50% + ${bookingOffsetPx}px), 0)`,
                opacity: bookingVisible ? heroOpacity : 0,
                pointerEvents: bookingInteractive ? "auto" : "none",
              }}
            >
                <BookingWizard
                  embedded
                  initialMonth={bookingInitial?.month}
                  initialDays={bookingInitial?.days}
                />
              </div>
            </div>
          </div>

        {scrollProgress < TITLE_HOLD_END + 0.02 && (
          <div className="pointer-events-none absolute bottom-8 left-1/2 z-30 -translate-x-1/2 text-center text-xs text-white/60 md:left-[21%] md:translate-x-0">
            Scroll to book
          </div>
        )}
      </section>

      <div className="hero-scroll-track" aria-hidden />
    </div>
  );
}
