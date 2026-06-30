import type { UserProfile } from '../types/types';

const STORAGE_KEY = 'user_profile';

export const readUserFromStorage = (): UserProfile | null => {
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		return raw ? (JSON.parse(raw) as UserProfile) : null;
	} catch {
		return null;
	}
};

export const writeUserToStorage = (profile: UserProfile) => {
	localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
};

export const removeUserFromStorage = () => {
	localStorage.removeItem(STORAGE_KEY);
};
