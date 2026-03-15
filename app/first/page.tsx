import Link from "next/link";
import { PageHero } from "@/components/site/page-hero";
import { Container } from "@/components/ui/container";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "初めての方へ",
  description: "初めて査定を依頼する方向けに、流れと必要なものをわかりやすく案内しています。",
  path: "/first"
});

export default function FirstPage() {
  const steps = [
    "フォームまたはLINEで事前相談",
    "品目や状態を確認して査定方法を案内",
    "本人確認後に本査定・成約"
  ];

  return (
    <>
      <PageHero eyebrow="For First-Time Visitors" title="初めての方へ" description="初めての査定依頼でも不安がないよう、流れと必要事項をシンプルにまとめています。" />
      <section className="py-16">
        <Container className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
          <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-soft">
            <h2 className="text-2xl font-bold text-slate-950">ご利用の流れ</h2>
            <ol className="mt-6 grid gap-4">
              {steps.map((step, index) => (
                <li key={step} className="rounded-2xl bg-slate-50 p-5 text-sm text-slate-700">
                  <span className="mr-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-700 font-bold text-white">{index + 1}</span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
          <div className="rounded-[32px] bg-slate-950 p-8 text-white shadow-soft">
            <h2 className="text-2xl font-bold">事前にご用意いただくもの</h2>
            <ul className="mt-6 grid gap-3 text-sm leading-7 text-slate-300">
              <li>本人確認書類</li>
              <li>商品情報がわかる写真</li>
              <li>付属品、保証書、箱など</li>
            </ul>
            <Link href="/contact" className="mt-8 inline-flex rounded-full bg-white px-6 py-4 text-sm font-bold text-slate-950">
              査定を申し込む
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
