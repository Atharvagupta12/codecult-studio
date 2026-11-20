import { SERVICES, TIERS, type Tier } from "@/data/samples";
import { waLink } from "@/lib/site";
import { SnapCarousel } from "../ui/CarouselDots";
import { CountUp } from "../ui/CountUp";
import { ArrowIcon, CheckIcon } from "../ui/icons";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";

type Cell = boolean | string;
const ROWS: [string, Cell, Cell, Cell][] = [
  ["Custom UI/UX design", true, true, true],
  ["Mobile-first & lightning fast", true, true, true],
  ["WhatsApp button + Google Maps", true, true, true],
  ["Pages", "1 long page", "Up to 4", "Up to 6"],
  ["Gallery & customer reviews", false, true, true],
  ["Scroll animations", false, true, true],
  ["Smart features (filters, booking, cart…)", false, "1 feature", "Up to 3"],
  ["Premium motion & page transitions", false, false, true],
  ["Basic SEO setup", false, false, true],
  ["Rounds of changes", "2", "2", "2"],
];

const ORDER: Tier[] = ["Essential", "Signature", "Premium"];

const ALWAYS = ["Custom UI/UX design", "Free hosting, forever", "SSL security (https)", "Works on every phone", "WhatsApp enquiry button", "You own your website"];

export function Pricing() {
  return (
    <section id="pricing" className="scroll-mt-6 px-3 sm:px-5">
      <div className="relative overflow-hidden rounded-[32px] bg-cream px-5 py-16 text-ink sm:rounded-[48px] sm:px-8 sm:py-24">
        {/* paper texture glow */}
        <div aria-hidden className="pointer-events-none absolute -right-40 -top-40 size-[520px] rounded-full bg-ember/15 blur-[120px]" />
        <div className="relative mx-auto max-w-[1300px]">
          <SectionHeading
            tone="light"
            index="03"
            label="Pricing"
            title="Three tiers."
            italic="Every business."
            align="split"
            intro={
              <>
                Same simple pricing for every niche. Pick a tier, pay once, and own a website that looks like it cost three times as
                much. <span className="font-medium text-ink">No hidden charges, no monthly fees.</span>
              </>
            }
          />

          <div className="mt-10 sm:mt-14">
            <SnapCarousel count={3} tone="light" hint="Swipe tiers" colors={["#0A0908", "#FF5A1F", "#C99A3C"]} gridClass="lg:grid lg:grid-cols-3 lg:gap-5">
            {ORDER.map((t, i) => {
              const tier = TIERS[t];
              const featured = t === "Signature";
              return (
                <Reveal key={t} delay={i * 0.1} className="h-full">
                  <article
                    className={`relative flex h-full flex-col rounded-[24px] p-6 sm:rounded-[28px] sm:p-9 ${
                      featured ? "bg-ink text-cream shadow-[0_40px_80px_-30px_rgba(10,9,8,0.6)] lg:-my-4 lg:py-12" : "border border-ink/10 bg-white/60"
                    }`}
                  >
                    {featured && (
                      <span className="absolute right-6 top-6 rounded-full bg-ember px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-ink">
                        Best value
                      </span>
                    )}
                    <p className={`font-mono text-[11px] uppercase tracking-[0.18em] ${featured ? "text-ember" : "text-ink/50"}`}>
                      0{i + 1} · {t}
                    </p>
                    <CountUp to={tier.amount} className="mt-5 block font-serif text-[60px] leading-[0.85] tracking-[-0.02em] sm:text-[80px]" />
                    <p className={`mt-3 text-[14px] ${featured ? "text-cream/55" : "text-ink/55"}`}>
                      one-time · {tier.pages.toLowerCase()} · live in {tier.days} days
                    </p>
                    <p className={`mt-5 text-[16px] leading-relaxed ${featured ? "text-cream/80" : "text-ink/75"}`}>{tier.tagline}</p>

                    <ul className={`mt-7 flex flex-col border-t pt-6 ${featured ? "border-cream/10" : "border-ink/10"}`}>
                      {ROWS.map(([label, ...vals]) => {
                        const v = vals[i];
                        const off = v === false;
                        return (
                          <li key={label} className={`flex items-center justify-between gap-4 py-1.5 text-[13px] sm:py-2 sm:text-[14px] ${off ? "opacity-35" : ""}`}>
                            <span className={off ? "line-through decoration-1" : ""}>{label}</span>
                            {typeof v === "string" ? (
                              <span className="shrink-0 font-medium">{v}</span>
                            ) : v ? (
                              <span className={`grid size-5 shrink-0 place-items-center rounded-full ${featured ? "bg-ember text-ink" : "bg-ink text-cream"}`}>
                                <CheckIcon className="size-3" />
                              </span>
                            ) : (
                              <span className="w-5 shrink-0 text-center">—</span>
                            )}
                          </li>
                        );
                      })}
                    </ul>

                    <a
                      href="#work"
                      className={`group mt-8 flex h-13 items-center justify-between rounded-full py-1.5 pl-6 pr-1.5 text-[15px] font-semibold transition-colors ${
                        featured ? "bg-cream text-ink hover:bg-ember" : "bg-ink text-cream hover:bg-ember hover:text-ink"
                      }`}
                    >
                      See {t} designs
                      <span className={`grid size-10 place-items-center rounded-full transition-transform duration-500 group-hover:-rotate-45 ${featured ? "bg-ink text-cream" : "bg-cream text-ink"}`}>
                        <ArrowIcon className="size-4" />
                      </span>
                    </a>
                  </article>
                </Reveal>
              );
            })}
            </SnapCarousel>
          </div>

          {/* Always included */}
          <Reveal className="mt-10 sm:mt-12">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/50">Included with every website</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {ALWAYS.map((a) => (
                <li key={a} className="flex items-center gap-2 rounded-full border border-ink/10 bg-white/70 px-4 py-2 text-[14px]">
                  <CheckIcon className="size-3.5 text-ember" />
                  {a}
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Domain + payment notes */}
          <div className="mt-6 grid gap-4 md:grid-cols-[1.4fr_1fr]">
            <Reveal>
              <div className="flex h-full flex-col gap-4 rounded-[24px] bg-ink p-7 text-cream sm:flex-row sm:items-center sm:p-8">
                <div className="grid size-14 shrink-0 place-items-center rounded-2xl bg-ember font-mono text-[13px] font-bold text-ink">.in</div>
                <div className="flex-1">
                  <p className="text-[18px] font-medium">Your domain stays yours.</p>
                  <p className="mt-1 text-[15px] leading-relaxed text-cream/60">
                    The domain (like <span className="font-mono text-cream">yourbusiness.in</span>) isn&apos;t included in the price. You buy it
                    in your name, or we buy and connect it for you from <span className="text-cream">{SERVICES.domain}</span>.
                  </p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="flex h-full flex-col justify-between gap-4 rounded-[24px] border border-ink/10 bg-white/60 p-7 sm:p-8">
                <p className="text-[18px] font-medium">50% to start, 50% when you&apos;re live.</p>
                <a href={waLink("Hi CodeCult Studio! I have a question about your pricing.")} target="_blank" rel="noopener" className="group inline-flex items-center gap-2 text-[15px] font-semibold">
                  Questions about pricing? Ask on WhatsApp
                  <ArrowIcon className="size-4 text-ember transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
