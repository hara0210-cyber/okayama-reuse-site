import { ResultCards } from "@/components/site/cards";
import { PageHero } from "@/components/site/page-hero";
import { Container } from "@/components/ui/container";
import { getResults } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "買取実績一覧",
  description: "商品画像、カテゴリ、状態、査定価格、コメントを掲載した買取実績一覧です。",
  path: "/results"
});

export default async function ResultsPage() {
  const items = await getResults();

  return (
    <>
      <PageHero eyebrow="Results" title="買取実績一覧" description="CMSで更新しやすい構成で、透明性のある実績訴求を行います。" />
      <section className="py-16">
        <Container>
          <ResultCards results={items} />
        </Container>
      </section>
    </>
  );
}
