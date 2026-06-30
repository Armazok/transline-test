import { useCallback, useState } from 'react';

import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { COUNTRIES, detectCountryByLocale } from '@/entities/phone';

import { useToast } from '@/shared/hooks';
import { type Country, formatPhone } from '@/shared/lib';


import { sendOtp } from '../../api/registerApi';

interface RegisterFormValues {
	phone: string;
	agreed: boolean;
}

interface UseRegisterFormOptions {
	onSuccess?: (phone: string) => void;
}

export const useRegisterForm = ({ onSuccess }: UseRegisterFormOptions = {}) => {
	const { t } = useTranslation('register');
	const toast = useToast();

	const [country, setCountry] = useState<Country>(
		() => COUNTRIES.find((c) => c.code === detectCountryByLocale()) ?? COUNTRIES[0],
	);

	const {
		control,
		handleSubmit,
		setValue,
		watch,
		formState: { isValid, isSubmitting },
	} = useForm<RegisterFormValues>({
		defaultValues: { phone: '', agreed: false },
		mode: 'onChange',
	});

	const phoneRaw = watch('phone');

	const handleCountryChange = useCallback(
		(newCountry: Country) => {
			setCountry(newCountry);
			setValue('phone', '', { shouldValidate: false });
		},
		[setValue],
	);

	const onSubmit = handleSubmit(async (values) => {
		const fullPhone = `${country.dial}${values.phone}`;
		try {
			await sendOtp(fullPhone);
			toast.success(t('RegisterForm.toast.success'), { autoClose: 5000 });
			onSuccess?.(fullPhone);
		} catch {
			toast.error(t('RegisterForm.toast.error'));
		}
	});

	return {
		control,
		country,
		countries: COUNTRIES,
		phoneDisplay: formatPhone(phoneRaw, country.mask),
		isSubmitting,
		isFormValid: isValid,
		handleCountryChange,
		onSubmit,
	};
};
