import { useForm } from 'react-hook-form';

import { type UserRole } from '../types/types';

interface SelectRoleFormValues {
	role: UserRole | null;
}

interface UseSelectRoleOptions {
	onSuccess?: (role: UserRole) => void;
}

export const useSelectRole = ({ onSuccess }: UseSelectRoleOptions = {}) => {
	const { control, handleSubmit, watch } = useForm<SelectRoleFormValues>({
		defaultValues: { role: null },
	});

	const role = watch('role');

	const onSubmit = handleSubmit((values) => {
		if (values.role) onSuccess?.(values.role);
	});

	return { control, role, onSubmit };
};
