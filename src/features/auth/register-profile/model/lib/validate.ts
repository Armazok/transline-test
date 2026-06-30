/* eslint-disable i18next/no-literal-string */
import { type UserRole } from '@/features/auth/select-role';

export interface ProfileFormValues {
	lastName: string;
	firstName: string;
	middleName: string;
	email: string;
	password: string;
	confirmPassword: string;
	taxId: string;
}

export type ProfileErrorKey =
	| 'RegisterProfileForm.errors.required'
	| 'RegisterProfileForm.errors.email'
	| 'RegisterProfileForm.errors.passwordMin'
	| 'RegisterProfileForm.errors.passwordStrength'
	| 'RegisterProfileForm.errors.confirmPassword'
	| 'RegisterProfileForm.errors.taxIdLength';

export type ProfileFormErrorKeys = Partial<Record<keyof ProfileFormValues, ProfileErrorKey>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TAX_ID_RE = /^\d{12}$/;

export const validateProfileForm = (
	values: ProfileFormValues,
	_role: UserRole,
): ProfileFormErrorKeys => {
	const errors: ProfileFormErrorKeys = {};

	if (!values.lastName.trim()) {
		errors.lastName = 'RegisterProfileForm.errors.required';
	}

	if (!values.firstName.trim()) {
		errors.firstName = 'RegisterProfileForm.errors.required';
	}

	if (!values.email) {
		errors.email = 'RegisterProfileForm.errors.required';
	} else if (!EMAIL_RE.test(values.email)) {
		errors.email = 'RegisterProfileForm.errors.email';
	}

	if (!values.password) {
		errors.password = 'RegisterProfileForm.errors.required';
	} else if (values.password.length < 8) {
		errors.password = 'RegisterProfileForm.errors.passwordMin';
	} else if (!/[a-zA-Z]/.test(values.password) || !/[0-9]/.test(values.password)) {
		errors.password = 'RegisterProfileForm.errors.passwordStrength';
	}

	if (!values.confirmPassword) {
		errors.confirmPassword = 'RegisterProfileForm.errors.required';
	} else if (values.confirmPassword !== values.password) {
		errors.confirmPassword = 'RegisterProfileForm.errors.confirmPassword';
	}

	if (!values.taxId) {
		errors.taxId = 'RegisterProfileForm.errors.required';
	} else if (!TAX_ID_RE.test(values.taxId)) {
		errors.taxId = 'RegisterProfileForm.errors.taxIdLength';
	}

	return errors;
};
