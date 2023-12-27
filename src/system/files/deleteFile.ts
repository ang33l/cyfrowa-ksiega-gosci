const fs = require("fs");

export default function deleteFile(fileName: string) {
  const filePath = process.env.FILE_UPLOAD_URL;
  return fs.unlinkSync(`${filePath}/${fileName}`);
}
