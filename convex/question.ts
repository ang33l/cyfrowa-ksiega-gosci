import { paginationOptsValidator } from "convex/server";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getQuestionsWithFilter = query({
  args: { paginationOpts: paginationOptsValidator, filter: v.string() },
  handler: async (ctx, args) => {
    if (args.filter !== "") {
      return await ctx.db
        .query("question")
        .withSearchIndex("search_query", (q) => q.search("query", args.filter))
        .paginate(args.paginationOpts);
    }
    return await ctx.db
      .query("question")
      .order("desc")
      .paginate(args.paginationOpts);
  },
});

export const single = query({
  args: { question_id: v.string() },
  handler: async ({ db }, { question_id }) => {
    return await db
      .query("question")
      .filter((q) => q.eq(q.field("_id"), question_id))
      .collect();
  },
});

export const getAnswers = query({
  args: { question_id: v.string() },
  handler: async ({ db }, { question_id }) => {
    return await db
      .query("question_answer")
      .filter((q) => q.eq(q.field("question_id"), question_id))
      .order("desc")
      .collect();
  },
});

export const updateQuestion = mutation({
  args: {
    enabled: v.optional(v.boolean()),
    query: v.optional(v.string()),
    question_id: v.id("question"),
  },
  handler: async (ctx, args) => {
    if (args.enabled === undefined && args.query === undefined) {
      return false;
    }
    if (args.enabled === undefined && args.query !== undefined) {
      return await ctx.db.patch(args.question_id, {
        query: args.query,
      });
    }
    if (args.query === undefined && args.enabled !== undefined) {
      return await ctx.db.patch(args.question_id, {
        enabled: args.enabled,
      });
    }
    return await ctx.db.patch(args.question_id, {
      enabled: args.enabled,
      query: args.query,
    });
  },
});

export const addAnswer = mutation({
  args: { question_id: v.id("question"), answer: v.string() },
  handler: async (ctx, args) => {
    const questions = await ctx.db
      .query("question_answer")
      .filter((q) => q.eq(q.field("question_id"), args.question_id))
      .collect();

    await ctx.db.insert("question_answer", {
      question_id: args.question_id,
      answer: args.answer,
      correct: questions.length === 0,
    });
    return true;
  },
});

export const updateAnswers = mutation({
  args: {
    answer_id: v.id("question_answer"),
    answer: v.string(),
    correct: v.boolean(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.patch(args.answer_id, {
      answer: args.answer,
      correct: args.correct,
    });
  },
});

export const deleteAnswer = mutation({
  args: { answer_id: v.id("question_answer") },
  handler: async (ctx, args) => {
    const answer = await ctx.db.get(args.answer_id);
    if (answer && answer.correct) {
      const answers = await ctx.db
        .query("question_answer")
        .filter((q) => q.eq(q.field("question_id"), answer.question_id))
        .order("desc")
        .collect();
      if (answers[0]._id !== args.answer_id)
        await ctx.db.patch(answers[0]._id, { correct: true });
      else await ctx.db.patch(answers[1]._id, { correct: true });
    }
    return await ctx.db.delete(args.answer_id);
  },
});

export const deleteQuestion = mutation({
  args: { question_id: v.id("question") },
  handler: async (ctx, args) => {
    const answers = await ctx.db
      .query("question_answer")
      .filter((q) => q.eq(q.field("question_id"), args.question_id))
      .collect();
    for (const answer of answers) {
      await ctx.db.delete(answer._id);
    }
    return await ctx.db.delete(args.question_id);
  },
});

export const createQuestion = mutation({
  args: { query: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db.insert("question", {
      query: args.query,
      enabled: true,
    });
  },
});
