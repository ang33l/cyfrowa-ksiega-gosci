import guidGenerator from "@/system/uidGenerator";
import { NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../../convex/_generated/api.js";

export async function GET() {
  const uid = guidGenerator();
  const path = process.env.NEXT_PUBLIC_CONVEX_URL || "";
  const client = new ConvexHttpClient(path);
  await client.mutation(api.quiz.createQuiz, {
    uid: uid,
  });
  return NextResponse.json({ uid: uid });
}
