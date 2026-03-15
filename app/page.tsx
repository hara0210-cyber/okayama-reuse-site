import Link from "next/link";
import { CategoryCards, MethodCards, ReasonCards, ResultCards } from "@/components/site/cards";
import { FaqList } from "@/components/site/faq-list";
import { Hero } from "@/components/site/hero";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { getCategories, getFaqs, getNews, getResults } from "@/lib/cms";
import { methods } from "@/lib/content";
import { siteConfig } from "@/lib/site";

export default async function HomePage() {
  const [categories, results, faqs, news] = await Promise.all([getCategories(), getResults(), getFaqs(), getNews()]);

  return (
    <>
      <Hero />

      <section className="py-16 sm:py-20">
        <Container className="space-y-8">
          <SectionHeading
            eyebrow="Purchase Methods"
            title="選べる4つの買取方法"
            description="店頭・宅配・出張・LINE査定まで、お客様の状況にあわせて選べる導線をスマホ中心でわかりやすく設計しています。"
          />
          <MethodCards methods={methods} />
        </Container>
      </section>

      <section className="bg-slate-50 py-16 sm:py-20">
        <Container className="space-y-8">
          <SectionHeading
            eyebrow="Why Choose Us"
            title="選ばれる理由"
            description="信頼感を高める会社情報、法定表示、わかりやすい査定導線で、初めての方にも安心してご相談いただけます。"
          />
          <ReasonCards />
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container className="space-y-8">
          <SectionHeading
            eyebrow="Categories"
            title="買取カテゴリ"
            description="SEO流入を意識し、カテゴリごとの専用ページで査定ポイントと高く売るコツを整理しています。"
          />
          <CategoryCards categories={categories.slice(0, 8)} />
          <Link href="/items" className="inline-flex rounded-full border border-slate-300 px-6 py-3 text-sm font-bold text-slate-900 transition hover:border-brand-500">
            すべての品目を見る
          </Link>
        </Container>
      </section>

      <section className="bg-slate-50 py-16 sm:py-20">
        <Container className="space-y-8">
          <SectionHeading
            eyebrow="Purchase Results"
            title="最新の買取実績"
            description="商品画像、査定価格、コメントを公開することで、買取サービスの透明性と信頼性を高めています。"
          />
          <ResultCards results={results} />
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
          <div className="space-y-8">
            <SectionHeading eyebrow="FAQ" title="よくあるご質問" description="査定前によくいただく質問をまとめています。" />
            <FaqList items={faqs} />
          </div>

          <div className="rounded-[32px] bg-slate-950 p-8 text-white shadow-soft">
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-brand-300">Company & Contact</p>
            <h2 className="mt-4 text-3xl font-bold">法人運営だから、情報を明確に公開しています</h2>
            <dl className="mt-8 grid gap-4 text-sm">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <dt className="text-slate-400">会社名</dt>
                <dd className="mt-1 text-base font-bold">{siteConfig.name}</dd>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <dt className="text-slate-400">所在地</dt>
                <dd className="mt-1 text-base font-bold">{siteConfig.address}</dd>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <dt className="text-slate-400">古物商許可</dt>
                <dd className="mt-1 text-base font-bold">
                  {siteConfig.authority}
                  <br />
                  {siteConfig.licenseNumber}
                </dd>
              </div>
            </dl>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <Link href="/contact" className="rounded-full bg-white px-6 py-4 text-center text-sm font-bold text-slate-950">
                お問い合わせ
              </Link>
              <a href={`tel:${siteConfig.phone.replace(/-/g, "")}`} className="rounded-full border border-white/15 px-6 py-4 text-center text-sm font-bold text-white">
                電話相談
              </a>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-brand-700 py-16 text-white">
        <Container className="space-y-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-3">
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-brand-100">News</p>
              <h2 className="text-3xl font-bold">お知らせ</h2>
              <p className="max-w-2xl text-sm leading-7 text-brand-50">
                キャンペーン、営業時間変更、宅配キット導入などの最新情報を掲載しています。
              </p>
            </div>
            <Link
              href="/news"
              className="inline-flex w-fit items-center justify-center rounded-full border border-white/20 bg-white px-6 py-3 text-sm font-bold text-brand-700 transition hover:bg-brand-50"
            >
              お知らせ一覧を見る
            </Link>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {news.slice(0, 2).map((item) => (
              <Link key={item.slug} href={`/news/${item.slug}`} className="rounded-[28px] border border-white/15 bg-white/10 p-5 transition hover:bg-white/15">
                <p className="text-sm text-brand-100">{item.date}</p>
                <p className="mt-2 text-xl font-bold">{item.title}</p>
                <p className="mt-3 text-sm leading-7 text-brand-50">{item.excerpt}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
