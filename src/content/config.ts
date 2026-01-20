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

const projects = defineCollection({
	type: 'data',
	schema: z.object({
		title: z.string(),
		description: z.string(),
		image: z.string(), // Ruta relativa de la imagen, se convierte a ImageMetadata en el componente
		link: z.string().url().optional(),
		github: z.string().url().optional(),
		mainTech: z.array(z.string()),
		tags: z.array(z.string()),
		status: z.string(),
		order: z.number().optional(),
		published: z.boolean().default(true)
	})
})

export const collections = { posts, projects }
