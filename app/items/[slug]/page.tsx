import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { PageHero } from "@/components/site/page-hero";
import { Container } from "@/components/ui/container";
import { getCategories } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo";

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const categories = await getCategories();
  const category = categories.find((item) => item.slug === slug);
  if (!category) {
    return {};
  }

  return buildMetadata({
    title: `${category.name} | 岡山の買取`,
    description: category.summary,
    path: `/items/${slug}`
  });
}

export default async function ItemDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const categories = await getCategories();
  const category = categories.find((item) => item.slug === slug);

  if (!category) {
    notFound();
  }

  return (
    <>
      <Breadcrumbs items={[{ label: "トップ", href: "/" }, { label: "買取品目", href: "/items" }, { label: category.name }]} />
      <PageHero eyebrow="Category Detail" title={category.name} description={category.description} />
      <section className="py-16">
        <Container className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-8">
            <div className="relative h-72 overflow-hidden rounded-[32px]">
              <Image src={category.heroImage} alt={category.name} fill className="object-cover" />
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <InfoCard title="買取対象ブランド" items={category.brands} />
              <InfoCard title="査定ポイント" items={category.points} />
              <InfoCard title="高く売るコツ" items={category.tips} />
              <InfoCard title="買取不可例" items={category.excluded} />
            </div>
          </div>
          <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-soft">
            <h2 className="text-2xl font-bold text-slate-950">査定依頼はこちら</h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">カテゴリ別の内容を見てから、フォーム・LINE・電話のいずれかでご相談いただけます。</p>
            <div className="mt-8 grid gap-3">
              <Link href="/contact" className="rounded-full bg-navy-800 px-6 py-4 text-center text-sm font-bold text-white">
                無料査定フォーム
              </Link>
              <Link href="/methods/line" className="rounded-full bg-brand-700 px-6 py-4 text-center text-sm font-bold text-white">
                LINE査定
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

function InfoCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-soft">
      <h2 className="text-xl font-bold text-slate-950">{title}</h2>
      <ul className="mt-4 grid gap-3">
        {items.map((item) => (
          <li key={item} className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
