export const siteConfig = {
  name: process.env.COMPANY_NAME || "株式会社リユース岡山",
  description:
    "岡山県の古物商許可取得法人が運営する買取サイト。店頭・宅配・出張・LINE査定に対応し、法人運営ならではの安心感で大切なお品物を丁寧に査定します。",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://example.com",
  phone: process.env.NEXT_PUBLIC_TEL || "086-000-0000",
  businessHours: process.env.NEXT_PUBLIC_BUSINESS_HOURS || "9:00-18:00",
  lineUrl: process.env.NEXT_PUBLIC_LINE_URL || "https://line.me/R/ti/p/@example",
  address: process.env.COMPANY_ADDRESS || "岡山県岡山市北区〇〇1-2-3",
  authority: process.env.COMPANY_LICENSE_AUTHORITY || "岡山県公安委員会",
  licenseNumber: process.env.COMPANY_LICENSE_NUMBER || "第123456789012号",
  email: process.env.CONTACT_EMAIL || "info@example.com"
};

export const navigation = [
  { label: "買取方法", href: "/methods" },
  { label: "買取品目", href: "/items" },
  { label: "買取実績", href: "/results" },
  { label: "初めての方へ", href: "/first" },
  { label: "FAQ", href: "/faq" },
  { label: "会社概要", href: "/company" },
  { label: "お問い合わせ", href: "/contact" }
];
