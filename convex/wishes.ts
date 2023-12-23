import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { paginationOptsValidator } from "convex/server";

export const saveWish = mutation({
  args: { wish_author: v.string(), wish_content: v.string() },
  handler: async (ctx, args) => {
    const wishId = await ctx.db.insert("wish", {
      wish_author: args.wish_author,
      wish_content: args.wish_content,
    });
    return wishId;
  },
});

export const getWishes = query({
  args: { paginationOpts: paginationOptsValidator },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("wish")
      .order("desc")
      .paginate(args.paginationOpts);
  },
});

export const getWishesWithFilter = query({
  args: { paginationOpts: paginationOptsValidator, filter: v.string() },
  handler: async (ctx, args) => {
    if (args.filter !== "") {
      return await ctx.db
        .query("wish")
        .withSearchIndex("search_author", (q) =>
          q.search("wish_author", args.filter)
        )
        .paginate(args.paginationOpts);
    }
    return await ctx.db
      .query("wish")
      .order("desc")
      .paginate(args.paginationOpts);
  },
});

export const getWishesCount = query(async ({ db }) => {
  return (await db.query("wish").collect()).length;
});

export const deleteWish = mutation({
  args: { wish_id: v.id("wish") },
  handler: async (ctx, args) => {
    const related_wish_media = await ctx.db
      .query("wish_media")
      .filter((q) => q.eq(q.field("wish_id"), args.wish_id))
      .collect();
    for (const single of related_wish_media) {
      await ctx.db.delete(single._id);
    }
    await ctx.db.delete(args.wish_id);
  },
});
