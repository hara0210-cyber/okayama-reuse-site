import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { PageHero } from "@/components/site/page-hero";
import { Container } from "@/components/ui/container";
import { methods } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return methods.map((method) => ({ slug: method.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const method = methods.find((item) => item.slug === slug);
  if (!method) {
    return {};
  }

  return buildMetadata({
    title: `${method.title} | 買取方法`,
    description: method.description,
    path: `/methods/${slug}`
  });
}

export default async function MethodDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const method = methods.find((item) => item.slug === slug);
  if (!method) {
    notFound();
  }

  return (
    <>
      <Breadcrumbs items={[{ label: "トップ", href: "/" }, { label: "買取方法", href: "/methods" }, { label: method.title }]} />
      <PageHero eyebrow="Method Detail" title={method.title} description={method.description} />
      <section className="py-16">
        <Container className="grid gap-8 lg:grid-cols-[1fr_0.85fr]">
          <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-soft">
            <h2 className="text-2xl font-bold text-slate-950">この方法が向いている方</h2>
            <p className="mt-4 text-base leading-8 text-slate-600">{method.lead}</p>
            <ul className="mt-6 grid gap-3">
              {method.points.map((point) => (
                <li key={point} className="rounded-2xl bg-slate-50 px-4 py-4 text-sm text-slate-700">
                  {point}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[32px] bg-slate-950 p-8 text-white shadow-soft">
            <h2 className="text-2xl font-bold">お問い合わせ導線</h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">事前の概算査定はLINE、詳細な相談はフォーム、急ぎの確認は電話がおすすめです。</p>
            <div className="mt-8 grid gap-3">
              <Link href="/contact" className="rounded-full bg-white px-6 py-4 text-center text-sm font-bold text-slate-950">
                無料査定フォーム
              </Link>
              <Link href="/methods/line" className="rounded-full bg-brand-700 px-6 py-4 text-center text-sm font-bold text-white">
                LINE査定を見る
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
