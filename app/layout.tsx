import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { MobileCta } from "@/components/site/mobile-cta";
import { Analytics } from "@/lib/analytics";
import { buildMetadata, buildOrganizationSchema } from "@/lib/seo";
import { JsonLd } from "@/components/site/json-ld";

const notoSansJp = Noto_Sans_JP({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "700", "900"]
});

export const metadata: Metadata = buildMetadata({
  title: "岡山の法人買取サイト | 店頭・宅配・出張・LINE査定",
  description:
    "岡山県の古物商許可取得法人が運営する買取サイト。子供服、ベビー用品、ブランド、時計、バッグなどをスマホから簡単査定。"
});

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body className={notoSansJp.className}>
        <JsonLd data={buildOrganizationSchema()} />
        <Analytics />
        <Header />
        <main className="min-h-screen pb-24 sm:pb-0">{children}</main>
        <Footer />
        <MobileCta />
      </body>
    </html>
  );
}
