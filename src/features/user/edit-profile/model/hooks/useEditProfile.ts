import { useCallback, useEffect } from 'react';

import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { type EditableProfileFields, useUser } from '@/entities/user';

import { useToast } from '@/shared/hooks';

const EDITABLE_FIELD_ORDER = ['lastName', 'firstName', 'email'] as const;

const LETTERS_RE = /^[a-zA-Zа-яА-ЯёЁ\s-]+$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type ProfileFormFields = Pick<EditableProfileFields, 'lastName' | 'firstName' | 'email'>;

export const useEditProfile = () => {
	const { t } = useTranslation('profile');
	const toast = useToast();
	const { profile, updateProfile } = useUser();

	const {
		register,
		handleSubmit,
		reset,
		setValue,
		watch,
		setFocus,
		trigger,
		getFieldState,
		formState: { errors, isDirty },
	} = useForm<ProfileFormFields>({
		defaultValues: {
			lastName: profile?.lastName ?? '',
			firstName: profile?.firstName ?? '',
			email: profile?.email ?? '',
		},
		mode: 'onTouched',
	});

	useEffect(() => {
		if (profile) {
			reset({
				lastName: profile.lastName,
				firstName: profile.firstName,
				email: profile.email,
			});
		}
	}, [profile, reset]);

	const fields = {
		lastName: register('lastName', {
			required: 'ProfilePage.errors.required',
			pattern: { value: LETTERS_RE, message: 'ProfilePage.errors.lettersOnly' },
		}),
		firstName: register('firstName', {
			required: 'ProfilePage.errors.required',
			pattern: { value: LETTERS_RE, message: 'ProfilePage.errors.lettersOnly' },
		}),
		email: register('email', {
			required: 'ProfilePage.errors.required',
			pattern: { value: EMAIL_RE, message: 'ProfilePage.errors.email' },
		}),
	};

	const getFieldError = useCallback(
		(field: keyof ProfileFormFields): string | undefined => {
			const msg = errors[field]?.message;
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			return msg ? (t(msg as any) as string) : undefined;
		},
		[errors, t],
	);

	const clearField = useCallback(
		(field: keyof ProfileFormFields) => {
			setValue(field, '', { shouldDirty: true, shouldValidate: false });
		},
		[setValue],
	);

	const onSubmit = handleSubmit((values) => {
		const trimmed: ProfileFormFields = {
			lastName: values.lastName.trim(),
			firstName: values.firstName.trim(),
			email: values.email.trim(),
		};
		try {
			updateProfile(trimmed);
			reset(trimmed);
			toast.success(t('ProfilePage.toast.saved'));
		} catch {
			toast.error(t('ProfilePage.toast.error'));
		}
	});

	const handleClose = useCallback(
		async (onClose: () => void) => {
			const isValid = await trigger();
			if (isValid) {
				reset();
				onClose();
			} else {
				const firstErrorField = EDITABLE_FIELD_ORDER.find((f) => getFieldState(f).invalid);
				if (firstErrorField) setFocus(firstErrorField);
			}
		},
		[trigger, getFieldState, setFocus, reset],
	);

	return { profile, fields, watch, clearField, getFieldError, isDirty, handleClose, onSubmit };
};
