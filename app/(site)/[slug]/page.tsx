import { DynamicPageContent } from "@/app/(site)/[slug]/components/DynamicPageContent";

export default async function GeneratedPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <DynamicPageContent slug={slug} />;
}
