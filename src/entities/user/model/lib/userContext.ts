import { createContext } from 'react';

import type { EditableProfileFields, UserProfile } from '../types/types';

export interface UserContextValue {
	profile: UserProfile | null;
	setProfile: (p: UserProfile) => void;
	updateProfile: (fields: Partial<EditableProfileFields>) => void;
	clearProfile: () => void;
}

export const UserContext = createContext<UserContextValue>({
	profile: null,
	setProfile: () => {},
	updateProfile: () => {},
	clearProfile: () => {},
});
