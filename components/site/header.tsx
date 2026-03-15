"use client";

import Link from "next/link";
import { Menu, PhoneCall } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/site/logo";
import { trackEvent } from "@/lib/analytics";
import { navigation, siteConfig } from "@/lib/site";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur">
      <Container className="flex min-h-20 items-center justify-between gap-4 py-3">
        <Logo />

        <nav className="hidden items-center gap-6 lg:flex">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-medium text-slate-700 transition hover:text-brand-700">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 sm:flex">
          <a
            href={`tel:${siteConfig.phone.replace(/-/g, "")}`}
            onClick={() => trackEvent("phone_click", { location: "header" })}
            className="inline-flex items-center gap-2 rounded-full border border-brand-200 px-4 py-2 text-sm font-semibold text-brand-800 transition hover:bg-brand-50"
          >
            <PhoneCall className="h-4 w-4" />
            {siteConfig.phone}
          </a>
          <Link href="/contact" className="inline-flex items-center rounded-full bg-navy-800 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-navy-700">
            無料査定はこちら
          </Link>
        </div>

        <Link href="/contact" className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-900 sm:hidden">
          <Menu className="h-4 w-4" />
          相談
        </Link>
      </Container>
    </header>
  );
}
