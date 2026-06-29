import { type ChangeEvent, useCallback, useState } from 'react';

import { useTranslation } from 'react-i18next';

import { type EditableProfileFields, useUser } from '@/entities/user';

import { useToast } from '@/shared/lib';

export const useEditProfile = () => {
	const { t } = useTranslation('profile');
	const toast = useToast();
	const { profile, updateProfile } = useUser();

	const [isEditing, setIsEditing] = useState(false);
	const [draft, setDraft] = useState<EditableProfileFields>({
		lastName: '',
		firstName: '',
		email: '',
	});

	const startEdit = useCallback(() => {
		if (!profile) return;
		setDraft({ lastName: profile.lastName, firstName: profile.firstName, email: profile.email });
		setIsEditing(true);
	}, [profile]);

	const cancelEdit = useCallback(() => {
		setIsEditing(false);
	}, []);

	const handleDraftChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		const field = e.target.name as keyof EditableProfileFields;
		setDraft((prev) => ({ ...prev, [field]: e.target.value }));
	}, []);

	const saveEdit = useCallback(() => {
		updateProfile(draft);
		setIsEditing(false);
		toast.success(t('ProfilePage.toast.saved'));
	}, [draft, updateProfile, toast, t]);

	return {
		profile,
		isEditing,
		draft,
		startEdit,
		cancelEdit,
		handleDraftChange,
		saveEdit,
	};
};
