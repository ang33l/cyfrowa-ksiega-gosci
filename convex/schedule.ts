import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getSchedule = query({
  handler: async ({ db }) => {
    const events = await db.query("schedule").collect();
    const sortedEvents = events.sort((a, b) => {
      const getTimeValue = (time: string) => {
        const [hours, minutes] = time.split(":");
        return parseInt(hours) * 60 + parseInt(minutes);
      };

      const timeA = getTimeValue(a.time);
      const timeB = getTimeValue(b.time);
      return timeA - timeB;
    });
    return sortedEvents;
  },
});

export const addEvent = mutation({
  args: { time: v.string(), description: v.string() },
  handler: async ({ db }, { time, description }) => {
    await db.insert("schedule", { time, description });
  },
});

export const deleteEvent = mutation({
  args: { event_id: v.id("schedule") },
  handler: async ({ db }, { event_id }) => {
    await db.delete(event_id);
  },
});

export const updateEvent = mutation({
  args: {
    event_id: v.id("schedule"),
    time: v.optional(v.string()),
    description: v.optional(v.string()),
  },
  handler: async ({ db }, { event_id, time, description }) => {
    if (!time && !description) {
      return false;
    }
    if (time && !description) {
      return await db.patch(event_id, { time });
    }
    if (!time && description) {
      return await db.patch(event_id, { description });
    }
    return await db.patch(event_id, { time, description });
  },
});
