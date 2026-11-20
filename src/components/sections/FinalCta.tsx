import { SITE, waLink } from "@/lib/site";
import { ArrowUpRightIcon, WhatsAppIcon } from "../ui/icons";
import { Magnetic } from "../ui/Magnetic";
import { Reveal, RiseText } from "../ui/Reveal";

export function FinalCta() {
  return (
    <section id="contact" className="relative overflow-hidden px-5 pb-20 pt-12 sm:px-8 sm:pb-28 sm:pt-16">
      <div aria-hidden className="pointer-events-none absolute bottom-[-30%] left-1/2 size-[900px] -translate-x-1/2 rounded-full bg-ember/20 blur-[160px]" />
      <div aria-hidden className="bg-rules pointer-events-none absolute inset-0" />

      <div className="relative mx-auto flex max-w-[1400px] flex-col items-center text-center">
        <Reveal>
          <span className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-cream/45">
            <span className="text-ember">(09)</span>
            <span className="h-px w-10 bg-cream/20" />
            Let&apos;s talk
          </span>
        </Reveal>

        <h2 className="mt-8 text-[clamp(3.4rem,11vw,11rem)] font-medium leading-[0.86] tracking-[-0.06em]">
          <RiseText text="Let's put your" />
          <br />
          <RiseText text="business" delay={0.1} />{" "}
          <RiseText text="online." delay={0.2} className="font-serif font-normal italic tracking-[-0.02em] text-ember" />
        </h2>

        <Reveal delay={0.25} className="mt-8 max-w-[34rem] text-[18px] leading-[1.6] text-cream/60">
          Send us a message with your business name and what you do. We&apos;ll reply with ideas, the right design and a clear price.
        </Reveal>

        <Reveal delay={0.35} className="mt-10 sm:mt-12">
          <Magnetic strength={0.25}>
            <a
              href={waLink()}
              target="_blank"
              rel="noopener"
              className="group relative grid size-[200px] place-items-center rounded-full bg-wa text-ink shadow-[0_30px_80px_-20px_rgba(37,211,102,0.55)] transition-transform duration-500 hover:scale-105 sm:size-[230px]"
            >
              <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-wa/30 [animation-duration:2.4s] motion-reduce:animate-none" />
              <span className="relative flex flex-col items-center gap-2">
                <WhatsAppIcon className="size-10" />
                <span className="text-[17px] font-semibold leading-tight">
                  Chat on
                  <br />
                  WhatsApp
                </span>
              </span>
            </a>
          </Magnetic>
        </Reveal>

        <Reveal delay={0.4} className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[15px] text-cream/55">
          <a href={waLink()} target="_blank" rel="noopener" className="hover:text-cream">
            +91 62628 66192
          </a>
          <span className="hidden h-4 w-px bg-cream/15 sm:block" />
          <a href={SITE.instagram} target="_blank" rel="noopener" className="inline-flex items-center gap-1 hover:text-cream">
            Instagram {SITE.instagramHandle} <ArrowUpRightIcon className="size-3.5" />
          </a>
          <span className="hidden h-4 w-px bg-cream/15 sm:block" />
          <span>{SITE.location}</span>
        </Reveal>
      </div>
    </section>
  );
}
