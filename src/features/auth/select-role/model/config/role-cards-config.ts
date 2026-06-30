import type { UserRole } from '../types/types';

export interface RoleCardConfig {
	role: UserRole;
	titleKey: string;
	descriptionKey: string;
}

export const ROLE_CARDS: RoleCardConfig[] = [
	{
		role: 'customer',
		titleKey: 'SelectRoleForm.customer.title',
		descriptionKey: 'SelectRoleForm.customer.description',
	},
	{
		role: 'carrier',
		titleKey: 'SelectRoleForm.carrier.title',
		descriptionKey: 'SelectRoleForm.carrier.description',
	},
];
