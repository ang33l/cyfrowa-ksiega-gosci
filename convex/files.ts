import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getWishId = query({
  args: { wish_id: v.string() },
  handler: async ({ db }, { wish_id }) => {
    return await db
      .query("wish")
      .filter((q) => q.eq(q.field("_id"), wish_id))
      .collect();
  },
});

export const getImagesOfWish = query({
  args: { wish_id: v.string() },
  handler: async ({ db }, { wish_id }) => {
    return await db
      .query("wish_media")
      .filter((q) => q.eq(q.field("wish_id"), wish_id))
      .collect();
  },
});

export const saveFileInfo = mutation({
  args: { wish_id: v.id("wish"), file: v.string() },
  handler: async (ctx, args) => {
    const fileId = await ctx.db.insert("wish_media", {
      wish_id: args.wish_id,
      wish_media_file: args.file,
    });
    return fileId;
  },
});

export const getFilesCount = query(async ({ db }) => {
  return (await db.query("wish_media").collect()).length;
});
