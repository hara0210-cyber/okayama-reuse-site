"use client";

import Link from "next/link";
import { MessageCircleMore, PhoneCall } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { siteConfig } from "@/lib/site";

export function MobileCta() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white/95 p-3 shadow-soft backdrop-blur sm:hidden">
      <div className="grid grid-cols-3 gap-2">
        <Link href="/contact" className="inline-flex items-center justify-center rounded-2xl bg-navy-800 px-3 py-3 text-sm font-bold text-white">
          無料査定
        </Link>
        <a
          href={siteConfig.lineUrl}
          target="_blank"
          rel="noreferrer"
          onClick={() => trackEvent("line_click", { location: "mobile_cta" })}
          className="inline-flex items-center justify-center gap-1 rounded-2xl bg-brand-700 px-3 py-3 text-sm font-bold text-white"
        >
          <MessageCircleMore className="h-4 w-4" />
          LINE
        </a>
        <a
          href={`tel:${siteConfig.phone.replace(/-/g, "")}`}
          onClick={() => trackEvent("phone_click", { location: "mobile_cta" })}
          className="inline-flex items-center justify-center gap-1 rounded-2xl border border-slate-200 bg-white px-3 py-3 text-sm font-bold text-slate-900"
        >
          <PhoneCall className="h-4 w-4" />
          電話
        </a>
      </div>
    </div>
  );
}
