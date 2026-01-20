import type { ImageMetadata } from 'astro'

// Mapeo de directorios a sus respectivos globs (import.meta.glob requiere strings literales)
const ASSET_GLOBS: Record<string, () => Record<string, any>> = {
	projects: () => import.meta.glob('../assets/projects/**/*.{png,jpg,jpeg,webp}', { eager: true }),
	posts: () => import.meta.glob('../assets/posts/**/*.{png,jpg,jpeg,webp}', { eager: true })
}

/**
 * Crea un helper para importar dinámicamente imágenes desde un directorio de assets
 * @param directory - Nombre del directorio dentro de src/assets (ej: 'projects', 'posts')
 * @returns Función helper para obtener imágenes desde rutas relativas
 */
export function getImageFromAssets(directory: string) {
	// Obtener la función de glob para el directorio especificado
	const globFn = ASSET_GLOBS[directory]
	
	if (!globFn) {
		throw new Error(
			`Directorio "${directory}" no está configurado. Directorios disponibles: ${Object.keys(ASSET_GLOBS).join(', ')}`
		)
	}

	// Importar dinámicamente todas las imágenes del directorio especificado
	const imageModules = globFn()

	/**
	 * Obtiene una imagen ImageMetadata desde una ruta relativa
	 * @param imagePath - Ruta relativa de la imagen (ej: 'github-profiles/image.png')
	 * @returns ImageMetadata o null si no se encuentra
	 */
	const getImage = (imagePath: string): ImageMetadata | null => {
		// Normalizar la ruta: puede venir como 'github-profiles/image.png'
		const normalizedPath = imagePath.replace(/\\/g, '/')

		// Buscar la imagen en los módulos importados
		// Las rutas en import.meta.glob vienen como '../assets/{directory}/...'
		for (const [path, module] of Object.entries(imageModules)) {
			// Normalizar la ruta del módulo
			const modulePath = path.replace(/\\/g, '/')

			// Buscar coincidencia: el path del módulo debe terminar con la ruta de la imagen
			// Ejemplo: '../assets/projects/github-profiles/image.png' termina con 'github-profiles/image.png'
			if (modulePath.endsWith(normalizedPath)) {
				return ((module as any).default || module) as ImageMetadata
			}
		}

		return null
	}

	return { getImage, imageModules }
}
