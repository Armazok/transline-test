import type { ComponentType, SVGProps } from 'react';

import type { ParseKeys } from 'i18next';

export type SvgIcon = ComponentType<SVGProps<SVGSVGElement>>;
export type DashboardKey = ParseKeys<'dashboard'>;

export interface NavSubItemConfig {
	to: string;
	label: DashboardKey;
}

export type NavItemConfig =
	| {
			to: string;
			icon: SvgIcon;
			label: DashboardKey;
			end?: boolean;
			children?: never;
	  }
	| {
			icon: SvgIcon;
			label: DashboardKey;
			children: NavSubItemConfig[];
	  };

export interface NavGroupConfig {
	title: DashboardKey;
	items: NavItemConfig[];
	pinned?: boolean;
}
