"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";
import { CheckIcon } from "../ui/icons";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";

const STEPS = [
  { n: "01", when: "Day 0", title: "Pick a design", text: "Choose a sample you love from the showcase. Not sure which one fits? Tell us about your business and we'll suggest one." },
  { n: "02", when: "Day 1", title: "Send your details", text: "Share your logo, photos, menu or services, timings and address on WhatsApp. No forms, no tech talk." },
  { n: "03", when: "Day 2–4", title: "We make it yours", text: "Your name, colours, photos and content go in. You review a live preview and ask for changes. Two rounds are included." },
  { n: "04", when: "Day 5–7", title: "You go live", text: "We connect your domain, launch on free hosting and walk you through everything. The website is yours." },
];

const INCLUDED = ["Your name, logo & brand colours", "Your photos, text, menu & prices", "Small layout tweaks within the design", "2 rounds of changes before launch", "Free hosting + SSL security", "WhatsApp button & Google Maps"];
const EXTRA = ["Pages beyond your tier", "Features not in the sample (payments, logins…)", "Writing your content or professional photoshoots", "Bigger changes after launch", `Domain name (from ₹799)`];

export function Process() {
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 75%", "end 55%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section id="process" className="relative scroll-mt-10 px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            index="06"
            label="How it works"
            title="Hello to live,"
            italic="in four steps."
            intro={
              <>
                You don&apos;t need to know anything technical. If you can send a WhatsApp message, you can get a website. We handle
                design, development, hosting and launch.
              </>
            }
          />
        </div>

        <ol ref={listRef} className="relative flex flex-col gap-3 pl-9 sm:gap-4 sm:pl-14">
          {/* Progress rail */}
          <span aria-hidden className="absolute bottom-6 left-[11px] top-6 w-px bg-line sm:left-[15px]" />
          <motion.span aria-hidden style={{ scaleY }} className="absolute bottom-6 left-[11px] top-6 w-px origin-top bg-ember sm:left-[15px]" />

          {STEPS.map((s, i) => (
            <Reveal as="li" key={s.n} delay={i * 0.05} className="relative">
              <span className="absolute -left-9 top-6 grid size-6 place-items-center rounded-full border border-ember bg-ink sm:-left-14 sm:size-8">
                <span className="size-2 rounded-full bg-ember" />
              </span>
              <div className="group relative overflow-hidden rounded-[22px] border border-line bg-ink-2 p-5 transition-colors duration-500 hover:border-cream/20 sm:rounded-[28px] sm:p-9">
                <span aria-hidden className="absolute -right-2 -top-6 hidden select-none font-serif text-[150px] sm:block italic leading-none text-cream/[0.04] transition-colors duration-500 group-hover:text-ember/10">
                  {s.n}
                </span>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ember">
                  Step {s.n} · {s.when}
                </p>
                <h3 className="mt-2 text-[24px] font-medium tracking-[-0.03em] sm:mt-3 sm:text-[36px]">{s.title}</h3>
                <p className="mt-2 max-w-[34rem] text-[15px] leading-relaxed text-cream/60 sm:mt-3 sm:text-[16px]">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>

      {/* Included vs extra */}
      <div className="mx-auto mt-12 grid max-w-[1400px] gap-4 md:grid-cols-[1.2fr_1fr]">
        <Reveal>
          <div className="h-full rounded-[24px] bg-cream p-6 text-ink sm:rounded-[28px] sm:p-10">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/50">Included in your price</p>
            <h3 className="mt-3 text-[28px] font-medium tracking-[-0.03em]">
              What you see is <span className="font-serif font-normal italic">what you get.</span>
            </h3>
            <ul className="mt-7 flex flex-col gap-3">
              {INCLUDED.map((t) => (
                <li key={t} className="flex items-start gap-2.5 text-[15px]">
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-ink text-cream">
                    <CheckIcon className="size-3" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="h-full rounded-[24px] border border-dashed border-cream/20 p-6 sm:rounded-[28px] sm:p-10">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-cream/45">Quoted separately</p>
            <h3 className="mt-3 text-[28px] font-medium tracking-[-0.03em]">
              No surprises, <span className="font-serif font-normal italic text-cream/70">ever.</span>
            </h3>
            <ul className="mt-7 flex flex-col gap-3">
              {EXTRA.map((t) => (
                <li key={t} className="flex items-start gap-2.5 text-[15px] text-cream/65">
                  <span className="mt-[9px] h-px w-3 shrink-0 bg-cream/40" />
                  {t}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[14px] text-cream/45">We always tell you the price before doing anything extra.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
