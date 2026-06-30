import { useCallback, useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useToast } from '@/shared/hooks';

import { verifyOtp } from '../../api/verifyOtpApi';

const RESEND_TIMEOUT = 60;

interface OtpFormValues {
	code: string;
}

interface UseVerifyOtpOptions {
	phone: string;
	onResend: () => void;
	onSuccess: () => void;
}

export const useVerifyOtp = ({ phone: _phone, onResend, onSuccess }: UseVerifyOtpOptions) => {
	const { t } = useTranslation('register');
	const toast = useToast();

	const {
		control,
		handleSubmit,
		formState: { errors, isSubmitting },
		setError,
		setValue,
		clearErrors,
		watch,
	} = useForm<OtpFormValues>({
		defaultValues: { code: '' },
		mode: 'onSubmit',
	});

	const code = watch('code');

	const [timeLeft, setTimeLeft] = useState(RESEND_TIMEOUT);
	const canResend = timeLeft === 0;

	useEffect(() => {
		if (timeLeft === 0) return;
		const id = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
		return () => clearTimeout(id);
	}, [timeLeft]);

	const handleResend = useCallback(() => {
		if (!canResend) return;
		setTimeLeft(RESEND_TIMEOUT);
		setValue('code', '');
		clearErrors('code');
		onResend();
		toast.success(t('VerifyOtpForm.toast.resent'));
	}, [canResend, clearErrors, onResend, setValue, t, toast]);

	const onSubmit = handleSubmit(async (values) => {
		try {
			await verifyOtp(values.code);
			onSuccess();
		} catch {
			setError('code', { message: 'VerifyOtpForm.error.invalid' });
		}
	});

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const error = errors.code?.message ? (t(errors.code.message as any) as string) : '';

	return {
		control,
		code,
		error,
		isSubmitting,
		timeLeft,
		canResend,
		handleResend,
		onSubmit,
	};
};
