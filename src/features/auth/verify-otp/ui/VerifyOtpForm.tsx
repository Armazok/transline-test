import { memo } from 'react';

import classNames from 'classnames';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
	Button,
	BUTTON_VARIANT,
	Heading,
	HEADING_VARIANT,
	OtpInput,
	Paragraph,
	PARAGRAPH_VARIANT,
} from '@/shared/ui';

import { useVerifyOtp } from '../model/hooks/useVerifyOtp';

import cls from './VerifyOtpForm.module.scss';

interface VerifyOtpFormProps {
	phone: string;
	onResend: () => void;
	onSuccess: () => void;
	className?: string;
}

export const VerifyOtpForm = memo(({ phone, onResend, onSuccess, className }: VerifyOtpFormProps) => {
	const { t } = useTranslation('register');
	const {
		control,
		code,
		error,
		isSubmitting,
		timeLeft,
		canResend,
		handleResend,
		onSubmit,
	} = useVerifyOtp({ phone, onResend, onSuccess });

	return (
		<form className={classNames(cls.VerifyOtpForm, className)} onSubmit={onSubmit} noValidate>
			<div className={cls.VerifyOtpForm__header}>
				<Heading variant={HEADING_VARIANT.h3} className={cls.VerifyOtpForm__title}>
					{t('VerifyOtpForm.title')}
				</Heading>
				<Paragraph variant={PARAGRAPH_VARIANT.text_1}>
					{t('VerifyOtpForm.subtitle', { phone })}
				</Paragraph>
			</div>

			<Controller
				name="code"
				control={control}
				render={({ field: { onChange, value } }) => (
					<OtpInput
						value={value}
						onChange={onChange}
						error={!!error}
						disabled={isSubmitting}
						className={cls.VerifyOtpForm__otp}
					/>
				)}
			/>

			{error && (
				<Paragraph variant={PARAGRAPH_VARIANT.text_1} className={cls.VerifyOtpForm__error}>
					{error}
				</Paragraph>
			)}

			<div className={cls.VerifyOtpForm__resend}>
				{canResend ? (
					<Button
						variant={BUTTON_VARIANT.CLEAR}
						type="button"
						className={cls.VerifyOtpForm__resendBtn}
						onClick={handleResend}
					>
						{t('VerifyOtpForm.resend')}
					</Button>
				) : (
					<Paragraph variant={PARAGRAPH_VARIANT.text_1} className={cls.VerifyOtpForm__timer}>
						{t('VerifyOtpForm.timer', { seconds: timeLeft })}
					</Paragraph>
				)}
			</div>

			<Button
				type="submit"
				disabled={code.length !== 6 || isSubmitting}
				isDisabled={code.length !== 6 || isSubmitting}
				className={cls.VerifyOtpForm__submit}
			>
				{t('VerifyOtpForm.submit')}
			</Button>
		</form>
	);
});

VerifyOtpForm.displayName = 'VerifyOtpForm';
