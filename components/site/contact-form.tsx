"use client";

import { useId, useState } from "react";
import Script from "next/script";
import { ImagePlus, ShieldCheck } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { trackEvent } from "@/lib/analytics";

const schema = z.object({
  name: z.string().min(1, "氏名を入力してください"),
  phone: z.string().min(1, "電話番号を入力してください"),
  email: z.string().email("メールアドレスの形式が正しくありません"),
  category: z.string().min(1, "商品カテゴリを入力してください"),
  brand: z.string().optional(),
  itemName: z.string().min(1, "商品名を入力してください"),
  condition: z.string().min(1, "商品状態を入力してください"),
  method: z.string().min(1, "希望買取方法を選択してください"),
  address: z.string().optional(),
  note: z.string().optional(),
  agree: z.literal(true, {
    errorMap: () => ({ message: "個人情報の取扱いに同意してください" })
  })
});

type FormValues = z.infer<typeof schema>;
type Grecaptcha = {
  execute: (siteKey: string, args: { action: string }) => Promise<string>;
};

const fieldClassName =
  "w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-100";

export function ContactForm() {
  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  const imageInputId = useId();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [fileNames, setFileNames] = useState<string[]>([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { method: "LINE査定" }
  });

  const onSubmit = handleSubmit(async (values) => {
    try {
      setStatus("loading");
      const formData = new FormData();
      const fileInput = document.getElementById(imageInputId) as HTMLInputElement | null;
      const files = Array.from(fileInput?.files || []);

      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, String(value));
      });

      files.forEach((file) => formData.append("images", file));

      const grecaptcha = (window as Window & { grecaptcha?: Grecaptcha }).grecaptcha;
      const recaptchaToken = grecaptcha ? await grecaptcha.execute(recaptchaSiteKey || "", { action: "contact" }) : "";

      if (recaptchaToken) {
        formData.append("recaptchaToken", recaptchaToken);
      }

      const response = await fetch("/api/contact", { method: "POST", body: formData });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "送信に失敗しました");
      }

      trackEvent("form_submit", { category: values.category, method: values.method });
      setStatus("success");
      setMessage("お問い合わせを受け付けました。担当よりご連絡いたします。");
      setFileNames([]);
      reset();
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "送信に失敗しました");
    }
  });

  const fields = [
    { name: "name", label: "氏名", type: "text", placeholder: "例）山田 太郎" },
    { name: "phone", label: "電話番号", type: "tel", placeholder: "例）090-1234-5678" },
    { name: "email", label: "メールアドレス", type: "email", placeholder: "例）info@example.com" },
    { name: "category", label: "商品カテゴリ", type: "text", placeholder: "例）子供服" },
    { name: "brand", label: "ブランド名", type: "text", placeholder: "例）familiar" },
    { name: "itemName", label: "商品名", type: "text", placeholder: "例）ワンピース 100cm" },
    { name: "condition", label: "商品状態", type: "text", placeholder: "例）使用感少なめ" },
    { name: "address", label: "住所", type: "text", placeholder: "例）岡山県岡山市..." }
  ] as const;

  return (
    <>
      {recaptchaSiteKey ? <Script src={`https://www.google.com/recaptcha/api.js?render=${recaptchaSiteKey}`} strategy="afterInteractive" /> : null}
      <form onSubmit={onSubmit} className="space-y-6 rounded-[32px] border border-slate-200 bg-white p-6 shadow-soft sm:p-8">
        <div className="flex items-center gap-3 rounded-[24px] bg-brand-50 px-4 py-4 text-sm text-slate-700">
          <ShieldCheck className="h-5 w-5 text-brand-700" />
          <p>査定依頼に必要な情報を、スマホでも入力しやすい形でまとめています。</p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {fields.map((field) => (
            <label key={field.name} className="grid gap-2 text-sm font-medium text-slate-700">
              <span>{field.label}</span>
              <input type={field.type} placeholder={field.placeholder} {...register(field.name)} className={fieldClassName} />
              {errors[field.name] ? <span className="text-sm text-rose-600">{errors[field.name]?.message as string}</span> : null}
            </label>
          ))}

          <fieldset className="grid gap-3 text-sm font-medium text-slate-700">
            <legend className="text-sm font-medium text-slate-700">希望買取方法</legend>
            <div className="grid gap-3 sm:grid-cols-2">
              {["店頭買取", "宅配買取", "出張買取", "LINE査定"].map((option) => (
                <label
                  key={option}
                  className="flex cursor-pointer items-center gap-3 rounded-[20px] border border-slate-200 bg-slate-50 px-4 py-3 transition hover:border-brand-400 hover:bg-brand-50"
                >
                  <input type="radio" value={option} {...register("method")} className="h-4 w-4 border-slate-300 text-brand-700 focus:ring-brand-500" />
                  <span className="text-sm font-semibold text-slate-900">{option}</span>
                </label>
              ))}
            </div>
            {errors.method ? <span className="text-sm text-rose-600">{errors.method.message}</span> : null}
          </fieldset>

          <div className="grid gap-2 text-sm font-medium text-slate-700">
            <span>画像アップロード</span>
            <label
              htmlFor={imageInputId}
              className="flex min-h-32 cursor-pointer flex-col items-center justify-center rounded-[24px] border border-dashed border-brand-300 bg-gradient-to-br from-brand-50 to-white px-4 py-5 text-center transition hover:border-brand-500 hover:bg-brand-50"
            >
              <ImagePlus className="h-8 w-8 text-brand-700" />
              <span className="mt-3 text-sm font-semibold text-slate-900">画像を選択する</span>
              <span className="mt-1 text-xs leading-6 text-slate-500">商品写真を最大5枚まで追加できます。JPG / PNG 推奨</span>
              {fileNames.length ? <span className="mt-3 text-xs font-medium text-brand-700">{fileNames.join(" / ")}</span> : null}
            </label>
            <input
              id={imageInputId}
              type="file"
              accept="image/*"
              multiple
              className="sr-only"
              onChange={(event) => {
                const files = Array.from(event.target.files || []);
                setFileNames(files.map((file) => file.name));
              }}
            />
            <span className="text-xs text-slate-500">1枚あたり5MB以内を推奨しています。</span>
          </div>

          <label className="grid gap-2 text-sm font-medium text-slate-700 md:col-span-2">
            <span>備考</span>
            <textarea
              {...register("note")}
              rows={5}
              placeholder="補足情報やご希望があればご記入ください。"
              className={fieldClassName}
            />
          </label>
        </div>

        <label className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">
          <input type="checkbox" {...register("agree")} className="mt-1 h-4 w-4 rounded border-slate-300" />
          <span>個人情報の取扱いに同意します。</span>
        </label>
        {errors.agree ? <p className="text-sm text-rose-600">{errors.agree.message}</p> : null}

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full rounded-full bg-navy-800 px-6 py-4 text-base font-bold text-white transition hover:bg-navy-700 disabled:opacity-60"
        >
          {status === "loading" ? "送信中..." : "無料査定を依頼する"}
        </button>

        {message ? <p className={status === "success" ? "text-sm text-brand-700" : "text-sm text-rose-600"}>{message}</p> : null}
      </form>
    </>
  );
}
