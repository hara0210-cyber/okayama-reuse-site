import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="inline-flex items-center gap-3">
      <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-700 text-lg font-bold text-white shadow-soft">
        R
      </span>
      <span className="flex min-w-0 flex-col">
        <span className="text-sm font-bold tracking-[0.2em] text-brand-700">REUSE OKAYAMA</span>
        <span className="truncate text-xs text-slate-500">法人運営の安心買取</span>
      </span>
    </Link>
  );
}
