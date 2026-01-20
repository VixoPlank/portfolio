import { config, fields, collection } from '@keystatic/core'

export default config({
	storage: {
		kind: 'github',
		repo: {
			owner: 'VixoPlank',
			name: 'portfolio'
		}
	},
	collections: {
		posts: collection({
			label: 'Posts',
			slugField: 'title',
			path: 'src/content/posts/*',
			format: { contentField: 'content' },
			schema: {
				title: fields.slug({
					name: {
						label: 'Title',
						validation: { isRequired: true }
					}
				}),
				description: fields.text({
					label: 'Description',
					validation: { isRequired: true }
				}),
				image: fields.image({
					label: 'Post image ',
					directory: 'public/posts/',
					publicPath: '/posts/',
					validation: { isRequired: true }
				}),
				publishDate: fields.date({
					label: 'Publish Date',
					validation: { isRequired: true }
				}),
				tags: fields.array(fields.text({ label: 'Tag' }), {
					label: 'Tags',
					itemLabel: (props) => props.value || 'Tag'
				}),
				content: fields.markdoc({
					label: 'Content',
					options: {
						image: {
							directory: 'public/',
							publicPath: '/'
						}
					}
				})
			}
		}),
		projects: collection({
			label: 'Projects',
			slugField: 'title',
			path: 'src/content/projects/*',
			format: { data: 'yaml' },
			schema: {
				title: fields.slug({
					name: {
						label: 'Title',
						validation: { isRequired: true }
					}
				}),
				description: fields.text({
					label: 'Description',
					validation: { isRequired: true },
					multiline: true
				}),
				image: fields.image({
					label: 'Project Image',
					directory: 'src/assets/projects/',
					publicPath: '../../assets/projects/',
					validation: { isRequired: true }
				}),
				link: fields.url({
					label: 'Project Link (URL)',
					description: 'URL del proyecto en vivo (opcional)'
				}),
				github: fields.url({
					label: 'GitHub Repository (URL)',
					description: 'URL del repositorio de GitHub (opcional)'
				}),
				mainTech: fields.array(
					fields.select({
						label: 'Main Technology',
						options: [
							{ label: 'React', value: 'React' },
							{ label: 'Next.js', value: 'Next.js' },
							{ label: 'Astro', value: 'Astro' },
							{ label: 'Tailwind CSS', value: 'Tailwind CSS' },
							{ label: 'Node.js', value: 'Node.js' },
							{ label: 'Express', value: 'Express' },
							{ label: 'MongoDB', value: 'MongoDB' },
							{ label: 'MySQL', value: 'MySQL' },
							{ label: 'Prisma', value: 'Prisma' },
							{ label: 'Zustand', value: 'Zustand' },
							{ label: 'Axios', value: 'Axios' },
							{ label: 'Vite', value: 'Vite' },
							{ label: 'NestJS', value: 'NestJS' },
							{ label: 'Docker', value: 'Docker' }
						],
						defaultValue: 'React'
					}),
					{
						label: 'Main Technologies',
						itemLabel: (props) => props.value || 'Technology'
					}
				),
				tags: fields.array(
					fields.select({
						label: 'Technology',
						options: [
							{ label: 'React', value: 'React' },
							{ label: 'Next.js', value: 'Next.js' },
							{ label: 'Astro', value: 'Astro' },
							{ label: 'Tailwind CSS', value: 'Tailwind CSS' },
							{ label: 'Node.js', value: 'Node.js' },
							{ label: 'Express', value: 'Express' },
							{ label: 'MongoDB', value: 'MongoDB' },
							{ label: 'MySQL', value: 'MySQL' },
							{ label: 'Prisma', value: 'Prisma' },
							{ label: 'Zustand', value: 'Zustand' },
							{ label: 'Axios', value: 'Axios' },
							{ label: 'Vite', value: 'Vite' },
							{ label: 'NestJS', value: 'NestJS' },
							{ label: 'Docker', value: 'Docker' }
						],
						defaultValue: 'React'
					}),
					{
						label: 'All Technologies',
						itemLabel: (props) => props.value || 'Technology'
					}
				),
				status: fields.select({
					label: 'Status',
					options: [
						{ label: 'Completado', value: 'Completado' },
						{ label: 'En desarrollo', value: 'En desarrollo' },
						{ label: 'En pausa', value: 'En pausa' }
					],
					defaultValue: 'Completado'
				}),
				order: fields.integer({
					label: 'Order',
					description: 'Orden de visualización (número menor = aparece primero, opcional)'
				}),
				published: fields.checkbox({
					label: 'Publicado',
					description:
						'Mostrar este proyecto en el portfolio (desmarcar para ocultarlo sin eliminarlo)',
					defaultValue: true
				})
			}
		})
	}
})
