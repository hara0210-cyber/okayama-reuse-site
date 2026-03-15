import { Resend } from "resend";
import { NextResponse } from "next/server";
import { contactSchema, uploadContactImages, verifyRecaptcha } from "@/lib/contact";

export const runtime = "nodejs";

function renderMailBody(values: Record<string, string | undefined>, imageUrls: string[]) {
  return `
氏名: ${values.name}
電話番号: ${values.phone}
メールアドレス: ${values.email}
商品カテゴリ: ${values.category}
ブランド名: ${values.brand || "-"}
商品名: ${values.itemName}
商品状態: ${values.condition}
希望買取方法: ${values.method}
住所: ${values.address || "-"}
備考: ${values.note || "-"}
画像:
${imageUrls.length ? imageUrls.join("\n") : "なし"}
  `.trim();
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const rawValues = Object.fromEntries(formData.entries());
    const parsed = contactSchema.safeParse(rawValues);

    if (!parsed.success) {
      return NextResponse.json({ message: "入力内容を確認してください。" }, { status: 400 });
    }

    const files = formData.getAll("images").filter((file): file is File => file instanceof File && file.size > 0);
    const recaptchaOk = await verifyRecaptcha(parsed.data.recaptchaToken);

    if (!recaptchaOk) {
      return NextResponse.json({ message: "reCAPTCHA の検証に失敗しました。" }, { status: 400 });
    }

    const uploads = await uploadContactImages(files);
    const imageUrls = uploads.map((item) => item.url);
    const text = renderMailBody(parsed.data, imageUrls);
    const resendApiKey = process.env.RESEND_API_KEY;
    const adminEmail = process.env.ADMIN_EMAIL;
    const contactEmail = parsed.data.email;
    const from = process.env.MAIL_FROM || "noreply@example.com";

    if (resendApiKey && adminEmail) {
      const resend = new Resend(resendApiKey);
      await Promise.all([
        resend.emails.send({
          from,
          to: adminEmail,
          subject: `【査定依頼】${parsed.data.name} 様`,
          text
        }),
        resend.emails.send({
          from,
          to: contactEmail,
          subject: "お問い合わせを受け付けました",
          text: `このたびはお問い合わせありがとうございます。\n\n以下の内容で受け付けました。\n\n${text}`
        })
      ]);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "送信中にエラーが発生しました。" },
      { status: 500 }
    );
  }
}
