"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import { BASE, EM } from "./data";
import { Btn, D, EASE, LABEL, Label, Rise, Up } from "./shared";

const JOURNEY = [
  { year: "2008", title: "A Lucknow kitchen", text: "Started as a commis, learning dum and galouti from a third-generation khansama." },
  { year: "2013", title: "Kitchens abroad", text: "Six years across London and Singapore, learning restraint, technique and plating." },
  { year: "2019", title: "Home to Indore", text: "Came back with one idea: Indian food, cooked over fire, served with care." },
  { year: "2021", title: "Ember opens", text: "Sixty covers, one wood oven, two tandoors and a charcoal sigri." },
];

const GALLERY = [
  { src: "/images/ember/chef-cooking.jpg", alt: "Chef at work" },
  { src: "/images/ember/oven.jpg", alt: "The wood oven" },
  { src: "/images/ember/plating-seafood.jpg", alt: "Plating a seafood course" },
  { src: "/images/ember/torch.jpg", alt: "Finishing a dish with a torch" },
];

export function EmberStory() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : -80, reduce ? 0 : 80]);

  return (
    <main>
      {/* Chef hero */}
      <section className="px-5 pb-20 pt-32 sm:px-8 sm:pt-40">
        <div className="mx-auto grid max-w-[1440px] items-center gap-12 lg:grid-cols-[1fr_1fr]">
          <div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 1 }}>
              <Label>Our chef</Label>
            </motion.div>
            <h1 className={`${D} mt-6 text-[clamp(3.2rem,8vw,7.5rem)] leading-[0.92]`}>
              <Rise text="Arjun" delay={0.3} className="block" />
              <Rise text="Malhotra" delay={0.42} className="block italic text-[#D9A55B]" />
            </h1>
            <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 1, ease: EASE }} className="mt-8 max-w-[32rem] text-[17px] leading-[1.8]" style={{ color: EM.mute }}>
              Fifteen years, four countries and one stubborn belief: that the food we grew up with deserves the same care as any tasting menu in the world.
            </motion.p>
          </div>
          <div ref={ref} className="relative aspect-[4/5] overflow-hidden rounded-[6px]">
            <motion.div style={{ y }} className="absolute -inset-y-20 inset-x-0">
              <Image src="/images/ember/chef-portrait.jpg" alt="Chef Arjun Malhotra" fill priority sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="border-y px-5 py-24 sm:px-8 sm:py-32" style={{ borderColor: EM.line, background: EM.panel }}>
        <div className="mx-auto max-w-[1100px] text-center">
          <p className={`${D} text-[clamp(2rem,4.6vw,3.8rem)] italic leading-[1.25]`}>
            <Rise inView text="“Fire is the oldest ingredient we have. My job is to know when to step back and let it cook.”" />
          </p>
          <p className={`mt-8 ${LABEL}`} style={{ color: EM.gold }}>
            Chef Arjun Malhotra
          </p>
        </div>
      </section>

      {/* Journey */}
      <section className="px-5 py-28 sm:px-8 sm:py-36">
        <div className="mx-auto max-w-[1440px]">
          <Label>The journey</Label>
          <div className="mt-12 grid gap-px overflow-hidden rounded-[6px] border sm:grid-cols-2 lg:grid-cols-4" style={{ borderColor: EM.line, background: EM.line }}>
            {JOURNEY.map((j, i) => (
              <Up key={j.year} delay={i * 0.1} className="h-full">
                <div className="h-full p-8" style={{ background: EM.bg }}>
                  <p className={`${D} text-[56px] italic leading-none`} style={{ color: EM.gold }}>
                    {j.year}
                  </p>
                  <h3 className="mt-6 text-[18px] font-semibold">{j.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed" style={{ color: EM.mute }}>
                    {j.text}
                  </p>
                </div>
              </Up>
            ))}
          </div>
        </div>
      </section>

      {/* Kitchen gallery */}
      <section className="px-5 pb-28 sm:px-8 sm:pb-36">
        <div className="mx-auto max-w-[1440px]">
          <Label>Inside the kitchen</Label>
          <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {GALLERY.map((g, i) => (
              <Up key={g.src} delay={i * 0.08} className={i % 2 ? "lg:mt-16" : ""}>
                <div className="group relative aspect-[3/4] overflow-hidden rounded-[6px]" data-cursor="View">
                  <Image src={g.src} alt={g.alt} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover transition-transform duration-[1400ms] group-hover:scale-110" />
                </div>
              </Up>
            ))}
          </div>
          <div className="mt-20 flex flex-col items-center gap-6 text-center">
            <p className={`${D} text-[clamp(2rem,4vw,3.4rem)] italic`}>Come say hello at the pass.</p>
            <Btn href={`${BASE}/reserve`} cursor="Book">
              Reserve a table
            </Btn>
          </div>
        </div>
      </section>
    </main>
  );
}
