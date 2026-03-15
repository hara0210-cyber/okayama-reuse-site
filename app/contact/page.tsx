import { ContactForm } from "@/components/site/contact-form";
import { PageHero } from "@/components/site/page-hero";
import { Container } from "@/components/ui/container";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata = buildMetadata({
  title: "お問い合わせ",
  description: "無料査定、お問い合わせ、LINE査定、電話相談の窓口ページです。",
  path: "/contact"
});

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Contact" title="お問い合わせ・無料査定" description="査定依頼、LINE相談、電話相談を迷わず選べるように整理した窓口ページです。" />
      <section className="py-16">
        <Container className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <ContactForm />

          <div className="space-y-6">
            <div className="rounded-[32px] bg-slate-950 p-8 text-white shadow-soft">
              <h2 className="text-2xl font-bold">他のご相談方法</h2>
              <div className="mt-6 grid gap-3">
                <a href={siteConfig.lineUrl} target="_blank" rel="noreferrer" className="rounded-full bg-brand-700 px-6 py-4 text-center text-sm font-bold text-white">
                  LINE査定へ進む
                </a>
                <a href={`tel:${siteConfig.phone.replace(/-/g, "")}`} className="rounded-full border border-white/10 px-6 py-4 text-center text-sm font-bold text-white">
                  電話相談 {siteConfig.phone}
                </a>
              </div>
            </div>

            <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-soft">
              <h2 className="text-2xl font-bold text-slate-950">受付情報</h2>
              <dl className="mt-6 grid gap-4 text-sm text-slate-700">
                <ContactRow label="営業時間" value={siteConfig.businessHours} />
                <ContactRow label="メール" value={siteConfig.email} />
                <ContactRow label="住所" value={siteConfig.address} />
              </dl>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

function ContactRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4">
      <dt className="text-slate-500">{label}</dt>
      <dd className="mt-1 font-bold text-slate-950">{value}</dd>
    </div>
  );
}
