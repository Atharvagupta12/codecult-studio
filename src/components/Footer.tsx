import { SERVICES, TIERS } from "@/data/samples";
import { SITE, waLink } from "@/lib/site";
import { Logo } from "./Nav";

const EXPLORE = [
  ["Sample websites", "#work"],
  ["Pricing", "#pricing"],
  ["WhatsApp + Google", "#services"],
  ["How it works", "#process"],
  ["About", "#about"],
  ["FAQ", "#faq"],
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line px-5 pt-16 sm:px-8">
      <div className="mx-auto grid max-w-[1400px] gap-12 pb-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="flex flex-col gap-5">
          <Logo />
          <p className="max-w-[22rem] text-[15px] leading-relaxed text-cream/50">
            Websites, WhatsApp and Google setup for local businesses. Designed and developed in-house.
          </p>
        </div>
        <FooterCol title="Explore">
          {EXPLORE.map(([l, h]) => (
            <a key={h} href={h} className="hover:text-cream">
              {l}
            </a>
          ))}
        </FooterCol>
        <FooterCol title="Services">
          <span>Websites from {TIERS.Essential.price}</span>
          <span>WhatsApp + Google {SERVICES.whatsappGoogle}</span>
          <span>SEO setup from {SERVICES.seo}</span>
          <span>Logo design from {SERVICES.logo}</span>
          <span>Posters from {SERVICES.poster}</span>
        </FooterCol>
        <FooterCol title="Contact">
          <a href={waLink()} target="_blank" rel="noopener" className="hover:text-cream">
            WhatsApp +91 62628 66192
          </a>
          <a href={SITE.instagram} target="_blank" rel="noopener" className="hover:text-cream">
            Instagram {SITE.instagramHandle}
          </a>
          <span>Indore, Madhya Pradesh</span>
          <span>Working across India</span>
        </FooterCol>
      </div>

      <div className="mx-auto flex max-w-[1400px] flex-col justify-between gap-2 border-t border-line py-6 font-mono text-[11px] uppercase tracking-[0.14em] text-cream/35 sm:flex-row">
        <span>© 2026 CodeCult Studio</span>
        <span>Designed &amp; built in-house · Indore</span>
      </div>

      {/* Giant wordmark */}
      <div aria-hidden className="pointer-events-none -mb-[0.22em] select-none text-center text-[22vw] font-semibold leading-none tracking-[-0.07em]">
        <span className="bg-gradient-to-b from-cream/[0.14] to-transparent bg-clip-text text-transparent">
          CodeCult<span className="font-serif font-normal italic">.</span>
        </span>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3 text-[15px] text-cream/55">
      <p className="mb-1 font-mono text-[11px] uppercase tracking-[0.18em] text-cream/35">{title}</p>
      {children}
    </div>
  );
}
