"use client";

import { AnimatePresence, animate, motion, useMotionValue, useTransform } from "motion/react";
import { useEffect, useState } from "react";
import { Feature } from "../shared/Feature";
import { BUILDER, IMG, MB, PACKAGES, inr } from "./data";
import { PageHead } from "./Shell";
import { Btn, EASE, Kicker, LABEL, SERIF, Up, useActions } from "./shared";

export function MehrPackages() {
  return (
    <main>
      <PageHead kicker="Packages" title="Investment in" italic="your glow." sub="Three bridal packages that cover everything, or build your own with family makeup and extras. All prices include products, travel within Indore and GST." img={IMG.palette} />
      <Packages />
      <Builder />
    </main>
  );
}

function Packages() {
  const { send } = useActions();
  return (
    <section className="px-5 pb-24 sm:px-10 sm:pb-32">
      <div className="mx-auto max-w-[1440px]">
        <Feature id="packages" label="Bridal packages">
          <div className="grid gap-5 lg:grid-cols-3">
            {PACKAGES.map((p, i) => {
              const pop = "popular" in p && p.popular;
              return (
                <Up key={p.id} delay={i * 0.08}>
                  <article className={`relative flex h-full flex-col overflow-hidden rounded-[28px] border p-8 sm:p-10 ${pop ? "lg:-my-4 lg:py-14" : ""}`} style={{ borderColor: pop ? MB.rose : MB.line, background: pop ? `linear-gradient(170deg, ${MB.wine}, ${MB.panel})` : MB.panel }}>
                    {pop && (
                      <span className={`${LABEL} absolute right-6 top-6 rounded-full px-3 py-1 text-[9px] text-[#1A0A0E]`} style={{ background: MB.rose }}>
                        Most loved
                      </span>
                    )}
                    <p className={`${LABEL} text-[10px] text-[#B7948B] ${pop ? "mt-6 sm:mt-0" : ""}`}>{p.line}</p>
                    <h2 className={`${SERIF} mt-4 text-[44px] italic leading-none`}>{p.name}</h2>
                    <p className={`${SERIF} mt-6 text-[40px] leading-none`} style={{ color: MB.rose }}>
                      {inr(p.price)}
                    </p>
                    <ul className="mt-8 flex flex-1 flex-col gap-3 border-t pt-6 text-[15px]" style={{ borderColor: MB.line }}>
                      {p.features.map((f) => (
                        <li key={f} className="flex gap-3 text-[#F7E7DF]/85">
                          <span style={{ color: MB.rose }}>✿</span>
                          {f}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-10">
                      <Btn variant={pop ? "rose" : "line"} className="w-full" cursor="Enquire" onClick={() => send("Package enquiries straight to your WhatsApp", `Hi Mehr! 💄\nI'm interested in the ${p.name} package (${inr(p.price)}).\nCan you check my wedding date?`)}>
                        Enquire
                      </Btn>
                    </div>
                  </article>
                </Up>
              );
            })}
          </div>
        </Feature>
      </div>
    </section>
  );
}

function Money({ value }: { value: number }) {
  const mv = useMotionValue(value);
  const text = useTransform(mv, (v) => inr(Math.round(v)));
  useEffect(() => {
    const c = animate(mv, value, { duration: 0.6, ease: EASE });
    return () => c.stop();
  }, [value, mv]);
  return <motion.span>{text}</motion.span>;
}

function Builder() {
  const { send } = useActions();
  const [look, setLook] = useState<string>(BUILDER.look[1].id);
  const [events, setEvents] = useState(1);
  const [family, setFamily] = useState(2);
  const [addons, setAddons] = useState<string[]>(["hair", "drape"]);
  const lookObj = BUILDER.look.find((l) => l.id === look)!;
  const addonTotal = BUILDER.addons.filter((a) => addons.includes(a.id)).reduce((n, a) => n + a.price, 0);
  const extraEvents = Math.max(0, events - 1) * BUILDER.eventPrice;
  const familyTotal = family * BUILDER.familyPrice;
  const total = lookObj.price + extraEvents + familyTotal + addonTotal;

  const stepper = (v: number, set: (n: number) => void, min: number, max: number, label: string) => (
    <div className="flex items-center gap-3">
      <button type="button" aria-label={`Fewer ${label}`} onClick={() => set(Math.max(min, v - 1))} className="grid size-11 place-items-center rounded-full border text-[18px] hover:bg-[#F7E7DF]/10" style={{ borderColor: MB.line }}>
        −
      </button>
      <span className={`${SERIF} w-8 text-center text-[30px]`}>{v}</span>
      <button type="button" aria-label={`More ${label}`} onClick={() => set(Math.min(max, v + 1))} className="grid size-11 place-items-center rounded-full border text-[18px] hover:bg-[#F7E7DF]/10" style={{ borderColor: MB.line }}>
        +
      </button>
    </div>
  );

  return (
    <section className="px-5 pb-24 sm:px-10 sm:pb-32">
      <div className="mx-auto max-w-[1440px]">
        <Up className="text-center">
          <Kicker className="justify-center">Build your own</Kicker>
          <h2 className={`${SERIF} mt-6 text-[clamp(2.6rem,5vw,4.6rem)] leading-[1]`}>
            Price <span className="italic" style={{ color: MB.rose }}>builder.</span>
          </h2>
        </Up>
        <Feature id="price-builder" label="Live bridal price builder" className="mt-12">
          <div className="grid overflow-hidden rounded-[28px] border lg:grid-cols-[1.3fr_0.7fr]" style={{ borderColor: MB.line }}>
            <div className="flex flex-col gap-9 p-6 sm:p-10" style={{ background: MB.panel }}>
              <div>
                <p className={`${LABEL} text-[10px] text-[#B7948B]`}>Bridal makeup</p>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {BUILDER.look.map((l) => (
                    <button key={l.id} type="button" onClick={() => setLook(l.id)} className={`relative rounded-[16px] border p-4 text-left transition-colors ${l.id === look ? "border-[#E7B59E] bg-[#E7B59E]/10" : "hover:border-[#E7B59E]/50"}`} style={{ borderColor: l.id === look ? MB.rose : MB.line }}>
                      <span className={`${SERIF} block text-[22px]`}>{l.label}</span>
                      <span className="text-[14px] text-[#B7948B]">{inr(l.price)}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-[17px]">Number of events</p>
                  <p className="text-[13px] text-[#B7948B]">+ {inr(BUILDER.eventPrice)} for each extra look</p>
                </div>
                {stepper(events, setEvents, 1, 5, "events")}
              </div>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-[17px]">Family & bridesmaids</p>
                  <p className="text-[13px] text-[#B7948B]">{inr(BUILDER.familyPrice)} per person (party makeup)</p>
                </div>
                {stepper(family, setFamily, 0, 12, "family members")}
              </div>
              <div>
                <p className="text-[17px]">Add-ons</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {BUILDER.addons.map((a) => {
                    const on = addons.includes(a.id);
                    return (
                      <button key={a.id} type="button" onClick={() => setAddons(on ? addons.filter((x) => x !== a.id) : [...addons, a.id])} className={`h-11 rounded-full px-4 text-[14px] transition-colors ${on ? "bg-[#E7B59E] text-[#1A0A0E]" : "border text-[#F7E7DF]/75 hover:text-[#F7E7DF]"}`} style={{ borderColor: on ? undefined : MB.line }}>
                        {on ? "✓ " : "+ "}
                        {a.label} · {inr(a.price)}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-between gap-8 p-6 sm:p-10" style={{ background: `linear-gradient(170deg, ${MB.wine}, ${MB.bg})` }}>
              <div>
                <p className={LABEL} style={{ color: MB.rose }}>
                  Your total
                </p>
                <p className={`${SERIF} mt-4 text-[clamp(3rem,5vw,4.4rem)] leading-none`}>
                  <Money value={total} />
                </p>
                <ul className="mt-8 flex flex-col gap-2 text-[14px] text-[#F7E7DF]/70">
                  <li className="flex justify-between">
                    <span>{lookObj.label}</span>
                    <span>{inr(lookObj.price)}</span>
                  </li>
                  <AnimatePresence initial={false}>
                    {extraEvents > 0 && (
                      <motion.li key="ev" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="flex justify-between">
                        <span>{events - 1} extra looks</span>
                        <span>{inr(extraEvents)}</span>
                      </motion.li>
                    )}
                    {family > 0 && (
                      <motion.li key="fam" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="flex justify-between">
                        <span>{family} family members</span>
                        <span>{inr(familyTotal)}</span>
                      </motion.li>
                    )}
                    {addonTotal > 0 && (
                      <motion.li key="add" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="flex justify-between">
                        <span>{addons.length} add-ons</span>
                        <span>{inr(addonTotal)}</span>
                      </motion.li>
                    )}
                  </AnimatePresence>
                </ul>
              </div>
              <div>
                <Btn
                  className="w-full"
                  cursor="Send"
                  onClick={() =>
                    send(
                      "Custom quotes straight to your WhatsApp",
                      `Hi Mehr! 💄\nMy quote from your website:\n• ${lookObj.label}\n• ${events} ${events === 1 ? "event" : "events"}\n• ${family} family members\n• Add-ons: ${BUILDER.addons.filter((a) => addons.includes(a.id)).map((a) => a.label).join(", ") || "none"}\nTotal: ${inr(total)}\nCan you check my date?`,
                    )
                  }
                >
                  Send my quote
                </Btn>
                <p className="mt-3 text-center text-[12px] text-[#B7948B]">25% advance confirms your date.</p>
              </div>
            </div>
          </div>
        </Feature>
      </div>
    </section>
  );
}
