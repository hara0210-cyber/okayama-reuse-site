import { PageHero } from "@/components/site/page-hero";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "会社概要",
  description: "会社情報、所在地、連絡先、営業時間などを掲載しています。",
  path: "/company"
});

export default function CompanyPage() {
  return (
    <>
      <PageHero eyebrow="Company" title="会社概要" description="法人としての信頼性を伝えるため、基本情報を見やすく整理しています。" />
      <section className="py-16">
        <Container className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-soft">
          <dl className="grid gap-4 text-sm text-slate-700">
            <CompanyRow label="会社名" value={siteConfig.name} />
            <CompanyRow label="所在地" value={siteConfig.address} />
            <CompanyRow label="電話番号" value={siteConfig.phone} />
            <CompanyRow label="メールアドレス" value={siteConfig.email} />
            <CompanyRow label="営業時間" value={siteConfig.businessHours} />
          </dl>
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
