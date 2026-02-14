// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	server: {
		open: true
	},
	trailingSlash: 'always',
	site: 'https://recipes.levimcg.com',
});
