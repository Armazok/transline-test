import { type ComponentPropsWithoutRef, memo, type ReactNode } from 'react';

import classNames from 'classnames';

import cls from './Heading.module.scss';

export enum HEADING_VARIANT {
	h1 = 'h1',
	h2 = 'h2',
	h3 = 'h3',
	h4 = 'h4',
	h5 = 'h5',
	h6 = 'h6',
}

interface IHeading extends ComponentPropsWithoutRef<'h1'> {
	children?: ReactNode;
	variant?: HEADING_VARIANT;
}

export const Heading = memo(
	({ children, variant = HEADING_VARIANT.h1, className, ...otherProps }: IHeading) => {
		const Tag = variant;

		return (
			<Tag className={classNames(cls.heading, cls[variant], className)} {...otherProps}>
				{children}
			</Tag>
		);
	},
);

Heading.displayName = 'Heading';
