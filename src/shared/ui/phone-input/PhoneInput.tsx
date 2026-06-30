import { type ChangeEvent, forwardRef, memo } from 'react';

import classNames from 'classnames';

import { type Country } from '@/shared/lib';
import { Input, INPUT_VARIANT } from '@/shared/ui';

import { CountryCodeSelect } from './CountryCodeSelect';

import cls from './PhoneInput.module.scss';

interface PhoneInputProps {
	countries: Country[];
	country: Country;
	value: string;
	placeholder?: string;
	className?: string;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	onCountryChange: (country: Country) => void;
}

export const PhoneInput = memo(
	forwardRef<HTMLInputElement, PhoneInputProps>(
		({ countries, country, value, placeholder, className, onChange, onCountryChange }, ref) => (
			<div className={classNames(cls.PhoneInput, className)}>
				<CountryCodeSelect
					countries={countries}
					value={country}
					onChange={onCountryChange}
				/>
				<Input
					ref={ref}
					type="text"
					// eslint-disable-next-line i18next/no-literal-string
					inputMode="tel"
					variant={INPUT_VARIANT.GHOST}
					wrapperClassName={cls.PhoneInput__inputWrapper}
					className={cls.PhoneInput__input}
					placeholder={placeholder}
					value={value}
					onChange={onChange}
				/>
			</div>
		),
	),
);

PhoneInput.displayName = 'PhoneInput';
