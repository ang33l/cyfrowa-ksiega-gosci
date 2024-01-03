import { NextRequest, NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../../convex/_generated/api.js";

export async function POST(req: NextRequest) {
  const { quizUid, answers } = await req.json();
  const path = process.env.NEXT_PUBLIC_CONVEX_URL || "";
  const client = new ConvexHttpClient(path);

  for (const single of answers) {
    await client.mutation(api.quiz.saveAnswer, {
      quiz_uid: quizUid,
      answer: single.answer_id,
      question: single.question_id,
    });
  }

  return NextResponse.json({ type: "success" });
}
