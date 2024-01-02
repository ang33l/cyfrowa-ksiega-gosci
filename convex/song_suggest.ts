import { paginationOptsValidator } from "convex/server";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getAll = query(async ({ db }) => {
  return await db.query("song_suggest").collect();
});

export const getSongSuggestsWithFilter = query({
  args: { paginationOpts: paginationOptsValidator, filter: v.string() },
  handler: async (ctx, args) => {
    if (args.filter !== "") {
      return await ctx.db
        .query("song_suggest")
        .withSearchIndex("search_song_name", (q) =>
          q.search("song_name", args.filter)
        )
        .paginate(args.paginationOpts);
    }
    return await ctx.db
      .query("song_suggest")
      .order("desc")
      .paginate(args.paginationOpts);
  },
});

export const updateSongState = mutation({
  args: { sung: v.boolean(), song_id: v.id("song_suggest") },
  handler: async (ctx, args) =>
    await ctx.db.patch(args.song_id, {
      sung: args.sung,
    }),
});

export const deleteSong = mutation({
  args: { song_id: v.id("song_suggest") },
  handler: async (ctx, args) => await ctx.db.delete(args.song_id),
});

export const addSong = mutation({
  args: { song_name: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.insert("song_suggest", {
      song_name: args.song_name,
      sung: false,
    });
    return true;
  },
});

export const getSongSuggestsCount = query(async ({ db }) => {
  return (
    await db
      .query("song_suggest")
      .filter((q) => q.eq(q.field("sung"), false))
      .collect()
  ).length;
});
