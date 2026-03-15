import { PageHero } from "@/components/site/page-hero";
import { Container } from "@/components/ui/container";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "利用規約",
  description: "サイトの利用条件、禁止事項、免責事項などを記載しています。",
  path: "/terms"
});

export default function TermsPage() {
  return (
    <>
      <PageHero eyebrow="Terms" title="利用規約" description="本サイトをご利用いただく際の条件を定めています。" />
      <section className="py-16">
        <Container className="space-y-6 rounded-[32px] border border-slate-200 bg-white p-8 shadow-soft text-sm leading-8 text-slate-700">
          <PolicySection title="適用" body="本規約は、当サイトの閲覧およびお問い合わせフォーム利用に適用されます。" />
          <PolicySection title="禁止事項" body="虚偽情報の送信、不正アクセス、営業妨害、公序良俗に反する行為を禁止します。" />
          <PolicySection title="免責事項" body="掲載情報は正確性に配慮しますが、最新性や完全性を保証するものではありません。" />
          <PolicySection title="規約変更" body="法令改正やサービス変更に応じて、事前告知の上で変更する場合があります。" />
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
