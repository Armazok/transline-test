import { Heading, HEADING_VARIANT } from './Heading';

import type { Meta, StoryObj } from '@storybook/react-vite';


const meta = {
	title: 'shared/ui/Heading',
	component: Heading,
	tags: ['autodocs'],
	args: {
		children: 'Заголовок',
		variant: HEADING_VARIANT.h1,
	},
	argTypes: {
		variant: {
			control: 'select',
			options: Object.values(HEADING_VARIANT),
		},
	},
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const H1: Story = {
	args: { variant: HEADING_VARIANT.h1, children: 'Заголовок H1' },
};

export const H2: Story = {
	args: { variant: HEADING_VARIANT.h2, children: 'Заголовок H2' },
};

export const H3: Story = {
	args: { variant: HEADING_VARIANT.h3, children: 'Заголовок H3' },
};

export const H4: Story = {
	args: { variant: HEADING_VARIANT.h4, children: 'Заголовок H4' },
};

export const H5: Story = {
	args: { variant: HEADING_VARIANT.h5, children: 'Заголовок H5' },
};

export const H6: Story = {
	args: { variant: HEADING_VARIANT.h6, children: 'Заголовок H6' },
};
