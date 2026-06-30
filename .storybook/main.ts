import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { mergeConfig } from 'vite';

import type { StorybookConfig } from '@storybook/react-vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sharedStyles = path
	.resolve(__dirname, '../src/app/styles/_shared.scss')
	.replace(/\\/g, '/');

const config: StorybookConfig = {
	stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
	addons: [
		'@chromatic-com/storybook',
		'@storybook/addon-vitest',
		'@storybook/addon-a11y',
		'@storybook/addon-docs',
	],
	framework: '@storybook/react-vite',

	viteFinal: async (config) =>
		mergeConfig(config, {
			resolve: {
				alias: { '@': path.resolve(__dirname, '../src') },
			},
			css: {
				preprocessorOptions: {
					scss: {
						silenceDeprecations: ['import'],
						additionalData: `@import "${sharedStyles}";\n`,
					},
				},
			},
		}),
};

export default config;
