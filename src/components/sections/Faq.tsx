"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { SERVICES, TIERS } from "@/data/samples";
import { waLink } from "@/lib/site";
import { WhatsAppIcon } from "../ui/icons";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";

const FAQS: [string, string][] = [
  [
    "I'm not technical at all. Can I still get a website?",
    "Absolutely, most of our clients aren't. You pick a design you like and send your details on WhatsApp. We handle the design, development, hosting and launch, and show you how everything works.",
  ],
  [
    "Can I change things in the sample design?",
    "Yes. Your name, logo, colours, photos, text, menu and prices are all customised for you, and small layout tweaks are fine. Bigger changes or new features are quoted separately, always before we start.",
  ],
  [
    "Is the domain included?",
    `No. The domain (like yourbusiness.in) is registered in your name so you always own it. You can buy it yourself, or we'll buy and connect it for you from ${SERVICES.domain}. The exact price depends on the name you choose.`,
  ],
  [
    "Do I have to pay anything every month?",
    "No. Hosting is free and there are no monthly fees from us. The only recurring cost is your domain's yearly renewal, which you pay to the domain company.",
  ],
  ["How do payments work?", "50% to start and 50% when your website goes live. UPI or bank transfer, whichever is easier for you."],
  [
    "How long does it take?",
    `Essential and Signature websites go live in ${TIERS.Essential.days} days, Premium in ${TIERS.Premium.days} days, counted from when we have all your details (logo, photos, content).`,
  ],
  [
    "What if I need changes after the website is live?",
    "Just message us on WhatsApp. Small text or photo updates are quick and affordable, and we'll always tell you the price before doing anything.",
  ],
  [
    "I already have Instagram. Why do I need a website?",
    "Instagram is great for people who already follow you. But new customers search Google for things like \"gym near me\", and Google shows websites and Maps listings. A website also builds trust and shows your menu, prices and location 24/7.",
  ],
  [
    "Do you only work with businesses in Indore?",
    "We're based in Indore, but we work with businesses across India. Everything happens over WhatsApp and calls, and if you're in Indore we're happy to meet in person.",
  ],
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="scroll-mt-10 px-5 py-12 sm:px-8 sm:py-20">
      <div className="mx-auto grid max-w-[1400px] gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="flex flex-col gap-10 lg:sticky lg:top-32 lg:self-start">
          <SectionHeading index="08" label="FAQ" title="Questions owners" italic="ask us." />
          <Reveal delay={0.1} className="hidden lg:block">
            <div className="rounded-[28px] border border-line bg-ink-2 p-7">
              <p className="text-[18px] font-medium">Still have a question?</p>
              <p className="mt-1 text-[15px] text-cream/55">Ask us directly. We usually reply the same day.</p>
              <a
                href={waLink("Hi CodeCult Studio! I have a question.")}
                target="_blank"
                rel="noopener"
                className="mt-5 inline-flex h-12 items-center gap-2.5 rounded-full bg-wa px-5 text-[15px] font-semibold text-ink transition-transform hover:scale-[1.02]"
              >
                <WhatsAppIcon className="size-5" /> Ask on WhatsApp
              </a>
            </div>
          </Reveal>
        </div>

        <ul className="flex flex-col">
          {FAQS.map(([q, a], i) => {
            const isOpen = open === i;
            return (
              <Reveal as="li" key={q} delay={Math.min(i, 4) * 0.04} className="border-b border-line first:border-t">
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="group flex w-full items-center justify-between gap-6 py-6 text-left sm:py-7"
                  >
                    <span className={`text-[18px] font-medium tracking-[-0.02em] transition-colors sm:text-[21px] ${isOpen ? "text-cream" : "text-cream/75 group-hover:text-cream"}`}>
                      {q}
                    </span>
                    <span
                      className={`relative grid size-10 shrink-0 place-items-center rounded-full border transition-all duration-500 ${
                        isOpen ? "rotate-45 border-ember bg-ember text-ink" : "border-line text-cream group-hover:border-cream/30"
                      }`}
                    >
                      <span className="absolute h-[1.5px] w-3.5 bg-current" />
                      <span className="absolute h-3.5 w-[1.5px] bg-current" />
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-[42rem] pb-7 pr-14 text-[16px] leading-[1.7] text-cream/60">{a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
