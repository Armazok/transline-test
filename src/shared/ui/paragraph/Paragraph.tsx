import { type ComponentPropsWithoutRef, memo, type ReactNode } from 'react';

import classNames from 'classnames';

import cls from './Paragraph.module.scss';

export enum PARAGRAPH_VARIANT {
	text_1 = 'text_1',
}

const variantClassMap: Record<PARAGRAPH_VARIANT, string> = {
	[PARAGRAPH_VARIANT.text_1]: cls.text_1,
};

interface IParagraph extends ComponentPropsWithoutRef<'p'> {
	children?: ReactNode;
	variant?: PARAGRAPH_VARIANT;
}

export const Paragraph = memo(
	({ children, className, variant = PARAGRAPH_VARIANT.text_1, ...otherProps }: IParagraph) => {
		return (
			<p
				className={classNames(cls.paragraph, variantClassMap[variant], className)}
				{...otherProps}
			>
				{children}
			</p>
		);
	},
);

Paragraph.displayName = 'Paragraph';
