import { fn } from 'storybook/test';


import type { Country } from '@/shared/lib';

import { PhoneInput } from './PhoneInput';

import type { Meta, StoryObj } from '@storybook/react-vite';

const KZ: Country = {
	code: 'KZ',
	dial: '+7',
	flag: '🇰🇿',
	name: 'Казахстан',
	mask: '(XXX) XXX-XX-XX',
	digits: 10,
};

const RU: Country = {
	code: 'RU',
	dial: '+7',
	flag: '🇷🇺',
	name: 'Россия',
	mask: '(XXX) XXX-XX-XX',
	digits: 10,
};

const COUNTRIES: Country[] = [KZ, RU];

const meta = {
	title: 'shared/ui/PhoneInput',
	component: PhoneInput,
	tags: ['autodocs'],
	args: {
		countries: COUNTRIES,
		country: KZ,
		value: '',
		placeholder: '(___) ___-__-__',
		onChange: fn(),
		onCountryChange: fn(),
	},
} satisfies Meta<typeof PhoneInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {};

export const WithValue: Story = {
	args: { value: '(777) 123-45-67' },
};

export const Russia: Story = {
	args: { country: RU },
};
