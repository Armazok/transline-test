import { type ComponentPropsWithoutRef, memo, type ReactNode } from 'react';

import classNames from 'classnames';

import cls from './Button.module.scss';

export enum BUTTON_VARIANT {
	PRIMARY_FILL = 'primaryFill',
	ICON = 'icon',
	CLEAR = 'clear',
}

const variantClassMap: Record<BUTTON_VARIANT, string> = {
	[BUTTON_VARIANT.PRIMARY_FILL]: cls.primaryFill,
	[BUTTON_VARIANT.ICON]: cls.icon,
	[BUTTON_VARIANT.CLEAR]: cls.clear,
};

type AllowedElements = 'button' | 'a';

type Props<T extends AllowedElements> = {
	as?: T;
	children?: ReactNode;
	variant?: BUTTON_VARIANT;
	className?: string;
	isDisabled?: boolean;
} & ComponentPropsWithoutRef<T>;

export const Button = memo(
	<T extends AllowedElements = 'button'>({
		as,
		children,
		className,
		isDisabled,
		variant = BUTTON_VARIANT.PRIMARY_FILL,
		...otherProps
	}: Props<T>) => {
		const buttonClass = classNames(cls.button, variantClassMap[variant], className);

		if (as === 'a') {
			return (
				<a className={buttonClass} {...(otherProps as ComponentPropsWithoutRef<'a'>)}>
					{children}
				</a>
			);
		}

		return (
			<button
				disabled={isDisabled}
				className={buttonClass}
				{...(otherProps as ComponentPropsWithoutRef<'button'>)}
			>
				{children}
			</button>
		);
	},
);

Button.displayName = 'Button';
