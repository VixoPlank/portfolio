import { defineCollection, z } from 'astro:content'

const posts = defineCollection({
	schema: z.object({
		title: z.string(),
		description: z.string(),
		image: z.string(),
		publishDate: z.coerce.date(),
		tags: z.array(z.string())
	})
})

export const collections = { posts }
