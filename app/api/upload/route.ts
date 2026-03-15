import { NextResponse } from "next/server";
import { uploadContactImages } from "@/lib/contact";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const files = formData.getAll("images").filter((file): file is File => file instanceof File && file.size > 0);
    const uploads = await uploadContactImages(files);
    return NextResponse.json({ files: uploads });
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "アップロードに失敗しました。" },
      { status: 400 }
    );
  }
}
