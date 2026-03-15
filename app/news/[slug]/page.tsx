import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { PageHero } from "@/components/site/page-hero";
import { Container } from "@/components/ui/container";
import { getNews } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo";

export async function generateStaticParams() {
  const items = await getNews();
  return items.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const items = await getNews();
  const item = items.find((news) => news.slug === slug);
  if (!item) {
    return {};
  }

  return buildMetadata({
    title: `${item.title} | お知らせ`,
    description: item.excerpt,
    path: `/news/${slug}`
  });
}

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const items = await getNews();
  const item = items.find((news) => news.slug === slug);
  if (!item) {
    notFound();
  }

  return (
    <>
      <Breadcrumbs items={[{ label: "トップ", href: "/" }, { label: "お知らせ", href: "/news" }, { label: item.title }]} />
      <PageHero eyebrow="News Detail" title={item.title} description={item.excerpt} />
      <section className="py-16">
        <Container className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-soft">
          <p className="text-sm text-brand-700">{item.date}</p>
          <div className="mt-6 text-base leading-8 text-slate-700">{item.body}</div>
        </Container>
      </section>
    </>
  );
}
