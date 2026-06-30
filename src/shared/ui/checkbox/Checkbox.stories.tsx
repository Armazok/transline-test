import { fn } from '@storybook/test';

import { Checkbox } from './Checkbox';

import type { Meta, StoryObj } from '@storybook/react-vite';


const meta = {
	title: 'shared/ui/Checkbox',
	component: Checkbox,
	tags: ['autodocs'],
	args: {
		checked: false,
		onChange: fn(),
	},
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Unchecked: Story = {
	args: { checked: false },
};

export const Checked: Story = {
	args: { checked: true },
};

export const WithLabel: Story = {
	args: {
		checked: false,
		children: 'Я согласен с условиями использования',
	},
};

export const CheckedWithLabel: Story = {
	args: {
		checked: true,
		children: 'Я согласен с условиями использования',
	},
};
