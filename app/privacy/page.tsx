import { PageHero } from "@/components/site/page-hero";
import { Container } from "@/components/ui/container";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "プライバシーポリシー",
  description: "個人情報、Cookie、アクセス解析、お問い合わせ窓口に関する方針です。",
  path: "/privacy"
});

export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Privacy Policy" title="プライバシーポリシー" description="個人情報保護、Cookie、アクセス解析、問い合わせ窓口について定めています。" />
      <section className="py-16">
        <Container className="space-y-6 rounded-[32px] border border-slate-200 bg-white p-8 shadow-soft text-sm leading-8 text-slate-700">
          <PolicySection title="個人情報の利用目的" body="お問い合わせ対応、査定依頼への回答、サービス改善、法令に基づく対応のために利用します。" />
          <PolicySection title="Cookieおよびアクセス解析" body="利便性向上とサイト改善のためにCookie、GA4等のアクセス解析ツールを利用します。" />
          <PolicySection title="第三者提供" body="法令に基づく場合を除き、本人の同意なく第三者へ提供しません。" />
          <PolicySection title="お問い合わせ窓口" body="個人情報に関するお問い合わせは、会社概要またはお問い合わせページ記載の窓口までご連絡ください。" />
        </Container>
      </section>
    </>
  );
}

function PolicySection({ title, body }: { title: string; body: string }) {
  return (
    <section>
      <h2 className="text-xl font-bold text-slate-950">{title}</h2>
      <p className="mt-3">{body}</p>
    </section>
  );
}
