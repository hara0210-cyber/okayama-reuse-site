"use client";

import Link from "next/link";
import { Container } from "@/components/ui/container";
import { trackEvent } from "@/lib/analytics";
import { siteConfig } from "@/lib/site";

const footerLinks = [
  { label: "会社概要", href: "/company" },
  { label: "古物商許可表示", href: "/license" },
  { label: "プライバシーポリシー", href: "/privacy" },
  { label: "利用規約", href: "/terms" },
  { label: "お問い合わせ", href: "/contact" }
];

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-slate-200">
      <Container className="grid gap-10 py-12 lg:grid-cols-[1.4fr_0.9fr]">
        <div className="space-y-5">
          <div>
            <p className="text-xl font-bold">{siteConfig.name}</p>
            <p className="mt-2 text-sm leading-7 text-slate-400">{siteConfig.address}</p>
            <p className="text-sm leading-7 text-slate-400">
              TEL{" "}
              <a href={`tel:${siteConfig.phone.replace(/-/g, "")}`} onClick={() => trackEvent("phone_click", { location: "footer" })} className="underline-offset-4 hover:underline">
                {siteConfig.phone}
              </a>{" "}
              / 営業時間 {siteConfig.businessHours}
            </p>
          </div>
          <div className="rounded-[24px] border border-white/10 bg-white/5 p-5">
            <p className="text-sm font-semibold text-white">古物商許可表示</p>
            <p className="mt-2 text-sm text-slate-300">{siteConfig.authority}</p>
            <p className="text-lg font-bold text-white">{siteConfig.licenseNumber}</p>
          </div>
        </div>

        <div className="grid gap-3 rounded-[24px] border border-white/10 bg-white/5 p-5">
          {footerLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm text-slate-300 transition hover:text-white">
              {link.label}
            </Link>
          ))}
        </div>
      </Container>
    </footer>
  );
}
