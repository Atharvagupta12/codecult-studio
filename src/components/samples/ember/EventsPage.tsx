"use client";

import Image from "next/image";
import { useState } from "react";
import { useDemo } from "../shared/DemoProvider";
import { Feature } from "../shared/Feature";
import { EM, EVENTS } from "./data";
import { PageHero } from "./Shell";
import { Btn, D, LABEL, Label, Up, useExplain } from "./shared";

const GROUPS = ["10–15 guests", "16–25 guests", "26–40 guests", "Full buyout (60)"];
const BUDGETS = ["₹2,500 / guest", "₹3,500 / guest", "₹5,000+ / guest"];

export function EmberEvents() {
  const { event } = useExplain();
  return (
    <main>
      <PageHero img="/images/ember/firepit.jpg" kicker="Events & private dining" title="Evenings worth" italic="remembering." sub="Pop-ups, pairing dinners and the Chef's Table. Or take over the whole room and make the night your own." />

      {/* Upcoming */}
      <section className="px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-[1440px]">
          <Label>Upcoming</Label>
          <Feature id="events" label="Event listings with seat booking" className="mt-10">
            <div className="flex flex-col">
              {EVENTS.map((e, i) => (
                <Up key={e.title} delay={i * 0.08}>
                  <article className="group grid items-center gap-6 border-t py-8 md:grid-cols-[140px_1fr_260px_auto] md:gap-10" style={{ borderColor: EM.line }} data-cursor="Book">
                    <div>
                      <p className={`${D} text-[64px] italic leading-none`} style={{ color: EM.gold }}>
                        {e.date}
                      </p>
                      <p className={`mt-1 ${LABEL}`} style={{ color: EM.mute }}>
                        {e.month} · {e.day}
                      </p>
                    </div>
                    <div>
                      <h3 className={`${D} text-[30px] leading-tight transition-colors group-hover:text-[#D9A55B] sm:text-[36px]`}>{e.title}</h3>
                      <p className="mt-2 max-w-[34rem] text-[15px] leading-relaxed" style={{ color: EM.mute }}>
                        {e.desc}
                      </p>
                      <p className="mt-3 text-[14px] font-semibold">{e.price}</p>
                    </div>
                    <div className="relative aspect-[4/3] overflow-hidden rounded-[6px]">
                      <Image src={e.img} alt={e.title} fill sizes="260px" className="object-cover transition-transform duration-[1200ms] group-hover:scale-110" />
                    </div>
                    <Btn variant="line" onClick={() => event(e.title)}>
                      Book seats
                    </Btn>
                  </article>
                </Up>
              ))}
            </div>
          </Feature>
        </div>
      </section>

      {/* Chef's table */}
      <section className="px-5 sm:px-8">
        <Up className="mx-auto max-w-[1440px]">
          <div className="relative overflow-hidden rounded-[6px]">
            <Image src="/images/ember/chef-cooking.jpg" alt="Chef at the pass" fill sizes="100vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0C0907] via-[#0C0907]/80 to-[#0C0907]/20" />
            <div className="relative max-w-[640px] p-8 py-16 sm:p-16">
              <Label>Every Thursday</Label>
              <h2 className={`${D} mt-5 text-[clamp(2.6rem,5vw,4.6rem)] leading-none`}>
                The Chef&apos;s <span className="italic text-[#D9A55B]">Table.</span>
              </h2>
              <p className="mt-5 text-[17px] leading-relaxed" style={{ color: EM.mute }}>
                Eight seats at the kitchen counter. Ten courses cooked in front of you, with the chef explaining every plate. Booked out weeks ahead.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-5">
                <Btn onClick={() => event("The Chef's Table")} cursor="Book">
                  Join the waitlist
                </Btn>
                <span className="text-[14px]" style={{ color: EM.mute }}>
                  ₹4,500 per guest
                </span>
              </div>
            </div>
          </div>
        </Up>
      </section>

      <PrivateDining />
    </main>
  );
}

