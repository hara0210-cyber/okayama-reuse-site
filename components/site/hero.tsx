"use client";

import Link from "next/link";
import { CheckCircle2, MessageCircleMore, PhoneCall } from "lucide-react";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site";
import { trackEvent } from "@/lib/analytics";

const heroPoints = ["岡山県の古物商許可取得法人", "店頭・宅配・出張・LINE査定対応", "スマホから簡単に無料査定"];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-brand-50">
      <div className="absolute inset-0 bg-grid bg-[size:28px_28px]" />
      <Container className="relative grid gap-10 py-14 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-7">
          <div className="inline-flex rounded-full border border-brand-200 bg-white px-4 py-2 text-sm font-semibold text-brand-700 shadow-soft">
            岡山県公安委員会許可の法人買取サービス
          </div>
          <div className="space-y-5">
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-slate-950 sm:text-5xl">
              法人運営の安心感で、
              <br />
              大切なお品物を
              <span className="text-brand-700"> すばやく適正査定</span>
            </h1>
            <p className="max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              子供服、ベビー用品、ブランド、時計、バッグなど幅広く対応。査定依頼、LINE相談、電話問い合わせをスマホから迷わず行える導線で設計しています。
            </p>
          </div>
          <div className="grid gap-3 sm:flex">
            <Link href="/contact" className="inline-flex items-center justify-center rounded-full bg-navy-800 px-6 py-4 text-base font-bold text-white transition hover:bg-navy-700">
              無料査定を申し込む
            </Link>
            <a
              href={siteConfig.lineUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackEvent("line_click", { location: "hero" })}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-700 px-6 py-4 text-base font-bold text-white transition hover:bg-brand-600"
            >
              <MessageCircleMore className="h-5 w-5" />
              LINE査定
            </a>
            <a
              href={`tel:${siteConfig.phone.replace(/-/g, "")}`}
              onClick={() => trackEvent("phone_click", { location: "hero" })}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-4 text-base font-bold text-slate-900 transition hover:border-brand-400"
            >
              <PhoneCall className="h-5 w-5" />
              電話相談
            </a>
          </div>
          <ul className="grid gap-3 text-sm text-slate-700 sm:grid-cols-3">
            {heroPoints.map((point) => (
              <li key={point} className="inline-flex items-center gap-2 rounded-2xl border border-white bg-white/90 px-4 py-3 shadow-soft">
                <CheckCircle2 className="h-4 w-4 text-brand-700" />
                {point}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-[32px] border border-white bg-white p-4 shadow-soft">
          <div className="overflow-hidden rounded-[28px] bg-slate-950 p-6 text-white">
            <p className="text-sm font-semibold tracking-[0.2em] text-brand-200">査定導線</p>
            <div className="mt-5 grid gap-4">
              {[
                ["01", "写真を送る", "LINEまたはフォームから商品情報を送信"],
                ["02", "概算を確認", "内容を確認し、査定方法をご案内"],
                ["03", "本査定・成約", "店頭・宅配・出張で最終確認"]
              ].map(([step, title, body]) => (
                <div key={step} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-sm font-bold text-brand-200">{step}</p>
                  <p className="mt-2 text-lg font-bold">{title}</p>
                  <p className="mt-1 text-sm leading-7 text-slate-300">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
