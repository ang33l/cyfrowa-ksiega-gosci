import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../convex/_generated/api.js";

const path = process.env.NEXT_PUBLIC_CONVEX_URL || "";
const client = new ConvexHttpClient(path);
export default async function saveWishes(
  wish_author: string,
  wish_content: string
) {
  const data = await client.mutation(api.wishes.saveWish, {
    wish_author,
    wish_content,
  });
  return data;
}
