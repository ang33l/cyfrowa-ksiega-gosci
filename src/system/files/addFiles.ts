import { NextResponse } from "next/server";

const fs = require("fs");

export default async function addFiles<NextResponse>(
  files: FormDataEntryValue[],
  path: string,
  wishes: boolean = false,
  folderName: string
) {
  const fullPath: string = path + folderName;
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }
  if (!fs.existsSync("./archives")) {
    fs.mkdirSync("./archives", { recursive: true });
  }

  if (wishes) {
    try {
      fs.writeFileSync(
        `${fullPath}/wishes.txt`,
        wishes,
        {
          encoding: "utf8",
          flag: "w",
          mode: 0o666,
        },
        function (err: Error) {
          if (err) throw err;
          console.log("File saved.");
        }
      );
    } catch (e) {
      //Error

      console.error(e);
      return NextResponse.json(
        { type: "error", message: "Błąd podczas zapisywania plików" },
        { status: 500 }
      );
    }
  }

  if (files) {
    try {
      // Loop for files to save them

      for (const f of files) {
        console.log(typeof f);
        break;
        const arrayBuffer = await f.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const randInt = Math.floor(Math.random() * 90000) + 10000;

        /* 
            File pattern:
            /path/from/attribute/[RAND_5_CHAR_INT]-[ORIGINAL_FILE_NAME]
          */

        fs.writeFileSync(
          `${fullPath}/${randInt}-${f.name}`,
          buffer,
          "binary",
          function (err) {
            if (err) throw err;
            console.log("File saved.");
          }
        );
      }

      // Success

      //return { type: "success", message: "Pomyślnie wysłano życzenia!" };
    } catch (e) {
      //Error

      console.error(e);
      return { type: "error", message: "Błąd dodawania plików!" };
    }
  }
}
