import type { UserProfile } from '@/entities/user';

import type { ParseKeys } from 'i18next';


type ProfileKey = ParseKeys<'profile'>;

export interface ProfileFieldConfig {
	name: keyof UserProfile;
	label: ProfileKey;
	readonly?: boolean;
}

export const PROFILE_FIELDS: ProfileFieldConfig[] = [
	{ name: 'lastName', label: 'ProfilePage.fields.lastName' },
	{ name: 'firstName', label: 'ProfilePage.fields.firstName' },
	{ name: 'middleName', label: 'ProfilePage.fields.middleName', readonly: true },
	{ name: 'phone', label: 'ProfilePage.fields.phone', readonly: true },
	{ name: 'email', label: 'ProfilePage.fields.email' },
	{ name: 'role', label: 'ProfilePage.fields.role', readonly: true },
	{ name: 'taxId', label: 'ProfilePage.fields.taxId', readonly: true },
];
