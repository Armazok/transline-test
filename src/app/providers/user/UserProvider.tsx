import { memo, useCallback, useMemo, useState, type ReactNode } from 'react';

import { UserContext } from '@/entities/user/model/lib/userContext';
import { readUserFromStorage, removeUserFromStorage, writeUserToStorage } from '@/entities/user/model/lib/userStorage';
import type { EditableProfileFields, UserProfile } from '@/entities/user/model/types/types';

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
