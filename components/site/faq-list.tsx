import { faqs as fallbackFaqs, type FaqItem } from "@/lib/content";

export function FaqList({ items = fallbackFaqs }: { items?: FaqItem[] }) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <details key={item.question} className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-soft">
          <summary className="cursor-pointer list-none text-base font-bold text-slate-900">{item.question}</summary>
          <p className="mt-4 text-sm leading-7 text-slate-600">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
