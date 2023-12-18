import { transpileModule } from "typescript";
import { query } from "./_generated/server";
import { v } from "convex/values";

export const compareToGuestPassword = query({
  args: { password: v.string() },
  handler: async ({ db }, { password }) => {
    const guestId = await db
      .query("password_type")
      .filter((q) => q.eq(q.field("password_description"), "guest"))
      .collect();
    if (!guestId) {
      return false;
    }
    if (guestId.length == 0) {
      return false;
    }
    const guestPassword = await db
      .query("password")
      .filter((q) => q.eq(q.field("password_type_id"), guestId[0]._id))
      .collect();

    //kiedys normalny hash z bcrypt compare
    if (!guestPassword) {
      return false;
    }
    if (guestPassword.length == 0) {
      return false;
    }

    if (guestPassword[0].hashed_password == password) {
      return true;
    } else {
      return false;
    }
  },
});
