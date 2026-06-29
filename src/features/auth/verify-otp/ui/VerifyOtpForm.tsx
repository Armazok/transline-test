import { memo } from 'react';

import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import { Button, Heading, HEADING_VARIANT, OtpInput, Paragraph, PARAGRAPH_VARIANT } from '@/shared/ui';

import { useVerifyOtp } from '../model/useVerifyOtp';

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
		code,
		error,
		isSubmitting,
		timeLeft,
		canResend,
		handleCodeChange,
		handleResend,
		handleSubmit,
	} = useVerifyOtp({ phone, onResend, onSuccess });

	return (
		<div className={classNames(cls.VerifyOtpForm, className)}>
			<div className={cls.VerifyOtpForm__header}>
				<Heading variant={HEADING_VARIANT.h3} className={cls.VerifyOtpForm__title}>
					{t('VerifyOtpForm.title')}
				</Heading>
				<Paragraph variant={PARAGRAPH_VARIANT.text_1}>
					{t('VerifyOtpForm.subtitle', { phone })}
				</Paragraph>
			</div>

			<OtpInput
				value={code}
				onChange={handleCodeChange}
				error={!!error}
				disabled={isSubmitting}
				className={cls.VerifyOtpForm__otp}
			/>

			{error && (
				<p className={cls.VerifyOtpForm__error}>{error}</p>
			)}

			<div className={cls.VerifyOtpForm__resend}>
				{canResend ? (
					<button
						type="button"
						className={cls.VerifyOtpForm__resendBtn}
						onClick={handleResend}
					>
						{t('VerifyOtpForm.resend')}
					</button>
				) : (
					<Paragraph variant={PARAGRAPH_VARIANT.text_1} className={cls.VerifyOtpForm__timer}>
						{t('VerifyOtpForm.timer', { seconds: timeLeft })}
					</Paragraph>
				)}
			</div>

			<Button
				disabled={code.length !== 6 || isSubmitting}
				isDisabled={code.length !== 6 || isSubmitting}
				className={cls.VerifyOtpForm__submit}
				onClick={handleSubmit}
			>
				{t('VerifyOtpForm.submit')}
			</Button>
		</div>
	);
});

VerifyOtpForm.displayName = 'VerifyOtpForm';
