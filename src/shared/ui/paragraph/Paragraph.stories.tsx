import { Paragraph, PARAGRAPH_VARIANT } from './Paragraph';

import type { Meta, StoryObj } from '@storybook/react-vite';


const meta = {
	title: 'shared/ui/Paragraph',
	component: Paragraph,
	tags: ['autodocs'],
	args: {
		children: 'Пример текстового блока для отображения параграфа.',
		variant: PARAGRAPH_VARIANT.text_1,
	},
	argTypes: {
		variant: {
			control: 'select',
			options: Object.values(PARAGRAPH_VARIANT),
		},
	},
} satisfies Meta<typeof Paragraph>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
