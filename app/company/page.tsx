import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { JsonLd } from "@/components/site/json-ld";
import { PageHero } from "@/components/site/page-hero";
import { Container } from "@/components/ui/container";
import { methods } from "@/lib/content";
import { buildBreadcrumbSchema, buildLocalBusinessSchema, buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata = buildMetadata({
  title: "会社概要",
  description: "会社情報、所在地、連絡先、営業時間などを掲載しています。",
  path: "/company"
});

export default function CompanyPage() {
  return (
    <>
      <JsonLd data={buildBreadcrumbSchema([{ name: "トップ", path: "/" }, { name: "会社概要", path: "/company" }])} />
      <JsonLd data={buildLocalBusinessSchema()} />
      <Breadcrumbs items={[{ label: "トップ", href: "/" }, { label: "会社概要" }]} />
      <PageHero eyebrow="Company" title="会社概要" description="法人としての信頼性を伝えるため、基本情報を見やすく整理しています。" />
      <section className="py-16">
        <Container className="grid gap-8 lg:grid-cols-[1fr_0.95fr]">
          <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-soft">
            <dl className="grid gap-4 text-sm text-slate-700">
              <CompanyRow label="会社名" value={siteConfig.name} />
              <CompanyRow label="所在地" value={siteConfig.address} />
              <CompanyRow label="電話番号" value={siteConfig.phone} />
              <CompanyRow label="メールアドレス" value={siteConfig.email} />
              <CompanyRow label="営業時間" value={siteConfig.businessHours} />
            </dl>
          </div>
          <div className="rounded-[32px] bg-slate-950 p-8 text-white shadow-soft">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-200">Business</p>
            <h2 className="mt-4 text-2xl font-bold">事業内容</h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              リユース事業に加え、生成AI活用や業務自動化を支援するAIシステム開発も行っています。
              現場課題の整理から設計、実装、運用改善まで一貫して対応します。
            </p>
            <ul className="mt-6 grid gap-3">
              {methods.map((method) => (
                <li key={method.slug} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
                  <p className="text-base font-bold">{method.title}</p>
                  <p className="mt-2 text-sm leading-7 text-slate-300">{method.lead}</p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>
    </>
  );
}

function CompanyRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-2 rounded-2xl bg-slate-50 p-4 sm:grid-cols-[180px_1fr] sm:items-center">
      <dt className="font-semibold text-slate-500">{label}</dt>
      <dd className="text-base font-bold text-slate-950">{value}</dd>
    </div>
  );
}
