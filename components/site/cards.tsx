import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2, Clock3, ShieldCheck, Truck } from "lucide-react";
import type { Category, Method, ResultItem } from "@/lib/content";
import { formatCurrency, formatDate } from "@/lib/utils";

export function MethodCards({ methods }: { methods: Method[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {methods.map((method) => (
        <Link
          key={method.slug}
          href={`/methods/${method.slug}`}
          className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-soft transition hover:-translate-y-1"
        >
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-brand-600">{method.title}</p>
          <p className="mt-3 text-xl font-bold text-slate-900">{method.lead}</p>
          <p className="mt-3 text-sm leading-7 text-slate-600">{method.description}</p>
          <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-navy-700">
            詳しく見る
            <ArrowRight className="h-4 w-4" />
          </span>
        </Link>
      ))}
    </div>
  );
}

export function ReasonCards() {
  const reasons = [
    { title: "査定が早い", body: "フォームやLINEから届いた情報を確認し、できるだけ早く一次案内します。", icon: Clock3 },
    { title: "全国対応", body: "宅配買取に対応しているため、岡山県外からのご相談も受け付けています。", icon: Truck },
    { title: "法人運営", body: "会社情報や古物商表示を明示し、安心して相談しやすい体制を整えています。", icon: Building2 },
    { title: "安心査定", body: "誇大表現を避け、相場と状態を踏まえて丁寧にご説明します。", icon: ShieldCheck }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {reasons.map((reason) => (
        <div key={reason.title} className="rounded-[28px] bg-slate-950 p-6 text-white shadow-soft">
          <reason.icon className="h-8 w-8 text-brand-300" />
          <h3 className="mt-5 text-xl font-bold">{reason.title}</h3>
          <p className="mt-3 text-sm leading-7 text-slate-300">{reason.body}</p>
        </div>
      ))}
    </div>
  );
}

export function CategoryCards({ categories }: { categories: Category[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {categories.map((category) => (
        <Link
          key={category.slug}
          href={`/items/${category.slug}`}
          className="group overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-soft"
        >
          <div className="relative h-52">
            <Image src={category.heroImage} alt={category.name} fill className="object-cover transition duration-500 group-hover:scale-105" />
          </div>
          <div className="p-5">
            <h3 className="text-xl font-bold text-slate-900">{category.name}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">{category.summary}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export function ResultCards({ results }: { results: ResultItem[] }) {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {results.map((item) => (
        <Link key={item.slug} href={`/results/${item.slug}`} className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-soft">
          <div className="relative h-60">
            <Image src={item.image} alt={item.title} fill className="object-cover" />
          </div>
          <div className="space-y-3 p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-brand-700">{item.category}</p>
                <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
              </div>
              <p className="text-xl font-bold text-navy-800">{formatCurrency(item.price)}</p>
            </div>
            <p className="text-sm leading-7 text-slate-600">{item.comment}</p>
            <p className="text-xs text-slate-500">{formatDate(item.date)}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
