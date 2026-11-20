import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { KabirCaseStudy } from "@/components/samples/kabir-rao/CaseStudy";
import { PROJECTS } from "@/components/samples/kabir-rao/data";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = PROJECTS.find((x) => x.slug === slug);
  return { title: p ? `${p.name} case study` : "Project" };
}

async function CaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = PROJECTS.find((x) => x.slug === slug);
  if (!project) notFound();
  return <KabirCaseStudy project={project} />;
}

export default function Page({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <CaseStudy params={params} />
    </Suspense>
  );
}
