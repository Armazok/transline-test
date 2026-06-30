import { fn } from '@storybook/test';

import { OtpInput } from './OtpInput';

import type { Meta, StoryObj } from '@storybook/react-vite';


const meta = {
	title: 'shared/ui/OtpInput',
	component: OtpInput,
	tags: ['autodocs'],
	args: {
		value: '',
		onChange: fn(),
	},
} satisfies Meta<typeof OtpInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
	args: { value: '' },
};

export const Partial: Story = {
	args: { value: '123' },
};

export const Full: Story = {
	args: { value: '123456' },
};

export const WithError: Story = {
	args: { value: '000000', error: true },
};

export const Disabled: Story = {
	args: { value: '123456', disabled: true },
};
