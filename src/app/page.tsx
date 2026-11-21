import type { Metadata } from "next";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/hero/Hero";
import { Nav } from "@/components/Nav";
import { NicheMarquee } from "@/components/NicheMarquee";
import { About } from "@/components/sections/About";
import { AddOns } from "@/components/sections/AddOns";
import { CustomBand } from "@/components/sections/CustomBand";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { Pricing } from "@/components/sections/Pricing";
import { Process } from "@/components/sections/Process";
import { WhatsAppSetup } from "@/components/sections/WhatsAppSetup";
import { WhyUs } from "@/components/sections/WhyUs";
import { Work } from "@/components/sections/Work";
import { businessJsonLd, faqJsonLd, websiteJsonLd } from "@/lib/seo";

// Only the home page sets a canonical URL (child routes must not inherit it)
export const metadata: Metadata = { alternates: { canonical: "/" } };

const JSON_LD = [businessJsonLd(), websiteJsonLd(), faqJsonLd()];

export default function Home() {
  return (
    <>
      {JSON_LD.map((d, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(d) }} />
      ))}
      <Nav />
      <main>
        <Hero />
        <NicheMarquee />
        <WhyUs />
        <Work />
        <Pricing />
        <WhatsAppSetup />
        <AddOns />
        <CustomBand />
        <Process />
        <About />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
