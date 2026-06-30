import { type ChangeEvent, memo, type ReactNode, useId } from 'react';

import classNames from 'classnames';

import cls from './Checkbox.module.scss';

interface CheckboxProps {
	checked: boolean;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	children?: ReactNode;
	className?: string;
}

export const Checkbox = memo(({ checked, onChange, children, className }: CheckboxProps) => {
	const id = useId();

	return (
		<div className={classNames(cls.Checkbox, className)}>
			<label htmlFor={id} className={cls.Checkbox__toggle}>
				<input
					type="checkbox"
					id={id}
					className={cls.Checkbox__input}
					checked={checked}
					onChange={onChange}
				/>
				<div className={classNames(cls.Checkbox__box, { [cls.Checkbox__box_checked]: checked })}>
					{/* eslint-disable-next-line i18next/no-literal-string */}
					{checked && <span className={cls.Checkbox__icon}>✓</span>}
				</div>
			</label>

			{children && <span className={cls.Checkbox__label}>{children}</span>}
		</div>
	);
});

Checkbox.displayName = 'Checkbox';
