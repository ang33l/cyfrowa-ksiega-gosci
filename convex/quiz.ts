import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createQuiz = mutation({
  args: { uid: v.string() },
  handler: async (ctx, args) => {
    const quizId = await ctx.db.insert("quiz", {
      quiz_uid: args.uid,
      quiz_completed: false,
    });
    const questions = await ctx.db
      .query("question")
      .filter((q) => q.eq(q.field("enabled"), true))
      .collect();
    for (const single of questions) {
      await ctx.db.insert("quiz_question", {
        quiz_id: quizId,
        question_id: single._id,
      });
    }
  },
});

export const getQuestions = query({
  args: { quiz_uid: v.string() },
  handler: async ({ db }, { quiz_uid }) => {
    if (!quiz_uid) {
      return [];
    }
    const quiz = await db
      .query("quiz")
      .filter((q) => q.eq(q.field("quiz_uid"), quiz_uid))
      .collect();
    const quizId = quiz[0]._id;
    const questions = await db
      .query("quiz_question")
      .filter((q) => q.eq(q.field("quiz_id"), quizId))
      .collect();
    const questionsIds = questions.map((single) => single.question_id);
    const questionsData = [];
    for (const single of questionsIds) {
      const question = await db
        .query("question")
        .filter((q) => q.eq(q.field("_id"), single))
        .collect();
      const answers = await db
        .query("question_answer")
        .filter((q) => q.eq(q.field("question_id"), single))
        .collect();
      questionsData.push({
        question: question[0],
        answers: answers,
      });
    }
    return questionsData;
  },
});

export const getSummary = query({
  args: { quiz_uid: v.string() },
  handler: async ({ db }, { quiz_uid }) => {
    const quiz = await db
      .query("quiz")
      .filter((q) => q.eq(q.field("quiz_uid"), quiz_uid))
      .collect();
    const quizId = quiz[0]._id;
    const questions = await db
      .query("quiz_question")
      .filter((q) => q.eq(q.field("quiz_id"), quizId))
      .collect();
    const questionsIds = questions.map((single) => single.question_id);
    const questionsData = [];
    for (const single of questionsIds) {
      const question = await db
        .query("question")
        .filter((q) => q.eq(q.field("_id"), single))
        .collect();
      const answers = await db
        .query("question_answer")
        .filter((q) => q.eq(q.field("question_id"), single))
        .collect();
      questionsData.push({
        question: question[0],
        answers: answers,
      });
    }
    return questionsData;
  },
});

export const getUsersAnswer = query({
  args: { quiz_uid: v.string(), question_id: v.id("question") },
  handler: async ({ db }, { quiz_uid, question_id }) => {
    const quiz = await db
      .query("quiz")
      .filter((q) => q.eq(q.field("quiz_uid"), quiz_uid))
      .collect();
    const quizId = quiz[0]._id;
    const quizQuestionId = await db
      .query("quiz_question")
      .filter((q) => {
        return q.and(
          q.eq(q.field("quiz_id"), quizId),
          q.eq(q.field("question_id"), question_id)
        );
      })
      .collect();
    const answer = await db
      .query("question_answer")
      .filter((q) => q.eq(q.field("_id"), quizQuestionId[0].answer))
      .collect();
    return quizQuestionId[0];
  },
});

export const saveAnswer = mutation({
  args: {
    quiz_uid: v.string(),
    question: v.id("question"),
    answer: v.id("question_answer"),
  },
  handler: async (ctx, args) => {
    const quiz = await ctx.db
      .query("quiz")
      .filter((q) => q.eq(q.field("quiz_uid"), args.quiz_uid))
      .collect();
    if (!quiz[0].quiz_completed) {
      const updateQuiz = await ctx.db.patch(quiz[0]._id, {
        quiz_completed: true,
      });
    }
    const quizQuestionId = await ctx.db
      .query("quiz_question")
      .filter((q) => {
        return q.and(
          q.eq(q.field("quiz_id"), quiz[0]._id),
          q.eq(q.field("question_id"), args.question)
        );
      })
      .collect();

    await ctx.db.patch(quizQuestionId[0]._id, { answer: args.answer });
  },
});
