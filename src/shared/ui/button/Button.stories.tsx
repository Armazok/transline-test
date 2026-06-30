import { Button, BUTTON_VARIANT } from './Button';

import type { Meta, StoryObj } from '@storybook/react-vite';


const meta = {
	title: 'shared/ui/Button',
	component: Button,
	tags: ['autodocs'],
	args: {
		children: 'Кнопка',
		variant: BUTTON_VARIANT.PRIMARY_FILL,
	},
	argTypes: {
		variant: {
			control: 'select',
			options: Object.values(BUTTON_VARIANT),
		},
	},
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PrimaryFill: Story = {};

export const Icon: Story = {
	args: {
		children: '→',
		variant: BUTTON_VARIANT.ICON,
	},
};

export const Clear: Story = {
	args: {
		children: 'Очистить',
		variant: BUTTON_VARIANT.CLEAR,
	},
};

export const Disabled: Story = {
	args: {
		isDisabled: true,
	},
};

export const AsLink: Story = {
	args: {
		as: 'a',
		href: '#',
	},
};
