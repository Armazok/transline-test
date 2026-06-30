import type { UserMenuItem } from '../types/types';

export const USER_MENU_ITEMS: UserMenuItem[] = [
	{ action: 'editProfile', label: 'header.editProfile' },
	{ divider: true },
	{ action: 'logout', label: 'header.logout' },
];
