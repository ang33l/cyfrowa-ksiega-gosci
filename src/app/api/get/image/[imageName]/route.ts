import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { join } from "path";

export async function GET(
  request: NextRequest,
  { params }: { params: { imageName: string } }
) {
  const imageName = params.imageName;

  try {
    const imagePath = join(process.cwd(), "files", imageName);
    const imageBuffer = await readFile(imagePath);
    return new NextResponse(imageBuffer, {
      headers: {
        "Content-Type": "image/jpeg", //TODO: Zmienić typ zawartości w zależności od formatu obrazu
      },
    });
  } catch (error) {
    console.error(`Błąd: ${error}`);
    return new NextResponse(
      JSON.stringify({ error: "Nie udało się przesłać obrazu" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
