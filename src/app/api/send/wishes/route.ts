import { NextRequest, NextResponse } from "next/server";
import saveFile from "@/system/files/saveFile";
import saveWishes from "@/system/wishes/saveWishes";

export async function POST(req: NextRequest, res: NextResponse) {
  const data = await req.formData();
  const name: string = data.get("name")?.toString() || "";
  if (name.length === 0) {
    return NextResponse.json({
      type: "error",
      message: "Imię nie może być puste!",
    });
  }
  const wishes: string = data.get("wishes")?.toString() || "";

  const wishId = await saveWishes(name, wishes);

  const files = data.getAll("upload").valueOf() as File[];

  if (!files || files.length === 0) {
    return NextResponse.json({
      type: "success",
      message: "Dodano życzenia bez plików!",
    });
  }
  for (const f of files) {
    await saveFile(f, wishId);
  }

  return NextResponse.json({
    type: "success",
    message: "Dodano życzenia z plikami!",
  });
}
