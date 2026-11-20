import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { STORIES } from "@/components/samples/aarav-mehta/data";
import { AaravStory } from "@/components/samples/aarav-mehta/StoriesPage";

export function generateStaticParams() {
  return STORIES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = STORIES.find((x) => x.slug === slug);
  return { title: s ? `${s.couple} · ${s.place}` : "Story" };
}

async function Story({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const story = STORIES.find((x) => x.slug === slug);
  if (!story) notFound();
  return <AaravStory story={story} />;
}

export default function Page({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <Story params={params} />
    </Suspense>
  );
}
