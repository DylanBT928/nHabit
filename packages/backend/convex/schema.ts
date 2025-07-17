import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  notes: defineTable({
    userId: v.string(),
    title: v.string(),
    content: v.string(),
    summary: v.optional(v.string()),
  }),
  locations: defineTable({
    userId: v.string(),
    name: v.string(),
    lat: v.string(),
    lon: v.string(),
    description: v.optional(v.string()),
  }),
});
