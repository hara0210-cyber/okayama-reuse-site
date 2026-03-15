import Image from "next/image";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { PageHero } from "@/components/site/page-hero";
import { Container } from "@/components/ui/container";
import { getResults } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo";
import { formatCurrency, formatDate } from "@/lib/utils";

export async function generateStaticParams() {
  const items = await getResults();
  return items.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const items = await getResults();
  const item = items.find((result) => result.slug === slug);
  if (!item) {
    return {};
  }

  return buildMetadata({
    title: `${item.title} | 買取実績`,
    description: item.comment,
    path: `/results/${slug}`
  });
}

export default async function ResultDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const items = await getResults();
  const item = items.find((result) => result.slug === slug);
  if (!item) {
    notFound();
  }

  return (
    <>
      <Breadcrumbs items={[{ label: "トップ", href: "/" }, { label: "買取実績", href: "/results" }, { label: item.title }]} />
      <PageHero eyebrow="Result Detail" title={item.title} description={item.comment} />
      <section className="py-16">
        <Container className="grid gap-8 lg:grid-cols-[1fr_0.85fr]">
          <div className="relative h-80 overflow-hidden rounded-[32px]">
            <Image src={item.image} alt={item.title} fill className="object-cover" />
          </div>
          <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-soft">
            <dl className="grid gap-4 text-sm text-slate-700">
              <ResultRow label="カテゴリ" value={item.category} />
              <ResultRow label="状態" value={item.condition} />
              <ResultRow label="査定価格" value={formatCurrency(item.price)} />
              <ResultRow label="査定日" value={formatDate(item.date)} />
            </dl>
          </div>
        </Container>
      </section>
    </>
  );
}

function ResultRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4">
      <dt className="text-slate-500">{label}</dt>
      <dd className="mt-1 text-base font-bold text-slate-950">{value}</dd>
    </div>
  );
}
