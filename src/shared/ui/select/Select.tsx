import {
	type ComponentPropsWithoutRef,
	type MouseEvent,
	memo,
	useEffect,
	useRef,
	useState,
	useCallback,
} from 'react';

import classNames from 'classnames';

import cls from './Select.module.scss';

export enum SELECT_VARIANT {
	DEFAULT = 'default',
	MULTIPLE = 'multiple',
}

export enum SELECT_THEME_VARIANT {
	variant_one = 'variant_one',
	variant_two = 'variant_two',
}

export enum SELECT_CHECK_MARK_VARIANT {
	variant_one = 'variant_one',
}

export enum SELECT_ARROW_VARIANT {
	variant_one = 'variant_one',
	variant_two = 'variant_two',
}

interface IOption {
	value: string;
	label: string;
	image?: string;
}

interface ISelect extends Omit<ComponentPropsWithoutRef<'div'>, 'onChange'> {
	className?: string;
	classNameBtn?: string;

	options: IOption[];

	variant?: SELECT_VARIANT;
	variantArrow?: SELECT_ARROW_VARIANT;
	variantTheme?: SELECT_THEME_VARIANT;
	variantCheckMark?: SELECT_CHECK_MARK_VARIANT;

	value?: string | string[];

	placeholder?: string;
	emptyText?: string;

	onChange?: (value: string | string[]) => void;
}

const arrowVariantConfig = {
	[SELECT_ARROW_VARIANT.variant_one]: cls.select_icon_variant_one,

	[SELECT_ARROW_VARIANT.variant_two]: cls.select_icon_variant_two,
};

const themeVariantConfig = {
	[SELECT_THEME_VARIANT.variant_one]: {
		triggerClass: cls.select_trigger_variant_one,
		valueClass: '',
	},

	[SELECT_THEME_VARIANT.variant_two]: {
		triggerClass: cls.select_trigger_variant_two,
		valueClass: cls.select_value_variant_two,
	},
};

const checkMarkVariantConfig = {
	[SELECT_CHECK_MARK_VARIANT.variant_one]: cls.select_checkMark_variant_one,
};

export const Select = memo(
	({
		className,
		classNameBtn,
		options,

		variant = SELECT_VARIANT.DEFAULT,
		variantArrow = SELECT_ARROW_VARIANT.variant_one,
		variantTheme = SELECT_THEME_VARIANT.variant_one,
		variantCheckMark = SELECT_CHECK_MARK_VARIANT.variant_one,

		value,

		placeholder = 'בחר ערך',
		emptyText = 'הרשימה ריקה',

		onChange,

		...otherProps
	}: ISelect) => {
		const [isOpen, setIsOpen] = useState(false);

		const selectRef = useRef<HTMLDivElement>(null);

		const isMultiple = variant === SELECT_VARIANT.MULTIPLE;

		const currentArrowVariant = arrowVariantConfig[variantArrow];

		const currentThemeVariant = themeVariantConfig[variantTheme];

		const currentCheckMarkVariant = checkMarkVariantConfig[variantCheckMark];

		useEffect(() => {
			const handleClickOutside = (event: MouseEvent | globalThis.MouseEvent) => {
				if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
					setIsOpen(false);
				}
			};

			document.addEventListener('mousedown', handleClickOutside);

			return () => {
				document.removeEventListener('mousedown', handleClickOutside);
			};
		}, []);

		const handleToggle = useCallback(() => {
			setIsOpen((prev) => !prev);
		}, []);

		const handleSelect = useCallback(
			(optionValue: string) => {
				if (isMultiple) {
					const multipleValue = Array.isArray(value) ? value : [];

					const isSelected = multipleValue.includes(optionValue);

					const updatedValue = isSelected
						? multipleValue.filter((item) => item !== optionValue)
						: [...multipleValue, optionValue];

					onChange?.(updatedValue);

					return;
				}

				onChange?.(optionValue);

				setIsOpen(false);
			},
			[isMultiple, onChange, value],
		);

		const isSelectedOption = useCallback(
			(optionValue: string) => {
				if (isMultiple) {
					return Array.isArray(value) ? value.includes(optionValue) : false;
				}

				return value === optionValue;
			},
			[isMultiple, value],
		);

		const selectedLabel = useCallback(() => {
			if (isMultiple) {
				const multipleValue = Array.isArray(value) ? value : [];

				const labels = options
					.filter((option) => multipleValue.includes(option.value))
					.map((option) => option.label);

				return labels.length ? labels.join(', ') : placeholder;
			}

			const selectedOption = options.find((option) => option.value === value);

			return selectedOption?.label || placeholder;
		}, [isMultiple, options, placeholder, value]);

		return (
			<div
				ref={selectRef}
				className={classNames(
					cls.select,
					{
						[cls.select_open]: isOpen,
					},
					className,
				)}
				{...otherProps}
			>
				<button
					type="button"
					className={classNames(
						cls.select_trigger,
						currentThemeVariant.triggerClass,
						classNameBtn,
					)}
					onClick={handleToggle}
				>
					<span className={classNames(cls.select_value, currentThemeVariant.valueClass)}>
						{selectedLabel()}
					</span>

					<span className={classNames(cls.select_icon, currentArrowVariant)} />
				</button>

				{isOpen && (
					<div className={cls.select_dropdown}>
						{options.length === 0 ? (
							<div className={cls.select_empty}>{emptyText}</div>
						) : (
							options.map((option) => {
								const isSelected = isSelectedOption(option.value);

								const selectCheckboxClass = isSelected
									? cls.select_checkbox_active
									: '';

								const selectOptionsClass = isSelected
									? cls.select_option_selected
									: '';

								const selectOptionsContentClass =
									!isSelected && !isMultiple
										? cls.select_optionContent_variant_right
										: '';

								return (
									<button
										key={option.value}
										type="button"
										className={classNames(
											cls.select_option,
											selectOptionsClass,
										)}
										onClick={() => handleSelect(option.value)}
									>
										<div
											className={classNames(
												cls.select_optionContent,
												selectOptionsContentClass,
											)}
										>
											{isMultiple && (
												<div
													className={classNames(
														cls.select_checkbox,
														selectCheckboxClass,
													)}
												>
													<span className={cls.select_checkboxIcon} />
												</div>
											)}

											{!isMultiple && isSelected && (
												<span
													className={classNames(
														cls.select_checkMark,
														currentCheckMarkVariant,
													)}
												/>
											)}

											<div className={cls.select_labelWrapper}>
												<span>{option.label}</span>

												{option.image && (
													<img
														style={{
															borderRadius: '50%',
														}}
														alt="image"
														width={32}
														height={32}
														src={option.image}
													/>
												)}
											</div>
										</div>
									</button>
								);
							})
						)}
					</div>
				)}
			</div>
		);
	},
);

Select.displayName = 'Select';
