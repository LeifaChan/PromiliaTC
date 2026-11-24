// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://leifachan.github.io',
	base: '/PromiliaTC',
	integrations: [

		starlight({
			title: 'LeifaTC',
			social: [{ icon: 'twitch', label: 'Twitch', href: 'https://twitch.tv/leifavt' }, 
					 { icon: 'youtube', label: 'YouTube', href: 'https://www.youtube.com/@LeifaVT' },
			],
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
