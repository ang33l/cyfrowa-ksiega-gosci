import { paginationOptsValidator } from "convex/server";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const get = query(async ({ db }) => {
  return await db.query("songbook").collect();
});

export const single = query({
  args: { song_id: v.string() },
  handler: async ({ db }, { song_id }) => {
    return await db
      .query("songbook")
      .filter((q) => q.eq(q.field("_id"), song_id))
      .collect();
  },
});

export const deleteSong = mutation({
  args: { song_id: v.id("songbook") },
  handler: async (ctx, args) => await ctx.db.delete(args.song_id),
});

export const getSongsWithFilter = query({
  args: { paginationOpts: paginationOptsValidator, filter: v.string() },
  handler: async (ctx, args) => {
    if (args.filter !== "") {
      return await ctx.db
        .query("songbook")
        .withSearchIndex("search_title", (q) =>
          q.search("song_title", args.filter)
        )
        .paginate(args.paginationOpts);
    }
    return await ctx.db
      .query("songbook")
      .order("desc")
      .paginate(args.paginationOpts);
  },
});

export const updateSong = mutation({
  args: {
    song_id: v.id("songbook"),
    song_title: v.optional(v.string()),
    song_text: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    if (args.song_title === undefined && args.song_text === undefined) {
      return false;
    }
    if (args.song_title === undefined && args.song_text !== undefined) {
      return await ctx.db.patch(args.song_id, {
        song_text: args.song_text,
      });
    }
    if (args.song_text === undefined && args.song_title !== undefined) {
      return await ctx.db.patch(args.song_id, {
        song_title: args.song_title,
      });
    }
    return await ctx.db.patch(args.song_id, {
      song_text: args.song_text,
      song_title: args.song_title,
    });
  },
});

export const addSong = mutation({
  args: { song_title: v.string(), song_text: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db.insert("songbook", {
      song_title: args.song_title,
      song_text: args.song_text,
    });
  },
});
