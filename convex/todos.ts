import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getTodos = query({
    args: { userId: v.string() },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("todos")
            .withIndex("by_user", (q) => q.eq("userId", args.userId))
            .collect();
    },
});

export const createTodo = mutation({
    args: {
        text: v.string(),
        category: v.optional(v.string()),
        userId: v.string(),
    },
    handler: async (ctx, args) => {
        await ctx.db.insert("todos", {
            text: args.text,
            category: args.category,
            completed: false,
            userId: args.userId,
        });
    },
});

export const deleteTodo = mutation({
    args: {
        id: v.id("todos"),
    },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id);
    },
});

export const toggleTodo = mutation({
    args: {
        id: v.id("todos"),
    },
    handler: async (ctx, args) => {
        const todo = await ctx.db.get(args.id);
        if (!todo) return;

        await ctx.db.patch(args.id, {
            completed: !todo.completed,
        });
    },
});