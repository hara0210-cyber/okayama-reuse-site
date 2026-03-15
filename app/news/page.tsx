import Link from "next/link";
import { PageHero } from "@/components/site/page-hero";
import { Container } from "@/components/ui/container";
import { getNews } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "お知らせ一覧",
  description: "キャンペーン、営業時間変更、宅配キット導入などのお知らせ一覧です。",
  path: "/news"
});

export default async function NewsPage() {
  const items = await getNews();

  return (
    <>
      <PageHero eyebrow="News" title="お知らせ一覧" description="CMS更新しやすいお知らせ一覧です。" />
      <section className="py-16">
        <Container className="space-y-4">
          {items.map((item) => (
            <Link key={item.slug} href={`/news/${item.slug}`} className="block rounded-[28px] border border-slate-200 bg-white p-6 shadow-soft">
              <p className="text-sm text-brand-700">{item.date}</p>
              <h2 className="mt-2 text-2xl font-bold text-slate-950">{item.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">{item.excerpt}</p>
            </Link>
          ))}
        </Container>
      </section>
    </>
  );
}
