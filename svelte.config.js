import adapter from '@sveltejs/adapter-static';
import path from 'path';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({
			// default options are shown. On some platforms
			// these options are set automatically — see below
			pages: path.resolve(process.cwd(), 'build'),
			assets: path.resolve(process.cwd(), 'build'),
			fallback: 'index.html',
			precompress: false,
			strict: true
		})
	}
};

export default config;
