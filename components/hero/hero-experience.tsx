"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { BookingWizard } from "@/components/booking/booking-wizard";
import type { MonthAvailabilityResponse } from "@/lib/booking/types";
import { HeroBackground } from "./hero-background";
import { InspectorPlaceholders } from "./inspector-placeholders";

type HeroExperienceProps = {
  bookingInitial: MonthAvailabilityResponse | null;
};

export function HeroExperience({ bookingInitial }: HeroExperienceProps) {
  const pinRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [heroVisible, setHeroVisible] = useState(true);
  const [phase, setPhase] = useState<"title" | "booking" | "done">("title");

  const updateScroll = useCallback(() => {
    const el = pinRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const pinHeight = el.offsetHeight - window.innerHeight;
    if (pinHeight <= 0) return;

    const scrolled = Math.min(Math.max(-rect.top, 0), pinHeight);
    const progress = scrolled / pinHeight;
    setScrollProgress(progress);

    if (progress < 0.35) {
      setPhase("title");
    } else if (progress < 0.95) {
      setPhase("booking");
    } else {
      setPhase("done");
    }

    setHeroVisible(progress < 1);
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

  const bookingTranslate = Math.max(0, (1 - scrollProgress * 2.5) * 100);
  const titleOpacity = Math.max(0, 1 - scrollProgress * 3);

  return (
    <>
      <HeroBackground visible={heroVisible} />
      <InspectorPlaceholders progress={Math.min(1, scrollProgress * 1.8)} />

      <div ref={pinRef} className="hero-pin-section relative z-20">
        <section className="sticky top-0 flex h-screen items-end md:items-center">
          <div className="mx-auto w-full max-w-7xl px-5 pb-10 pt-24 lg:px-8 lg:pb-0">
            <div className="grid gap-8 lg:grid-cols-12">
              <div className="relative lg:col-span-5">
                <div
                  className="transition-opacity duration-200"
                  style={{ opacity: titleOpacity }}
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

                <div
                  className="absolute left-0 right-0 top-0 transition-transform duration-100 ease-out"
                  style={{
                    transform: `translateY(${bookingTranslate}%)`,
                    opacity: phase === "title" ? 0 : 1,
                    pointerEvents: phase === "title" ? "none" : "auto",
                  }}
                >
                  <div className="max-w-md">
                    <BookingWizard
                      embedded
                      initialMonth={bookingInitial?.month}
                      initialDays={bookingInitial?.days}
                    />
                  </div>
                </div>
              </div>
              <div className="hidden lg:col-span-7 lg:block" aria-hidden />
            </div>
          </div>

          {phase === "title" && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center text-xs text-white/60">
              Scroll to book
            </div>
          )}
        </section>

        <div className="hero-scroll-track" aria-hidden />
      </div>
    </>
  );
}
