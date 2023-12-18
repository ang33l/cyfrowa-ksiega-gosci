import { query } from "./_generated/server";
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
