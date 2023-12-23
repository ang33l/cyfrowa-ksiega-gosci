import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { join } from "path";

export async function GET(
  request: NextRequest,
  { params }: { params: { imageName: string } }
) {
  const imageName = params.imageName;

  try {
    // Odczytaj zawartość pliku obrazu z folderu /files
    const imagePath = join(process.cwd(), "files", imageName);
    const imageBuffer = await readFile(imagePath);
    // Przesłanie zawartości pliku w odpowiedzi
    return new NextResponse(imageBuffer, {
      headers: {
        "Content-Type": "image/jpeg", // Zmienić typ zawartości w zależności od formatu obrazu
      },
    });
  } catch (error) {
    // Obsługa błędu, np. jeżeli plik nie istnieje
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
