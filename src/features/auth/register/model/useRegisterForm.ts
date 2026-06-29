import { type ChangeEvent, type FormEvent, useCallback, useState } from 'react';

import { useTranslation } from 'react-i18next';

import { COUNTRIES, detectCountryByLocale } from '@/entities/phone';

import { type Country, formatPhone, useToast } from '@/shared/lib';

import { sendOtp } from '../api/registerApi';

interface UseRegisterFormOptions {
	onSuccess?: (phone: string) => void;
}

export const useRegisterForm = ({ onSuccess }: UseRegisterFormOptions = {}) => {
	const { t } = useTranslation('register');
	const toast = useToast();

	const [country, setCountry] = useState<Country>(
		() => COUNTRIES.find((c) => c.code === detectCountryByLocale()) ?? COUNTRIES[0],
	);
	const [phone, setPhone] = useState('');
	const [agreed, setAgreed] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const isPhoneValid = phone.length === country.digits;
	const isFormValid = isPhoneValid && agreed;

	const handlePhoneChange = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			const digits = e.target.value.replace(/\D/g, '').slice(0, country.digits);
			setPhone(digits);
		},
		[country.digits],
	);

	const handleCountryChange = useCallback((newCountry: Country) => {
		setCountry(newCountry);
		setPhone('');
	}, []);

	const handleAgreementChange = useCallback(() => setAgreed((prev) => !prev), []);

	const handleSubmit = useCallback(
		(e: FormEvent) => {
			e.preventDefault();
			if (!isFormValid || isSubmitting) return;
			setIsSubmitting(true);
			sendOtp(`${country.dial}${phone}`)
				.then(() => {
					toast.success(t('RegisterForm.toast.success'));
					onSuccess?.(`${country.dial}${phone}`);
				})
				.catch(() => {
					toast.error(t('RegisterForm.toast.error'));
				})
				.finally(() => setIsSubmitting(false));
		},
		[country.dial, isFormValid, isSubmitting, onSuccess, phone, t, toast],
	);

	return {
		country,
		countries: COUNTRIES,
		phoneDisplay: formatPhone(phone, country.mask),
		agreed,
		isSubmitting,
		isFormValid,
		handlePhoneChange,
		handleCountryChange,
		handleAgreementChange,
		handleSubmit,
	};
};
