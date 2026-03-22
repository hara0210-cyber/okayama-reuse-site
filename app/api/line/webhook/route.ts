import { messagingApi, middleware, WebhookEvent, TextMessage } from "@line/bot-sdk";
import { NextRequest, NextResponse } from "next/server";
import { siteConfig } from "@/lib/site";

export const runtime = "nodejs";

const channelSecret = process.env.LINE_CHANNEL_SECRET || "";
const channelAccessToken = process.env.LINE_CHANNEL_ACCESS_TOKEN || "";

const client = new messagingApi.MessagingApiClient({ channelAccessToken });

// 自動応答メッセージの定義
const AUTO_REPLY_MESSAGES = {
  default: `こんにちは！${siteConfig.name}です。\n\nLINEでのお問い合わせありがとうございます。\n\n【LINE査定の流れ】\n① 査定したい商品の写真を送ってください\n② 商品名・状態・付属品をお知らせください\n③ 担当者が査定額をご連絡します\n\n営業時間: ${siteConfig.businessHours}\n※ 営業時間外のメッセージは翌営業日にご返信いたします。`,

  keywords: {
    査定: `査定についてのお問い合わせありがとうございます！\n\n【査定方法】\n• LINE査定: 写真を送るだけで事前査定\n• 宅配買取: 段ボールに梱包して送付\n• 出張買取: ご自宅まで出張\n• 店頭買取: 直接ご来店\n\n詳しくは下記URLをご確認ください。\n${siteConfig.url}/methods`,

    価格: `買取価格についてのお問い合わせありがとうございます。\n\n正確な査定額は商品の状態・付属品・市場価格により異なります。\n\n商品の写真（正面・側面・付属品）を送っていただければ、担当者が確認後にお見積りします。\n\nお気軽にどうぞ！`,

    営業時間: `営業時間は ${siteConfig.businessHours} です。\n\nLINEは24時間受付しておりますが、ご返信は営業時間内となります。\n\nお急ぎの場合はお電話ください。\nTEL: ${siteConfig.phone}`,

    電話: `お電話でのお問い合わせもお気軽にどうぞ。\n\nTEL: ${siteConfig.phone}\n営業時間: ${siteConfig.businessHours}`,

    住所: `店舗情報：\n\n${siteConfig.name}\n${siteConfig.address}\n\nTEL: ${siteConfig.phone}\n営業時間: ${siteConfig.businessHours}`,
  },
} as const;

function getReplyMessage(text: string): string {
  const lowerText = text.toLowerCase();

  for (const [keyword, message] of Object.entries(AUTO_REPLY_MESSAGES.keywords)) {
    if (lowerText.includes(keyword)) {
      return message;
    }
  }

  return AUTO_REPLY_MESSAGES.default;
}

async function handleEvent(event: WebhookEvent): Promise<void> {
  if (event.type !== "message" || event.message.type !== "text") {
    return;
  }

  const replyToken = event.replyToken;
  const userMessage = event.message.text;
  const replyText = getReplyMessage(userMessage);

  const replyMessage: TextMessage = {
    type: "text",
    text: replyText,
  };

  await client.replyMessage({
    replyToken,
    messages: [replyMessage],
  });
}

async function verifySignature(body: string, signature: string): Promise<boolean> {
  const crypto = await import("crypto");
  const hash = crypto.createHmac("sha256", channelSecret).update(body).digest("base64");
  return hash === signature;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  if (!channelSecret || !channelAccessToken) {
    return NextResponse.json({ error: "LINE credentials not configured" }, { status: 500 });
  }

  const body = await req.text();
  const signature = req.headers.get("x-line-signature") || "";

  const isValid = await verifySignature(body, signature);
  if (!isValid) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  let payload: { events: WebhookEvent[] };
  try {
    payload = JSON.parse(body);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  await Promise.all(payload.events.map(handleEvent));

  return NextResponse.json({ ok: true });
}
