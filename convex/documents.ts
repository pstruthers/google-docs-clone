import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { paginationOptsValidator } from "convex/server";

export const create = mutation({
	args: {
		title: v.optional(v.string()),
		initialContent: v.optional(v.string()),
	},
	handler: async (ctx, args) => {
		const user = await ctx.auth.getUserIdentity();

		if (!user) {
			throw new ConvexError("Unauthorized");
		}

		return await ctx.db.insert("documents", {
			title: args.title ?? "Untitled document",
			initialContent: args.initialContent,
			ownerId: user.subject,
		});
	},
});

export const get = query({
	args: { paginationOpts: paginationOptsValidator },
	handler: async (ctx, args) => {
		return await ctx.db.query("documents").paginate(args.paginationOpts);
	},
});

export const updateById = mutation({
	args: {
		id: v.id("documents"),
		title: v.string()
	},
	handler: async (ctx, args) => {
		const user = await ctx.auth.getUserIdentity();

		if (!user) {
			throw new ConvexError("Unauthorized");
		}

		const document = await ctx.db.get(args.id);

		if (!document) {
			throw new ConvexError("Document not found");
		}

		const isOwner = document.ownerId === user.subject;

		if (!isOwner) {
			throw new ConvexError("Unauthorized");
		}

		return await ctx.db.patch(args.id, { title: args.title });
	},
});

export const removeById = mutation({
	args: { id: v.id("documents") },
	handler: async (ctx, args) => {
		const user = await ctx.auth.getUserIdentity();

		if (!user) {
			throw new ConvexError("Unauthorized");
		}

		const document = await ctx.db.get(args.id);

		if (!document) {
			throw new ConvexError("Document not found");
		}

		const isOwner = document.ownerId === user.subject;

		if (!isOwner) {
			throw new ConvexError("Unauthorized");
		}

		return await ctx.db.delete(args.id);
	},
});