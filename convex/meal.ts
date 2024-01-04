import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getMeals = query({
  handler: async ({ db }) => {
    const meals = await db.query("menu_meal").collect();
    const sortedMeals = meals.sort((a, b) => {
      const getTimeValue = (time: string) => {
        const [hours, minutes] = time.split(":");
        return parseInt(hours) * 60 + parseInt(minutes);
      };

      const timeA = getTimeValue(a.meal_time);
      const timeB = getTimeValue(b.meal_time);

      return timeA - timeB;
    });
    const mealsData = [];
    for (const single of sortedMeals) {
      const meal = await db
        .query("meal_description")
        .filter((q) => q.eq(q.field("menu_meal_id"), single._id))
        .collect();
      mealsData.push({
        meal_id: single._id,
        meal_time: single.meal_time,
        meals: meal || [],
      });
    }
    return mealsData;
  },
});

export const deleteMeal = mutation({
  args: { meal_id: v.id("menu_meal") },
  handler: async ({ db }, { meal_id }) => {
    const descriptions = await db
      .query("meal_description")
      .filter((q) => q.eq(q.field("menu_meal_id"), meal_id))
      .collect();
    for (const single of descriptions) {
      await db.delete(single._id);
    }
    await db.delete(meal_id);
  },
});

export const updateMealTime = mutation({
  args: { meal_id: v.id("menu_meal"), meal_time: v.string() },
  handler: async ({ db }, { meal_id, meal_time }) => {
    await db.patch(meal_id, { meal_time });
  },
});

export const updateMealDescrioption = mutation({
  args: { meal_id: v.id("meal_description"), meal_description: v.string() },
  handler: async ({ db }, { meal_id, meal_description }) => {
    await db.patch(meal_id, { meal_description });
  },
});

export const deleteMealDescription = mutation({
  args: { meal_id: v.id("meal_description") },
  handler: async ({ db }, { meal_id }) => {
    await db.delete(meal_id);
  },
});

export const addMealDescription = mutation({
  args: { menu_meal_id: v.id("menu_meal"), meal_description: v.string() },
  handler: async ({ db }, { menu_meal_id, meal_description }) => {
    await db.insert("meal_description", {
      menu_meal_id,
      meal_description,
    });
  },
});

export const addMeal = mutation({
  args: { meal_time: v.string() },
  handler: async ({ db }, { meal_time }) => {
    await db.insert("menu_meal", {
      meal_time,
    });
  },
});
