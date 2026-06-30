import {
	memo,
	useRef,
	type ChangeEvent,
	type ClipboardEvent,
	type KeyboardEvent,
} from 'react';

import classNames from 'classnames';

import cls from './OtpInput.module.scss';

const OTP_LENGTH = 6;

interface OtpInputProps {
	value: string;
	onChange: (value: string) => void;
	error?: boolean;
	disabled?: boolean;
	className?: string;
}

export const OtpInput = memo(({ value, onChange, error, disabled, className }: OtpInputProps) => {
	const inputRefs = useRef<Array<HTMLInputElement | null>>(Array(OTP_LENGTH).fill(null));

	const digits = Array.from({ length: OTP_LENGTH }, (_, i) => value[i] ?? '');

	const handleChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
		const char = e.target.value.replace(/\D/g, '').slice(-1);
		const next = [...digits];
		next[index] = char;
		onChange(next.join(''));
		if (char && index < OTP_LENGTH - 1) {
			inputRefs.current[index + 1]?.focus();
		}
	};

	const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Backspace') {
			if (digits[index]) {
				const next = [...digits];
				next[index] = '';
				onChange(next.join(''));
			} else if (index > 0) {
				inputRefs.current[index - 1]?.focus();
			}
		} else if (e.key === 'ArrowLeft' && index > 0) {
			inputRefs.current[index - 1]?.focus();
		} else if (e.key === 'ArrowRight' && index < OTP_LENGTH - 1) {
			inputRefs.current[index + 1]?.focus();
		}
	};

	const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
		e.preventDefault();
		// eslint-disable-next-line i18next/no-literal-string
		const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH);
		onChange(pasted);
		const focusIdx = Math.min(pasted.length, OTP_LENGTH - 1);
		inputRefs.current[focusIdx]?.focus();
	};

	return (
		<div className={classNames(cls.OtpInput, className)}>
			{digits.map((digit, index) => (
				<input
					key={`otp-${index}`}
					ref={(el) => {
						inputRefs.current[index] = el;
					}}
					type="text"
					inputMode="numeric"
					pattern="[0-9]*"
					maxLength={2}
					value={digit}
					disabled={disabled}
					onChange={(e) => handleChange(index, e)}
					onKeyDown={(e) => handleKeyDown(index, e)}
					onPaste={handlePaste}
					className={classNames(cls.OtpInput__cell, {
						[cls.OtpInput__cell_error]: error,
						[cls.OtpInput__cell_filled]: !!digit,
					})}
				/>
			))}
		</div>
	);
});

OtpInput.displayName = 'OtpInput';
