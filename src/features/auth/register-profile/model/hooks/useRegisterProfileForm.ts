import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { type UserRole } from '@/entities/user';

import { useToast } from '@/shared/hooks';

import { registerProfile } from '../../api/registerProfileApi';
import { type ProfileFormValues } from '../types/types';

interface UseRegisterProfileFormOptions {
	role: UserRole;
	onSuccess: (values: ProfileFormValues) => void;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TAX_ID_RE = /^\d{12}$/;

const trimValues = (values: ProfileFormValues): ProfileFormValues =>
	Object.fromEntries(
		Object.entries(values).map(([k, v]) => [k, typeof v === 'string' ? v.trim() : v]),
	) as ProfileFormValues;

export const useRegisterProfileForm = ({ role, onSuccess }: UseRegisterProfileFormOptions) => {
	const { t } = useTranslation('register');
	const toast = useToast();

	const {
		register,
		handleSubmit,
		getValues,
		setFocus,
		formState: { errors, isSubmitting },
	} = useForm<ProfileFormValues>({
		defaultValues: {
			lastName: '',
			firstName: '',
			middleName: '',
			email: '',
			password: '',
			confirmPassword: '',
			taxId: '',
		},
		mode: 'onTouched',
	});

	const onSubmit = handleSubmit(
		async (values) => {
			const trimmed = trimValues(values);
			try {
				await registerProfile(trimmed);
				toast.success(t('RegisterProfileForm.toast.success'));
				onSuccess(trimmed);
			} catch {
				toast.error(t('RegisterProfileForm.toast.error'));
			}
		},
		(fieldErrors) => {
			const firstKey = Object.keys(fieldErrors)[0] as keyof ProfileFormValues;
			if (firstKey) setFocus(firstKey);
		},
	);

	const taxIdLabel =
		role === 'customer'
			? t('RegisterProfileForm.fields.bin')
			: t('RegisterProfileForm.fields.iin');

	const fields = {
		lastName: register('lastName', {
			required: 'RegisterProfileForm.errors.required',
		}),
		firstName: register('firstName', {
			required: 'RegisterProfileForm.errors.required',
		}),
		middleName: register('middleName'),
		email: register('email', {
			required: 'RegisterProfileForm.errors.required',
			pattern: { value: EMAIL_RE, message: 'RegisterProfileForm.errors.email' },
		}),
		password: register('password', {
			required: 'RegisterProfileForm.errors.required',
			minLength: { value: 8, message: 'RegisterProfileForm.errors.passwordMin' },
			validate: (v) =>
				(/[a-zA-Z]/.test(v) && /[0-9]/.test(v)) ||
				'RegisterProfileForm.errors.passwordStrength',
		}),
		confirmPassword: register('confirmPassword', {
			required: 'RegisterProfileForm.errors.required',
			validate: (v) =>
				v === getValues('password') || 'RegisterProfileForm.errors.confirmPassword',
		}),
		taxId: register('taxId', {
			required: 'RegisterProfileForm.errors.required',
			pattern: { value: TAX_ID_RE, message: 'RegisterProfileForm.errors.taxIdLength' },
		}),
	};

	const getError = (key: keyof ProfileFormValues): string | undefined => {
		const msg = errors[key]?.message;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		return msg ? (t(msg as any) as string) : undefined;
	};

	return { fields, getError, isSubmitting, taxIdLabel, onSubmit };
};
