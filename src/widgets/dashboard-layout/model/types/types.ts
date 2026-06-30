import type { ParseKeys } from 'i18next';

export type DashboardKey = ParseKeys<'dashboard'>;

export type UserMenuAction = 'editProfile' | 'logout';

export interface UserMenuItemConfig {
	action: UserMenuAction;
	label: DashboardKey;
}

export type UserMenuItem = UserMenuItemConfig | { divider: true };
