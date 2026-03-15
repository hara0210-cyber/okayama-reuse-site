import { MethodCards } from "@/components/site/cards";
import { PageHero } from "@/components/site/page-hero";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { methods } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "買取方法 | 店頭・宅配・出張・LINE査定",
  description: "店頭買取、宅配買取、出張買取、LINE査定の4つの方法を案内しています。",
  path: "/methods"
});

export default function MethodsPage() {
  return (
    <>
      <PageHero eyebrow="Methods" title="買取方法" description="お品物やご都合にあわせて、最適な買取方法をお選びいただけます。" />
      <section className="py-16">
        <Container className="space-y-8">
          <SectionHeading eyebrow="Flow" title="買取の流れをわかりやすく" description="問い合わせから査定、成約までの流れを明確にし、不安なく進められるようにしています。" />
          <MethodCards methods={methods} />
        </Container>
      </section>
    </>
  );
}
