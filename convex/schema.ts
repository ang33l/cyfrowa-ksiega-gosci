import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  wish: defineTable({
    wish_author: v.string(),
    wish_content: v.string(),
  })
    .searchIndex("search_author", {
      searchField: "wish_author",
    })
    .searchIndex("search_content", {
      searchField: "wish_content",
    }),
  wish_media: defineTable({
    wish_media_file: v.string(),
    wish_id: v.id("wish"),
  }),
  songbook: defineTable({ song_text: v.string(), song_title: v.string() }),
  password: defineTable({
    hashed_password: v.string(),
    password_type_id: v.id("password_type"),
  }),
  password_type: defineTable({ password_description: v.string() }),
  menu_meal: defineTable({ meal_time: v.string() }),
  meal_description: defineTable({
    menu_meal_id: v.id("menu_meal"),
    meal_description: v.string(),
  }),
  schedule: defineTable({ time: v.string(), description: v.string() }),
});
