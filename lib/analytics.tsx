"use client";

import Script from "next/script";

const gaId = process.env.NEXT_PUBLIC_GA_ID;

export function Analytics() {
  if (!gaId) {
    return null;
  }

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
      <Script id="ga4" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}');
        `}
      </Script>
    </>
  );
}

export function trackEvent(name: string, params?: Record<string, string | number>) {
  if (typeof window === "undefined" || !("gtag" in window)) {
    return;
  }

  // @ts-expect-error gtag is injected by GA script
  window.gtag("event", name, params);
}
