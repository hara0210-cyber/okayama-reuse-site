import { PageHero } from "@/components/site/page-hero";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "古物商許可・法定表示",
  description: "古物商許可番号、許可公安委員会名、標識掲示に関する表示を掲載しています。",
  path: "/license"
});

export default function LicensePage() {
  return (
    <>
      <PageHero eyebrow="Legal Notice" title="古物商許可・法定表示" description="古物営業法に基づく表示を、ウェブサイト上で確認しやすい形で掲載しています。" />
      <section className="py-16">
        <Container className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
          <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-soft">
            <dl className="grid gap-4 text-sm text-slate-700">
              <LicenseRow label="会社名" value={siteConfig.name} />
              <LicenseRow label="許可公安委員会" value={siteConfig.authority} />
              <LicenseRow label="古物商許可番号" value={siteConfig.licenseNumber} />
              <LicenseRow label="URL届出" value="実運用URLで所轄へ届出済みであることを公開前に確認してください。" />
            </dl>
          </div>
          <div className="rounded-[32px] bg-brand-50 p-8 shadow-soft">
            <h2 className="text-2xl font-bold text-slate-950">公開前チェック</h2>
            <ul className="mt-6 grid gap-3 text-sm leading-7 text-slate-700">
              <li>古物商許可番号の表記確認</li>
              <li>許可公安委員会名の確認</li>
              <li>会社住所・電話番号確認</li>
              <li>実運用URLで届出済みか確認</li>
              <li>標識掲載確認</li>
            </ul>
          </div>
        </Container>
      </section>
    </>
  );
}

function LicenseRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4">
      <dt className="font-semibold text-slate-500">{label}</dt>
      <dd className="mt-1 text-base font-bold text-slate-950">{value}</dd>
    </div>
  );
}
