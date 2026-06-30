import { type ComponentPropsWithoutRef, forwardRef, memo, useId } from 'react';

import classNames from 'classnames';

import { Paragraph, PARAGRAPH_VARIANT } from '../paragraph/Paragraph';

import cls from './Input.module.scss';

export enum INPUT_VARIANT {
	PRIMARY_FILL = 'primaryFill',
	GHOST = 'ghost',
}

const variantClassMap: Record<INPUT_VARIANT, string> = {
	[INPUT_VARIANT.PRIMARY_FILL]: cls.primaryFill,
	[INPUT_VARIANT.GHOST]: cls.ghost,
};

interface IInput extends ComponentPropsWithoutRef<'input'> {
	label?: string;
	error?: string;
	variant?: INPUT_VARIANT;
	wrapperClassName?: string;
}

export const Input = memo(
	forwardRef<HTMLInputElement, IInput>(
		(
			{
				className,
				label,
				error,
				variant = INPUT_VARIANT.PRIMARY_FILL,
				wrapperClassName,
				...otherProps
			},
			ref,
		) => {
			const id = useId();

			return (
				<label htmlFor={id} className={classNames(cls.wrapper, wrapperClassName)}>
					{label && <Paragraph variant={PARAGRAPH_VARIANT.text_1}>{label}</Paragraph>}

					<input
						ref={ref}
						id={id}
						className={classNames(
							cls.input,
							variantClassMap[variant],
							{ [cls.inputError]: !!error },
							className,
						)}
						{...otherProps}
					/>

					{error && (
						<Paragraph variant={PARAGRAPH_VARIANT.text_1} className={cls.errorText}>
							{error}
						</Paragraph>
					)}
				</label>
			);
		},
	),
);

Input.displayName = 'Input';
