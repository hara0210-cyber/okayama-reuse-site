# 岡山県向け古物商 買取サイト

Next.js App Router / Tailwind CSS / Headless CMS / Vercel を前提にした、法人向け買取サイトの実装例です。

## セットアップ

```bash
npm install
cp .env.example .env.local
npm run dev
```

## 環境変数

- `NEXT_PUBLIC_SITE_URL`: 本番URL
- `NEXT_PUBLIC_GA_ID`: GA4測定ID
- `NEXT_PUBLIC_LINE_URL`: LINE査定リンク
- `NEXT_PUBLIC_TEL`: 電話番号
- `COMPANY_LICENSE_AUTHORITY`: 許可公安委員会名
- `COMPANY_LICENSE_NUMBER`: 古物商許可番号
- `MICROCMS_*` または `CONTENTFUL_*`: CMS接続用
- `RESEND_API_KEY`: メール送信用
- `RECAPTCHA_SECRET_KEY`: reCAPTCHA検証用
- `BLOB_READ_WRITE_TOKEN`: 画像アップロード用

## CMS

`lib/cms.ts` は microCMS / Contentful / ローカルフォールバックの順でデータを取得します。

## Vercel デプロイ

1. Git リポジトリを Vercel に接続
2. 環境変数を設定
3. `npm run build` が通ることを確認
4. カスタムドメイン設定
5. 実運用URLで古物商URL届出とGA4計測を確認
