const fs = require("fs");
//const sharp = require("sharp");
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../convex/_generated/api.js";

import guidGenerator from "../uidGenerator";
const filePath = process.env.FILE_UPLOAD_URL;

const path = process.env.NEXT_PUBLIC_CONVEX_URL || "";
const client = new ConvexHttpClient(path);

export default async function saveFile(file: File, wishId: string) {
  const generatedFileName = guidGenerator();
  const fileFormat = file.type.split("/")[1];

  if (!fs.existsSync(filePath)) {
    fs.mkdirSync(filePath, { recursive: true });
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // await sharp(buffer)
  //   .webp({ quality: 20 })
  //   .toFile(filePath + generatedFileName);

  fs.writeFileSync(
    `${filePath}/${generatedFileName}.${fileFormat}`,
    buffer,
    "binary",
    (err: any) => {
      if (err) throw err;
      console.log("File saved.");
    }
  );

  const dbWishId = await client.query(api.files.getWishId, {
    wish_id: wishId,
  });

  await client.mutation(api.files.saveFileInfo, {
    wish_id: dbWishId[0]._id,
    file: generatedFileName + "." + fileFormat,
  }); //dorobic zapisanie pliku, poprawic wpisywanie do bazy - zrobic wczensiejsze dodawanie samych zyczen bedzie LUX <3
}
