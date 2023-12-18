import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  songbook: defineTable({ song_text: v.string(), song_title: v.string() }),
  password: defineTable({
    hashed_password: v.string(),
    password_type_id: v.id("password_type"),
  }),
  password_type: defineTable({ password_description: v.string() }),
});
