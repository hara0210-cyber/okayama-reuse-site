import { CategoryCards } from "@/components/site/cards";
import { PageHero } from "@/components/site/page-hero";
import { Container } from "@/components/ui/container";
import { getCategories } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "買取品目一覧",
  description: "子供服、ベビー用品、ブランド服、スニーカー、時計、バッグ、貴金属などの買取品目一覧です。",
  path: "/items"
});

export default async function ItemsPage() {
  const categories = await getCategories();

  return (
    <>
      <PageHero eyebrow="Categories" title="買取品目一覧" description="SEOを意識したカテゴリ別ページで、買取対象ブランドや査定ポイントをわかりやすく掲載しています。" />
      <section className="py-16">
        <Container>
          <CategoryCards categories={categories} />
        </Container>
      </section>
    </>
  );
}
