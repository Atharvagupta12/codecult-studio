"use client";

import { motion } from "motion/react";
import { WhatsAppIcon } from "@/components/ui/icons";
import { Feature } from "../shared/Feature";
import { fmtTime, useOpenStatus } from "../shared/useOpenStatus";
import { ADDRESS, DAYS, HOURS, KC, MAPS_URL, MAP_EMBED } from "./data";
import { COND, D, EASE, HAND, HI, OpenBadge, Up, Wave, useCallAction, useOrderAction } from "./shared";

const ORDER_DAYS = [1, 2, 3, 4, 5, 6, 0];
const GOOD_TO_KNOW = [
  ["🅿", "Parking", "Free two-wheeler parking, car parking on the lane."],
  ["📶", "Free Wi-Fi", "Fast Wi-Fi and a power socket at every table."],
  ["💳", "UPI & cards", "GPay, PhonePe, Paytm, cards and cash."],
  ["🎉", "Private adda", "Book the upstairs space for birthdays and meetups."],
];

export function KulhadVisit() {
  const status = useOpenStatus(HOURS);
  const order = useOrderAction();
  const call = useCallAction();

  return (
    <main>
      <section className="relative -mt-[76px] overflow-hidden pt-[76px]" style={{ background: KC.marigold, color: KC.green }}>
        <div className="relative mx-auto max-w-[1320px] px-5 pb-14 pt-14 sm:px-8 sm:pt-20">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`${HI} text-[32px]`} style={{ color: KC.clay }}>
            आओ, बैठो, चाय पियो
          </motion.span>
          <h1 className={`${D} text-[clamp(3.6rem,11vw,9.5rem)] leading-[0.86] tracking-[-0.03em]`}>
            <span className="block overflow-hidden pb-[0.05em]">
              <motion.span className="block" initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ duration: 1, ease: EASE }}>
                Come over.
              </motion.span>
            </span>
          </h1>
          <div className="mt-6">
            <Feature id="open" label="Live open / closed status" inline>
              <OpenBadge dark={false} />
            </Feature>
          </div>
        </div>
        <Wave fill={KC.cream} />
      </section>

      <section className="px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto grid max-w-[1400px] gap-4 lg:grid-cols-[1fr_1.15fr]">
          <Up>
            <div className="h-full rounded-[36px] p-7 sm:p-10" style={{ background: KC.green, color: KC.cream }}>
              <p className={`text-[13px] tracking-[0.1em] ${COND}`} style={{ color: KC.marigold }}>
                Address
              </p>
              <p className={`${D} mt-2 text-[28px] leading-tight sm:text-[34px]`}>{ADDRESS}</p>
              <p className={`${HAND} mt-2 text-[22px] font-bold`} style={{ color: KC.marigold }}>
                look for the giant kulhad on the wall!
              </p>

              <p className={`mt-8 text-[13px] tracking-[0.1em] ${COND}`} style={{ color: KC.marigold }}>
                Opening hours
              </p>
              <ul className="mt-3 flex flex-col">
                {ORDER_DAYS.map((d) => {
                  const today = status?.today === d;
                  return (
                    <li key={d} className={`flex items-center justify-between rounded-xl px-3 py-2 text-[15px] ${today ? "bg-white/10 font-bold" : "opacity-75"}`}>
                      <span className="flex items-center gap-2">
                        {DAYS[d]}
                        {today && (
                          <span className={`rounded-full px-2 py-0.5 text-[10px] tracking-[0.06em] ${COND}`} style={{ background: KC.marigold, color: KC.green }}>
                            Today
                          </span>
                        )}
                      </span>
                      <span>
                        {fmtTime(HOURS[d][0])} – {fmtTime(HOURS[d][1])}
                      </span>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-8 flex flex-wrap gap-2.5">
                <a href={MAPS_URL} target="_blank" rel="noopener" className="flex h-12 items-center rounded-full px-5 text-[15px] font-bold" style={{ background: KC.marigold, color: KC.green }}>
                  Get directions ↗
                </a>
                <Feature id="call" label="Tap to call" inline>
                  <button type="button" onClick={call} className="flex h-12 items-center rounded-full border-2 border-white/25 px-5 text-[15px] font-bold">
                    📞 Call us
                  </button>
                </Feature>
                <button type="button" onClick={order} className="flex h-12 items-center gap-2 rounded-full bg-[#25D366] px-5 text-[15px] font-bold text-[#0E2219]">
                  <WhatsAppIcon className="size-4" /> WhatsApp
                </button>
              </div>
            </div>
          </Up>
          <Up delay={0.1} className="h-full">
            <Feature id="map" label="Google Maps + directions" className="h-full">
              <div className="relative h-full min-h-[420px] overflow-hidden rounded-[36px] border-2" style={{ borderColor: KC.ink, background: KC.marigold }}>
                <iframe title="Kulhad Co. on Google Maps" src={MAP_EMBED} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="absolute inset-0 h-full w-full border-0" />
              </div>
            </Feature>
          </Up>
        </div>
      </section>

      <section className="px-5 pb-20 sm:px-8 sm:pb-28">
        <div className="mx-auto max-w-[1320px]">
          <Up>
            <h2 className={`${D} text-[clamp(2.2rem,5vw,3.8rem)] leading-none tracking-[-0.02em]`}>Good to know</h2>
          </Up>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {GOOD_TO_KNOW.map(([icon, title, text], i) => (
              <Up key={title} delay={i * 0.08}>
                <div className="h-full rounded-[26px] border-2 bg-[#FFF8EC] p-6 transition-transform hover:-translate-y-1 hover:rotate-[-1deg]" style={{ borderColor: KC.ink }}>
                  <span className="text-[32px]">{icon}</span>
                  <h3 className={`${D} mt-4 text-[24px]`}>{title}</h3>
                  <p className="mt-1 text-[14px] opacity-65">{text}</p>
                </div>
              </Up>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