function PrivateDining() {
  const [group, setGroup] = useState(GROUPS[0]);
  const [budget, setBudget] = useState(BUDGETS[1]);
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const { explain } = useDemo();

  function send() {
    explain({
      title: "Private dining enquiries, sorted",
      body: "On your real website, big-ticket enquiries reach your WhatsApp with every detail filled in, so you can quote within minutes.",
      message: `Hi Ember! Private dining enquiry 🥂\nGroup: ${group}\nPreferred date: ${date || "(flexible)"}\nBudget: ${budget}\nName: ${name || "(your name)"} · ${phone || "(phone)"}`,
    });
  }

  return (
    <section className="px-5 py-28 sm:px-8 sm:py-36">
      <div className="mx-auto grid max-w-[1440px] items-start gap-14 lg:grid-cols-2">
        <div>
          <Label>Private dining</Label>
          <h2 className={`${D} mt-5 text-[clamp(2.6rem,5vw,4.6rem)] leading-[1.02]`}>
            The room <span className="italic text-[#D9A55B]">is yours.</span>
          </h2>
          <p className="mt-5 max-w-[32rem] text-[17px] leading-relaxed" style={{ color: EM.mute }}>
            Birthdays, engagements, offsites and family celebrations. A private room for 10–25 guests, or the entire restaurant for up to 60, with a menu built
            around you.
          </p>
          <div className="relative mt-10 aspect-[16/10] overflow-hidden rounded-[6px]">
            <Image src="/images/ember/interior.jpg" alt="Private dining room" fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
          </div>
        </div>

        <Feature id="private-dining" label="Private dining enquiry form" className="min-w-0">
          <div className="rounded-[6px] border p-6 sm:p-10" style={{ borderColor: EM.line, background: EM.panel }}>
            <h3 className={`${D} text-[30px] italic`}>Plan your event</h3>
            <p className={`mt-6 ${LABEL}`} style={{ color: EM.mute }}>
              Group size
            </p>
            <Chips options={GROUPS} value={group} onChange={setGroup} />
            <p className={`mt-6 ${LABEL}`} style={{ color: EM.mute }}>
              Budget
            </p>
            <Chips options={BUDGETS} value={budget} onChange={setBudget} />
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <Text label="Preferred date" value={date} onChange={setDate} placeholder="e.g. 20 December" className="sm:col-span-2" />
              <Text label="Name" value={name} onChange={setName} placeholder="Full name" />
              <Text label="Phone" value={phone} onChange={setPhone} placeholder="10-digit mobile" type="tel" />
            </div>
            <button type="button" onClick={send} className="mt-8 flex h-14 w-full items-center justify-center rounded-full text-[13px] font-semibold uppercase tracking-[0.2em]" style={{ background: EM.gold, color: EM.bg }} data-cursor="Send">
              Send enquiry
            </button>
          </div>
        </Feature>
      </div>
    </section>
  );
}

function Chips({ options, value, onChange }: { options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={o}
          type="button"
          onClick={() => onChange(o)}
          className={`rounded-full border px-4 py-2 text-[13px] transition-colors ${value === o ? "text-[#0C0907]" : "hover:border-[#D9A55B]"}`}
          style={{ borderColor: value === o ? EM.gold : EM.line, background: value === o ? EM.gold : "transparent" }}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

function Text({ label, value, onChange, placeholder, type = "text", className = "" }: { label: string; value: string; onChange: (v: string) => void; placeholder: string; type?: string; className?: string }) {
  return (
    <label className={`flex flex-col gap-1.5 ${className}`}>
      <span className={LABEL} style={{ color: EM.mute }}>
        {label}
      </span>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="h-12 rounded-xl border bg-transparent px-3 text-[15px] outline-none placeholder:text-[#A3968A]/60 focus:border-[#D9A55B]" style={{ borderColor: EM.line }} />
    </label>
  );
}
