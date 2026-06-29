import { useCallback, useState } from 'react';

import { type UserRole } from './types';

interface UseSelectRoleOptions {
	onSuccess?: (role: UserRole) => void;
}

export const useSelectRole = ({ onSuccess }: UseSelectRoleOptions = {}) => {
	const [role, setRole] = useState<UserRole | null>(null);

	const handleSelect = useCallback((r: UserRole) => setRole(r), []);

	const handleSubmit = useCallback(() => {
		if (!role) return;
		onSuccess?.(role);
	}, [role, onSuccess]);

	return { role, handleSelect, handleSubmit };
};
