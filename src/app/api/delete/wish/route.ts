import { NextRequest, NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../../convex/_generated/api.js";
import deleteFile from "@/system/files/deleteFile";

export async function DELETE(req: NextRequest, res: Response) {
  const data = await req.json();
  const wishId = data.wish_id;

  const filePath = process.env.FILE_UPLOAD_URL;
  const path = process.env.NEXT_PUBLIC_CONVEX_URL || "";
  const client = new ConvexHttpClient(path);
  try {
    const filesToDelete = await client.mutation(api.wishes.deleteWish, {
      wish_id: wishId,
    });
    if (filesToDelete.length === 0) {
      return NextResponse.json({
        type: "success",
        message: "Pomyślnie usunięto dane!",
      });
    }
    for (const single of filesToDelete) {
      deleteFile(single.wish_media_file);
    }
    return NextResponse.json({
      type: "success",
      message: "Pomyślnie usunięto dane!",
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({
      type: "error",
      message: "Wystąpił błąd podczas usuwania danych!",
    });
  }
}
