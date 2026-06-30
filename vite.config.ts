import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import react from '@vitejs/plugin-react';
import { playwright } from '@vitest/browser-playwright';
import svgr from 'vite-plugin-svgr';
import { defineConfig } from 'vitest/config';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sharedStyles = path.resolve(__dirname, 'src/app/styles/_shared.scss').replace(/\\/g, '/');

export default defineConfig({
	plugins: [react(), svgr()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
	css: {
		preprocessorOptions: {
			scss: {
				silenceDeprecations: ['import'],
				additionalData: `@import "${sharedStyles}";\n`,
			},
		},
	},
	test: {
		projects: [
			{
				extends: true,
				test: {
					globals: true,
					environment: 'jsdom',
					setupFiles: './src/setupTests.ts',
				},
			},
			{
				extends: true,
				plugins: [storybookTest({ configDir: path.join(__dirname, '.storybook') })],
				test: {
					name: 'storybook',
					browser: {
						enabled: true,
						headless: true,
						provider: playwright({}),
						instances: [{ browser: 'chromium' }],
					},
				},
			},
		],
	},
});
