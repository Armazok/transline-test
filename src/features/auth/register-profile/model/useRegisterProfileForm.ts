import { type ChangeEvent, type FocusEvent, type FormEvent, useCallback, useMemo, useState } from 'react';

import { useTranslation } from 'react-i18next';

import { type UserRole } from '@/features/auth/select-role';

import { useToast } from '@/shared/lib';

import { type ProfileFormValues, validateProfileForm } from './validate';
import { registerProfile } from '../api/registerProfileApi';

type ProfileFormErrors = Partial<Record<keyof ProfileFormValues, string>>;

type TouchedFields = Partial<Record<keyof ProfileFormValues, boolean>>;

const ALL_REQUIRED: TouchedFields = {
	lastName: true,
	firstName: true,
	email: true,
	password: true,
	confirmPassword: true,
	taxId: true,
};

const INITIAL_VALUES: ProfileFormValues = {
	lastName: '',
	firstName: '',
	middleName: '',
	email: '',
	password: '',
	confirmPassword: '',
	taxId: '',
};

interface UseRegisterProfileFormOptions {
	role: UserRole;
	onSuccess: (values: ProfileFormValues) => void;
}

export const useRegisterProfileForm = ({ role, onSuccess }: UseRegisterProfileFormOptions) => {
	const { t } = useTranslation('register');
	const toast = useToast();

	const [values, setValues] = useState<ProfileFormValues>(INITIAL_VALUES);
	const [touched, setTouched] = useState<TouchedFields>({});
	const [isSubmitting, setIsSubmitting] = useState(false);

	const allErrorKeys = useMemo(() => validateProfileForm(values, role), [values, role]);

	const errors: ProfileFormErrors = useMemo(
		() =>
			Object.fromEntries(
				(Object.keys(allErrorKeys) as Array<keyof ProfileFormValues>)
					.filter((key) => touched[key])
					// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
					.map((key) => [key, t(allErrorKeys[key]!)]),
			),
		[allErrorKeys, touched, t],
	);

	const isFormValid = Object.keys(allErrorKeys).length === 0;

	const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		const field = e.target.name as keyof ProfileFormValues;
		setValues((prev) => ({ ...prev, [field]: e.target.value }));
	}, []);

	const handleBlur = useCallback((e: FocusEvent<HTMLInputElement>) => {
		const field = e.target.name as keyof ProfileFormValues;
		setTouched((prev) => ({ ...prev, [field]: true }));
	}, []);

	const handleSubmit = useCallback(
		(e: FormEvent) => {
			e.preventDefault();
			setTouched(ALL_REQUIRED);
			if (!isFormValid || isSubmitting) return;
			setIsSubmitting(true);
			registerProfile(values)
				.then(() => {
					toast.success(t('RegisterProfileForm.toast.success'));
					onSuccess(values);
				})
				.catch(() => {
					toast.error(t('RegisterProfileForm.toast.error'));
				})
				.finally(() => setIsSubmitting(false));
		},
		[isFormValid, isSubmitting, onSuccess, t, toast, values],
	);

	const taxIdLabel =
		role === 'customer'
			? t('RegisterProfileForm.fields.bin')
			: t('RegisterProfileForm.fields.iin');

	return {
		values,
		errors,
		isSubmitting,
		isFormValid,
		taxIdLabel,
		handleChange,
		handleBlur,
		handleSubmit,
	};
};
