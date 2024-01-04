import { NextRequest, NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../../../convex/_generated/api.js";
const bcrypt = require("bcrypt");

export async function POST(req: NextRequest) {
  const { password } = await req.json();
  console.log(password);
  const path = process.env.NEXT_PUBLIC_CONVEX_URL || "";
  const client = new ConvexHttpClient(path);

  /*const hashedPassword = await client.query(
    api.passwords.compareToGuestPassword
  );*/
  //console.log(hashedPassword);
  // const match = await bcrypt.compare(password, hashedPassword);
  if (1) {
    return NextResponse.json({ authenticated: true });
  } else {
    return NextResponse.json({ authenticated: false });
  }
}
