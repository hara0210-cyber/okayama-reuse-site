import { FaqList } from "@/components/site/faq-list";
import { PageHero } from "@/components/site/page-hero";
import { Container } from "@/components/ui/container";
import { getFaqs } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "よくある質問",
  description: "査定方法、本人確認、LINE査定、壊れた品物の相談など、よくある質問をまとめています。",
  path: "/faq"
});

export default async function FaqPage() {
  const items = await getFaqs();

  return (
    <>
      <PageHero eyebrow="FAQ" title="よくある質問" description="査定前によくある疑問を整理し、問い合わせ前の不安を減らします。" />
      <section className="py-16">
        <Container>
          <FaqList items={items} />
        </Container>
      </section>
    </>
  );
}
