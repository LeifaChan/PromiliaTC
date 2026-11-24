// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// https://astro.build/config
export default defineConfig({
	markdown: {
		remarkPlugins: [remarkMath],
		rehypePlugins: [rehypeKatex],
	},
	site: 'https://leifachan.github.io',
	base: '/PromiliaTC',
	integrations: [

		starlight({
			title: 'LeifaTC',
			social: [{ icon: 'twitch', label: 'Twitch', href: 'https://twitch.tv/leifavt' }, 
					 { icon: 'youtube', label: 'YouTube', href: 'https://www.youtube.com/@LeifaVT' },
			],
			customCss: ['katex/dist/katex.min.css'],
			sidebar: [
				{
					label: 'Damage Formula',
					items: [
						{ autogenerate: { directory: 'formulas' } }
					],
				},
			],
		}),
	],
});
