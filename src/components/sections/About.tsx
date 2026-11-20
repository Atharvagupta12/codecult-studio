import { SITE } from "@/lib/site";
import { ArrowUpRightIcon, SparkIcon } from "../ui/icons";
import { Reveal } from "../ui/Reveal";
import { ScrollWords } from "../ui/ScrollWords";
import { SnapCarousel } from "../ui/CarouselDots";

// TODO(content): Replace with the real CodeCult community story (start date, what it did, members, founders).
const MANIFESTO =
  "CodeCult started as a community of people who love building for the web. We learned together, shipped projects together and pushed each other to get better. Now we're turning that energy into a studio, so local businesses get the same craft and care that big brands do.";

const CHAPTERS = [
  {
    n: "01",
    title: "The community",
    text: "CodeCult began as a community of developers and designers who met to learn, share and build things for the web together.",
  },
  {
    n: "02",
    title: "Building together",
    text: "Members teamed up on real projects, events and experiments, and learned what separates a good website from a great one.",
  },
  {
    n: "03",
    title: "The studio",
    text: "Today we're turning that experience into CodeCult Studio: a focused team designing and building websites for businesses across India.",
  },
];

export function About() {
  return (
    <section id="about" className="relative scroll-mt-10 px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <span className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-cream/45">
            <span className="text-ember">(07)</span>
            <span className="h-px w-10 bg-cream/20" />
            About CodeCult
          </span>
        </Reveal>

        <Reveal className="mt-8">
          <h2 className="text-[clamp(2.8rem,7vw,6.5rem)] font-medium leading-[0.92] tracking-[-0.05em]">
            From a community <br className="hidden sm:block" />
            <span className="font-serif font-normal italic text-ember">to a studio.</span>
          </h2>
        </Reveal>

        <ScrollWords
          text={MANIFESTO}
          highlight={["community", "studio", "craft"]}
          className="mt-8 max-w-[62rem] sm:mt-12 text-[clamp(1.5rem,3vw,2.6rem)] font-medium leading-[1.25] tracking-[-0.025em]"
        />

        <div className="relative mt-10 sm:mt-12">
          <SnapCarousel count={CHAPTERS.length} hint="Our story" gridClass="lg:grid lg:grid-cols-3 lg:gap-4">
          {CHAPTERS.map((c, i) => (
            <Reveal key={c.n} delay={i * 0.12} className="h-full">
              <article className="relative h-full rounded-[24px] border border-line bg-ink-2 p-6 sm:rounded-[28px] sm:p-8">
                <div className="flex items-center justify-between">
                  <span className={`grid size-[28px] place-items-center rounded-full ${i === 2 ? "bg-ember text-ink" : "border border-cream/20 bg-ink text-cream/60"}`}>
                    <SparkIcon className="size-3" />
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-cream/40">Chapter {c.n}</span>
                </div>
                <h3 className="mt-8 font-serif text-[32px] italic leading-none sm:mt-10 sm:text-[36px]">{c.title}</h3>
                <p className="mt-4 text-[15px] leading-relaxed text-cream/60">{c.text}</p>
              </article>
            </Reveal>
          ))}
          </SnapCarousel>
        </div>

        <Reveal className="mt-6">
          <a
            href={SITE.instagram}
            target="_blank"
            rel="noopener"
            className="group flex items-center justify-between gap-6 rounded-[28px] border border-line p-7 transition-colors hover:border-cream/25 sm:p-8"
          >
            <span className="text-[18px] text-cream/70 sm:text-[22px]">
              Follow the journey on Instagram <span className="text-cream">{SITE.instagramHandle}</span>
            </span>
            <span className="grid size-12 shrink-0 place-items-center rounded-full bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white transition-transform duration-500 group-hover:rotate-45">
              <ArrowUpRightIcon className="size-5" />
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
