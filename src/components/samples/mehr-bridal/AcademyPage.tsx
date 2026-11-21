"use client";

import Image from "next/image";
import { Feature } from "../shared/Feature";
import { COURSES, IMG, MB, inr } from "./data";
import { PageHead } from "./Shell";
import { Btn, Kicker, LABEL, SERIF, Up, useActions } from "./shared";

export function MehrAcademy() {
  const { send } = useActions();
  return (
    <main>
      <PageHead kicker="Mehr Academy" title="Learn from" italic="the studio." sub="Small batches of six, real brides to practise on and a certificate that opens doors. From self-makeup for brides-to-be to the full professional bridal course." img={IMG.academy} />

      <section className="px-5 pb-24 sm:px-10 sm:pb-32">
        <div className="mx-auto max-w-[1440px]">
          <Feature id="courses" label="Courses with batch dates + seats left">
            <div className="grid gap-5 lg:grid-cols-3">
              {COURSES.map((c, i) => (
                <Up key={c.id} delay={i * 0.08}>
                  <article className="flex h-full flex-col rounded-[28px] border p-8" style={{ borderColor: c.popular ? MB.rose : MB.line, background: MB.panel }}>
                    <div className="flex items-center justify-between">
                      <span className={`${LABEL} text-[10px] text-[#B7948B]`}>{c.days}</span>
                      <span className="rounded-full px-3 py-1 text-[12px]" style={{ background: c.seats <= 2 ? "rgba(231,181,158,0.2)" : "rgba(247,231,223,0.08)", color: c.seats <= 2 ? MB.rose : MB.blush }}>
                        {c.seats} seats left
                      </span>
                    </div>
                    <h2 className={`${SERIF} mt-6 text-[34px] italic leading-[1.05]`}>{c.name}</h2>
                    <p className="mt-2 text-[14px] text-[#B7948B]">{c.for}</p>
                    <ul className="mt-6 flex flex-1 flex-col gap-2.5 text-[15px]">
                      {c.learn.map((l) => (
                        <li key={l} className="flex gap-3 text-[#F7E7DF]/85">
                          <span style={{ color: MB.rose }}>✿</span>
                          {l}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-8 flex items-end justify-between border-t pt-5" style={{ borderColor: MB.line }}>
                      <div>
                        <p className={`${LABEL} text-[9px] text-[#B7948B]`}>Next batch</p>
                        <p className={`${SERIF} mt-1 text-[26px]`}>{c.next}</p>
                      </div>
                      <p className={`${SERIF} text-[28px]`} style={{ color: MB.rose }}>
                        {inr(c.price)}
                      </p>
                    </div>
                    <Btn className="mt-6 w-full" variant={c.popular ? "rose" : "line"} cursor="Apply" onClick={() => send("Course applications straight to your WhatsApp", `Hi Mehr Academy! 🎓\nI'd like to join the ${c.name} (batch starting ${c.next}).\nIs a seat still available?`)}>
                      Reserve a seat
                    </Btn>
                  </article>
                </Up>
              ))}
            </div>
          </Feature>
        </div>
      </section>

      <section className="px-5 pb-24 sm:px-10 sm:pb-32">
        <div className="mx-auto grid max-w-[1440px] items-center gap-12 lg:grid-cols-2">
          <Up className="grid grid-cols-2 gap-3">
            <div className="relative aspect-[3/4] overflow-hidden rounded-[20px]">
              <Image src={IMG.kit} alt="Professional makeup brushes" fill sizes="25vw" className="object-cover" />
            </div>
            <div className="relative mt-12 aspect-[3/4] overflow-hidden rounded-[20px]">
              <Image src={IMG.eyes} alt="Student practising eye makeup" fill sizes="25vw" className="object-cover" />
            </div>
          </Up>
          <Up delay={0.1}>
            <Kicker>Why learn with Mehr</Kicker>
            <h2 className={`${SERIF} mt-6 text-[clamp(2.4rem,4.4vw,4rem)] leading-[1.05]`}>
              Real brides. <span className="italic" style={{ color: MB.rose }}>Real skills.</span>
            </h2>
            <ul className="mt-8 grid grid-cols-2 gap-6">
              {[
                ["6", "students per batch"],
                ["40+", "live practice looks"],
                ["320", "artists trained"],
                ["100%", "pro kit included"],
              ].map(([k, v]) => (
                <li key={v} className="border-t pt-4" style={{ borderColor: MB.line }}>
                  <p className={`${SERIF} text-[40px] leading-none`} style={{ color: MB.rose }}>
                    {k}
                  </p>
                  <p className="mt-2 text-[14px] text-[#F7E7DF]/70">{v}</p>
                </li>
              ))}
            </ul>
          </Up>
        </div>
      </section>
    </main>
  );
}
