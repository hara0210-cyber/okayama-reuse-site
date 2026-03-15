import { put } from "@vercel/blob";
import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(1),
  phone: z.string().min(1),
  email: z.string().email(),
  category: z.string().min(1),
  brand: z.string().optional(),
  itemName: z.string().min(1),
  condition: z.string().min(1),
  method: z.string().min(1),
  address: z.string().optional(),
  note: z.string().optional(),
  agree: z.union([z.literal("true"), z.literal("on"), z.literal("1")]),
  recaptchaToken: z.string().optional()
});

const MAX_FILES = 5;
const MAX_SIZE = 5 * 1024 * 1024;

export async function verifyRecaptcha(token?: string) {
  const secret = process.env.RECAPTCHA_SECRET_KEY;

  if (!secret || !token) {
    return true;
  }

  const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ secret, response: token })
  });

  if (!response.ok) {
    return false;
  }

  const data = (await response.json()) as { success?: boolean; score?: number };
  return Boolean(data.success && (data.score === undefined || data.score >= 0.5));
}

export async function uploadContactImages(files: File[]) {
  if (!files.length) {
    return [];
  }

  if (files.length > MAX_FILES) {
    throw new Error("画像は最大5枚までです。");
  }

  files.forEach((file) => {
    if (!file.type.startsWith("image/")) {
      throw new Error("画像ファイルのみアップロードできます。");
    }

    if (file.size > MAX_SIZE) {
      throw new Error("画像サイズは5MB以内にしてください。");
    }
  });

  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    return files.map((file) => ({ url: `local://${file.name}`, pathname: file.name }));
  }

  const uploads = await Promise.all(
    files.map(async (file) => {
      return put(`contact/${Date.now()}-${file.name}`, file, {
        access: "public",
        token
      });
    })
  );

  return uploads;
}
