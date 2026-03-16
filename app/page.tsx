import Link from "next/link";
import { CategoryCards, MethodCards, ReasonCards, ResultCards } from "@/components/site/cards";
import { FaqList } from "@/components/site/faq-list";
import { Hero } from "@/components/site/hero";
import { JsonLd } from "@/components/site/json-ld";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { areas } from "@/lib/areas";
import { getCategories, getFaqs, getNews, getResults } from "@/lib/cms";
import { methods } from "@/lib/content";
import { buildBreadcrumbSchema } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export default async function HomePage() {
  const [categories, results, faqs, news] = await Promise.all([getCategories(), getResults(), getFaqs(), getNews()]);

  return (
    <>
      <JsonLd data={buildBreadcrumbSchema([{ name: "トップ", path: "/" }])} />
      <Hero />

      <section className="py-10 sm:py-20">
        <Container className="space-y-5 sm:space-y-8">
          <SectionHeading
            eyebrow="Purchase Methods"
            title="選べる事業内容"
            description="店頭・宅配・出張・LINE査定に加えて、生成AI活用や業務自動化に対応するAIシステム開発もご案内しています。"
          />
          <MethodCards methods={methods} />
        </Container>
      </section>

      <section className="bg-slate-50 py-10 sm:py-20">
        <Container className="space-y-5 sm:space-y-8">
          <SectionHeading
            eyebrow="Why Choose Us"
            title="選ばれる理由"
            description="スピード、相談しやすさ、わかりやすい査定導線を意識し、初めての方にも不安なくご相談いただける構成にしています。"
          />
          <ReasonCards />
        </Container>
      </section>

      <section className="py-10 sm:py-20">
        <Container className="space-y-5 sm:space-y-8">
          <SectionHeading
            eyebrow="Area SEO"
            title="岡山県の地域別ご案内"
            description="岡山市、倉敷市、総社市など、地域別のご相談導線も整えています。地域名で探している方にもわかりやすいページ構成です。"
          />
          <div className="grid gap-3 md:grid-cols-3">
            {areas.map((area) => (
              <Link key={area.slug} href={`/areas/${area.slug}`} className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-soft transition hover:-translate-y-1 sm:rounded-[28px] sm:p-6">
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-600 sm:text-sm">Area</p>
                <h3 className="mt-2.5 text-lg font-bold text-slate-950 sm:mt-3 sm:text-xl">{area.name}</h3>
                <p className="mt-2.5 text-[13px] leading-6 text-slate-600 sm:mt-3 sm:text-sm sm:leading-7">{area.description}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-10 sm:py-20">
        <Container className="space-y-5 sm:space-y-8">
          <SectionHeading
            eyebrow="Categories"
            title="買取カテゴリ"
            description="SEO流入を意識し、カテゴリごとの専用ページで査定ポイントと高く売るコツを整理しています。"
          />
          <CategoryCards categories={categories.slice(0, 8)} />
          <Link href="/items" className="inline-flex rounded-full border border-slate-300 px-4 py-2.5 text-sm font-bold text-slate-900 transition hover:border-brand-500 sm:px-6 sm:py-3">
            すべての品目を見る
          </Link>
        </Container>
      </section>

      <section className="bg-slate-50 py-10 sm:py-20">
        <Container className="space-y-5 sm:space-y-8">
          <SectionHeading
            eyebrow="Purchase Results"
            title="最新の買取実績"
            description="商品画像、査定価格、コメントを公開することで、買取サービスの透明性と信頼性を高めています。"
          />
          <ResultCards results={results} />
        </Container>
      </section>

      <section className="py-10 sm:py-20">
        <Container className="grid gap-6 lg:grid-cols-[1fr_0.9fr] sm:gap-8">
          <div className="space-y-5 sm:space-y-8">
            <SectionHeading eyebrow="FAQ" title="よくあるご質問" description="査定前によくいただく質問をまとめています。" />
            <FaqList items={faqs} />
          </div>

          <div className="rounded-[24px] bg-slate-950 p-5 text-white shadow-soft sm:rounded-[32px] sm:p-8">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-300 sm:text-sm sm:tracking-[0.24em]">About & Contact</p>
            <h2 className="mt-3 text-[24px] font-bold leading-tight sm:mt-4 sm:text-3xl">ご相談前に確認しやすい基本情報</h2>
            <dl className="mt-5 grid gap-3 text-sm sm:mt-7 sm:gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <dt className="text-slate-400">会社名</dt>
                <dd className="mt-1 text-[14px] font-bold sm:text-base">{siteConfig.name}</dd>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <dt className="text-slate-400">所在地</dt>
                <dd className="mt-1 text-[14px] font-bold sm:text-base">{siteConfig.address}</dd>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <dt className="text-slate-400">古物商許可</dt>
                <dd className="mt-1 text-[14px] font-bold sm:text-base">
                  {siteConfig.authority}
                  <br />
                  {siteConfig.licenseNumber}
                </dd>
              </div>
            </dl>
            <div className="mt-5 grid gap-2.5 sm:mt-7 sm:grid-cols-2 sm:gap-3">
              <Link href="/contact" className="rounded-full bg-white px-5 py-3 text-center text-sm font-bold text-slate-950 sm:px-6 sm:py-4">
                お問い合わせ
              </Link>
              <a href={`tel:${siteConfig.phone.replace(/-/g, "")}`} className="rounded-full border border-white/15 px-5 py-3 text-center text-sm font-bold text-white sm:px-6 sm:py-4">
                電話相談
              </a>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-brand-700 py-10 text-white sm:py-16">
        <Container className="space-y-5 sm:space-y-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
            <div className="space-y-2.5 sm:space-y-3">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-100 sm:text-sm sm:tracking-[0.24em]">News</p>
              <h2 className="text-[24px] font-bold sm:text-3xl">お知らせ</h2>
              <p className="max-w-2xl text-[13px] leading-6 text-brand-50 sm:text-sm sm:leading-7">
                キャンペーン、営業時間変更、宅配キット導入などの最新情報を掲載しています。
              </p>
            </div>
            <Link
              href="/news"
              className="inline-flex w-fit items-center justify-center rounded-full border border-white/20 bg-white px-4 py-2.5 text-sm font-bold text-brand-700 transition hover:bg-brand-50 sm:px-6 sm:py-3"
            >
              お知らせ一覧を見る
            </Link>
          </div>

          <div className="grid gap-3 lg:grid-cols-2">
            {news.slice(0, 2).map((item) => (
              <Link key={item.slug} href={`/news/${item.slug}`} className="rounded-[22px] border border-white/15 bg-white/10 p-4 transition hover:bg-white/15 sm:rounded-[28px] sm:p-5">
                <p className="text-[12px] text-brand-100 sm:text-sm">{item.date}</p>
                <p className="mt-2 text-[17px] font-bold sm:text-xl">{item.title}</p>
                <p className="mt-2.5 text-[13px] leading-6 text-brand-50 sm:mt-3 sm:text-sm sm:leading-7">{item.excerpt}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
