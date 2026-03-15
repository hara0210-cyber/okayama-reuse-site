export function SectionHeading({
  eyebrow,
  title,
  description
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-3xl space-y-3">
      <p className="text-sm font-bold uppercase tracking-[0.24em] text-brand-600">{eyebrow}</p>
      <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{title}</h2>
      {description ? <p className="text-base leading-8 text-slate-600 sm:text-lg">{description}</p> : null}
    </div>
  );
}
