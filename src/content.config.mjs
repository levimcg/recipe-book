import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const recipes = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/recipes' }),
	schema: z.object({
		title: z.string(),
		date: z.coerce.date(),
		lastUpdated: z.coerce.date().optional(),
		icon: z.string().optional(),
		description: z.string(),
		prep: z.string(),
		cook: z.string(),
		ingredients: z.array(z.string()),
		tags: z.array(z.string()).optional()
	})
});

export const collections = { recipes };