import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/container";

export function Breadcrumbs({ items }: { items: Array<{ label: string; href?: string }> }) {
  return (
    <Container className="py-5">
      <nav aria-label="パンくずリスト" className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
        {items.map((item, index) => (
          <span key={`${item.label}-${index}`} className="inline-flex items-center gap-2">
            {item.href ? <Link href={item.href}>{item.label}</Link> : <span className="text-slate-700">{item.label}</span>}
            {index < items.length - 1 ? <ChevronRight className="h-4 w-4" /> : null}
          </span>
        ))}
      </nav>
    </Container>
  );
}
