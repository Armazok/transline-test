import { memo, useCallback, useMemo, useState, type ReactNode } from 'react';

import {
	UserContext,
	readUserFromStorage,
	removeUserFromStorage,
	writeUserToStorage,
	type EditableProfileFields,
	type UserProfile,
} from '@/entities/user';

interface UserProviderProps {
	children: ReactNode;
}

export const UserProvider = memo(({ children }: UserProviderProps) => {
	const [profile, setProfileState] = useState<UserProfile | null>(readUserFromStorage);

	const setProfile = useCallback((p: UserProfile) => {
		setProfileState(p);
		writeUserToStorage(p);
	}, []);

	const updateProfile = useCallback((fields: Partial<EditableProfileFields>) => {
		setProfileState((prev) => {
			if (!prev) return prev;
			const next = { ...prev, ...fields };
			writeUserToStorage(next);
			return next;
		});
	}, []);

	const clearProfile = useCallback(() => {
		setProfileState(null);
		removeUserFromStorage();
	}, []);

	const value = useMemo(
		() => ({ profile, setProfile, updateProfile, clearProfile }),
		[profile, setProfile, updateProfile, clearProfile],
	);

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
});

UserProvider.displayName = 'UserProvider';
