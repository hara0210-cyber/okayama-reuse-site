import { Container } from "@/components/ui/container";

export function PageHero({
  eyebrow,
  title,
  description
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="border-b border-slate-200 bg-gradient-to-br from-slate-50 via-white to-brand-50/60">
      <Container className="space-y-4 py-12 sm:py-16">
        <p className="text-sm font-bold uppercase tracking-[0.24em] text-brand-600">{eyebrow}</p>
        <h1 className="max-w-4xl text-3xl font-bold tracking-tight text-slate-950 sm:text-5xl">{title}</h1>
        <p className="max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">{description}</p>
      </Container>
    </section>
  );
}
