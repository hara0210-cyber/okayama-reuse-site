import Link from "next/link";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <Container className="py-24 text-center">
      <p className="text-sm font-bold uppercase tracking-[0.24em] text-brand-600">404</p>
      <h1 className="mt-4 text-4xl font-bold text-slate-950">ページが見つかりません</h1>
      <p className="mt-4 text-base text-slate-600">URLが変更されたか、削除された可能性があります。</p>
      <Link href="/" className="mt-8 inline-flex rounded-full bg-navy-800 px-6 py-4 text-sm font-bold text-white">
        トップへ戻る
      </Link>
    </Container>
  );
}
