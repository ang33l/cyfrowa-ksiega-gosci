"use server";

import { NextResponse } from "next/server";
import addFiles from "./files/addFiles";

export default function submitUpload<NextResponse>(formData: FormData) {
  const name: string | Object | undefined = formData.get("name")?.valueOf();
  if (name?.toLocaleString.length === 0) {
    return NextResponse.json(
      { type: "error", message: "Imię nie może być puste!" },
      { status: 400 }
    );
  }

  const files: IterableIterator<FormDataEntryValue> = formData
    .getAll("upload")
    .values();
  const arrayOfFiles = Array.from(files);
  if (arrayOfFiles.length === 0) {
    return NextResponse.json(
      { type: "error", message: "Imię nie może być puste!" },
      { status: 400 }
    );
  }

  const path: string = "./images";

  return await addFiles(arrayOfFiles, path, false, encodeURI(name));
}
