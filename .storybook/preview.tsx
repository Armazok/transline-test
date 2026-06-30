import { useEffect } from 'react';

import type { Preview } from '@storybook/react-vite';

import '../src/app/styles/_globals.scss';

const preview: Preview = {
	globalTypes: {
		theme: {
			description: 'Global theme',
			toolbar: {
				title: 'Theme',
				icon: 'contrast',
				items: [
					{ value: 'light', title: 'Light', icon: 'sun' },
					{ value: 'dark', title: 'Dark', icon: 'moon' },
				],
				dynamicTitle: true,
			},
		},
	},
	initialGlobals: {
		theme: 'light',
	},
	decorators: [
		(Story, context) => {
			const theme = (context.globals.theme as string) || 'light';

			useEffect(() => {
				document.documentElement.setAttribute('data-theme', theme);
			}, [theme]);

			return <Story />;
		},
	],
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
		a11y: { test: 'todo' },
	},
};

export default preview;
