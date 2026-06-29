import { createContext, memo, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

import { type EditableProfileFields, type UserProfile } from './types';

 
const STORAGE_KEY = 'user_profile';

const readFromStorage = (): UserProfile | null => {
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		return raw ? (JSON.parse(raw) as UserProfile) : null;
	} catch {
		return null;
	}
};

const writeToStorage = (p: UserProfile) => {
	localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
};

const removeFromStorage = () => {
	localStorage.removeItem(STORAGE_KEY);
};

interface UserContextValue {
	profile: UserProfile | null;
	setProfile: (p: UserProfile) => void;
	updateProfile: (fields: Partial<EditableProfileFields>) => void;
	clearProfile: () => void;
}

const UserContext = createContext<UserContextValue>({
	profile: null,
	setProfile: () => {},
	updateProfile: () => {},
	clearProfile: () => {},
});

interface UserProviderProps {
	children: ReactNode;
}

export const UserProvider = memo(({ children }: UserProviderProps) => {
	const [profile, setProfileState] = useState<UserProfile | null>(readFromStorage);

	const setProfile = useCallback((p: UserProfile) => {
		setProfileState(p);
		writeToStorage(p);
	}, []);

	const updateProfile = useCallback((fields: Partial<EditableProfileFields>) => {
		setProfileState((prev) => {
			if (!prev) return prev;
			const next = { ...prev, ...fields };
			writeToStorage(next);
			return next;
		});
	}, []);

	const clearProfile = useCallback(() => {
		setProfileState(null);
		removeFromStorage();
	}, []);

	const value = useMemo(
		() => ({ profile, setProfile, updateProfile, clearProfile }),
		[profile, setProfile, updateProfile, clearProfile],
	);

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
});

UserProvider.displayName = 'UserProvider';

export const useUser = () => useContext(UserContext);
