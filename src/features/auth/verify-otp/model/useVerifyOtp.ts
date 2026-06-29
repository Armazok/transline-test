import { useCallback, useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';

import { useToast } from '@/shared/lib';

import { verifyOtp } from '../api/verifyOtpApi';

const RESEND_TIMEOUT = 60;

interface UseVerifyOtpOptions {
	phone: string;
	onResend: () => void;
	onSuccess: () => void;
}

export const useVerifyOtp = ({ phone: _phone, onResend, onSuccess }: UseVerifyOtpOptions) => {
	const { t } = useTranslation('register');
	const toast = useToast();

	const [code, setCode] = useState('');
	const [error, setError] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [timeLeft, setTimeLeft] = useState(RESEND_TIMEOUT);

	const canResend = timeLeft === 0;

	useEffect(() => {
		if (timeLeft === 0) return;
		const id = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
		return () => clearTimeout(id);
	}, [timeLeft]);

	const handleCodeChange = useCallback((val: string) => {
		setCode(val);
		setError('');
	}, []);

	const handleResend = useCallback(() => {
		if (!canResend) return;
		setTimeLeft(RESEND_TIMEOUT);
		setCode('');
		setError('');
		onResend();
		toast.success(t('VerifyOtpForm.toast.resent'));
	}, [canResend, onResend, t, toast]);

	const handleSubmit = useCallback(() => {
		if (code.length !== 6 || isSubmitting) return;
		setIsSubmitting(true);
		verifyOtp(code)
			.then(() => {
				onSuccess();
			})
			.catch(() => {
				setError(t('VerifyOtpForm.error.invalid'));
			})
			.finally(() => setIsSubmitting(false));
	}, [code, isSubmitting, onSuccess, t]);

	return {
		code,
		error,
		isSubmitting,
		timeLeft,
		canResend,
		handleCodeChange,
		handleResend,
		handleSubmit,
	};
};
