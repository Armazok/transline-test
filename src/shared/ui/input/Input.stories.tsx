import { Input, INPUT_VARIANT } from './Input';

import type { Meta, StoryObj } from '@storybook/react-vite';


const meta = {
	title: 'shared/ui/Input',
	component: Input,
	tags: ['autodocs'],
	args: {
		placeholder: 'Введите текст...',
		variant: INPUT_VARIANT.PRIMARY_FILL,
	},
	argTypes: {
		variant: {
			control: 'select',
			options: Object.values(INPUT_VARIANT),
		},
	},
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithLabel: Story = {
	args: {
		label: 'Имя пользователя',
	},
};

export const WithError: Story = {
	args: {
		label: 'Email',
		placeholder: 'email@example.com',
		error: 'Некорректный адрес электронной почты',
	},
};

export const Ghost: Story = {
	args: {
		variant: INPUT_VARIANT.GHOST,
		placeholder: '+7 (___) ___-__-__',
	},
};

export const Disabled: Story = {
	args: {
		label: 'Заблокировано',
		disabled: true,
	},
};
