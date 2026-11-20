import { waLink } from "@/lib/site";
import { ArrowIcon } from "../ui/icons";
import { Magnetic } from "../ui/Magnetic";
import { Reveal, RiseText } from "../ui/Reveal";

const IDEAS = ["Online store", "Booking system", "Restaurant ordering", "Landing page", "Multi-branch business", "Real-estate listings", "Event website", "School / coaching portal"];

export function CustomBand() {
  return (
    <section id="custom" className="scroll-mt-6 px-3 sm:px-5">
      <div className="relative overflow-hidden rounded-[32px] bg-ember px-5 py-14 text-ink sm:rounded-[48px] sm:px-12 sm:py-20">
        {/* Rotating badge */}
        <div aria-hidden className="absolute right-10 top-10 hidden size-[190px] md:block">
          <svg viewBox="0 0 200 200" className="size-full animate-[spin_22s_linear_infinite] motion-reduce:animate-none">
            <defs>
              <path id="circ" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
            </defs>
            <text className="fill-ink font-mono text-[12px] uppercase tracking-[0.2em]">
              <textPath href="#circ">Custom design · Custom build · Custom price ·</textPath>
            </text>
          </svg>
          <span className="absolute inset-0 grid place-items-center font-serif text-[64px] italic">∞</span>
        </div>

        {/* Big ghost type */}
        <div aria-hidden className="pointer-events-none absolute -bottom-[0.18em] left-0 select-none whitespace-nowrap font-serif text-[30vw] italic leading-none text-ink/[0.07]">
          custom
        </div>

        <div className="relative mx-auto max-w-[1300px]">
          <Reveal>
            <span className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-ink/60">
              <span>(05)</span>
              <span className="h-px w-10 bg-ink/30" />
              Custom website
            </span>
          </Reveal>
          <h2 className="mt-6 max-w-[14ch] text-[clamp(3rem,8.5vw,8rem)] font-medium leading-[0.9] tracking-[-0.055em]">
            <RiseText text="Got a bigger idea?" />{" "}
            <RiseText text="We'll build it." delay={0.15} className="block font-serif font-normal italic tracking-[-0.02em]" />
          </h2>
          <Reveal delay={0.2} className="mt-8 max-w-[38rem] text-[18px] leading-[1.6] text-ink/75">
            Not every business fits a sample. Tell us what you need and we&apos;ll design and build it from scratch.{" "}
            <span className="font-semibold text-ink">Custom website, custom design, custom price.</span>
          </Reveal>

          <Reveal delay={0.25} className="mt-9 flex max-w-[52rem] flex-wrap gap-2">
            {IDEAS.map((i) => (
              <span key={i} className="rounded-full border border-ink/20 px-4 py-2 text-[14px] font-medium">
                {i}
              </span>
            ))}
          </Reveal>

          <Reveal delay={0.3} className="mt-12">
            <Magnetic>
              <a
                href={waLink("Hi CodeCult Studio! I have an idea for a custom website. Can we talk?")}
                target="_blank"
                rel="noopener"
                className="group inline-flex h-16 items-center gap-4 rounded-full bg-ink pl-8 pr-2 text-[17px] font-semibold text-cream"
              >
                Tell us your idea
                <span className="grid size-12 place-items-center rounded-full bg-cream text-ink transition-transform duration-500 group-hover:-rotate-45">
                  <ArrowIcon className="size-5" />
                </span>
              </a>
            </Magnetic>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
