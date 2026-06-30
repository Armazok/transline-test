import { memo, useCallback, useRef, useState } from 'react';

import classNames from 'classnames';

import { useClickOutside } from '@/shared/hooks';
import { type Country } from '@/shared/lib';


import cls from './CountryCodeSelect.module.scss';

interface CountryCodeSelectProps {
	countries: Country[];
	value: Country;
	onChange: (country: Country) => void;
}

export const CountryCodeSelect = memo(({ countries, value, onChange }: CountryCodeSelectProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const ref = useRef<HTMLDivElement>(null);

	const close = useCallback(() => setIsOpen(false), []);
	useClickOutside(ref, close);

	const handleToggle = useCallback(() => setIsOpen((prev) => !prev), []);

	const handleSelect = useCallback(
		(country: Country) => {
			onChange(country);
			setIsOpen(false);
		},
		[onChange],
	);

	return (
		<div ref={ref} className={cls.CountryCodeSelect}>
			<button type="button" className={cls.CountryCodeSelect__trigger} onClick={handleToggle}>
				<span className={cls.CountryCodeSelect__flag}>{value.flag}</span>
				<span className={cls.CountryCodeSelect__dial}>{value.dial}</span>
				<span
					className={classNames(cls.CountryCodeSelect__arrow, {
						[cls.CountryCodeSelect__arrow_open]: isOpen,
					})}
				/>
			</button>

			<div
				className={classNames(cls.CountryCodeSelect__dropdown, {
					[cls.CountryCodeSelect__dropdown_open]: isOpen,
				})}
			>
				{countries.map((country) => (
					<button
						key={country.code}
						type="button"
						className={classNames(cls.CountryCodeSelect__option, {
							[cls.CountryCodeSelect__option_active]: country.code === value.code,
						})}
						onClick={() => handleSelect(country)}
					>
						<span className={cls.CountryCodeSelect__optionFlag}>{country.flag}</span>
						<span className={cls.CountryCodeSelect__optionName}>{country.name}</span>
						<span className={cls.CountryCodeSelect__optionDial}>{country.dial}</span>
					</button>
				))}
			</div>
		</div>
	);
});

CountryCodeSelect.displayName = 'CountryCodeSelect';
