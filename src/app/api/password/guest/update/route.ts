import { NextRequest, NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../../../convex/_generated/api.js";
const bcrypt = require("bcrypt");

export async function POST(req: NextRequest) {
  const { password } = await req.json();
  console.log(password);
  bcrypt.hash(password, 10, function (err: any, hash: any) {
    const path = process.env.NEXT_PUBLIC_CONVEX_URL || "";
    const client = new ConvexHttpClient(path);
    client.mutation(api.passwords.updateGuestPassword, {
      password: hash,
    });
  });
  return NextResponse.json({ status: "ok" });
}
