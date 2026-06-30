import CarriersIcon from '@/shared/assets/icons/contractors/carriers.svg?react';
import CustomersIcon from '@/shared/assets/icons/contractors/customers.svg?react';
import TransportIcon from '@/shared/assets/icons/fleet/transport.svg?react';
import ManagersIcon from '@/shared/assets/icons/management/managers.svg?react';
import ReferenceBooksIcon from '@/shared/assets/icons/management/reference-books.svg?react';
import ActiveIcon from '@/shared/assets/icons/orders/active.svg?react';
import ArchivalIcon from '@/shared/assets/icons/orders/archival.svg?react';
import { ROUTER_PATH } from '@/shared/config';

import type { NavGroupConfig } from '../types/types';

export const NAV_GROUPS: NavGroupConfig[] = [
	{
		title: 'nav.orders.title',
		items: [
			{ to: ROUTER_PATH.dashboard.orders.activeApplications, icon: ActiveIcon, label: 'nav.orders.active', end: true },
			{ to: ROUTER_PATH.dashboard.orders.archived, icon: ArchivalIcon, label: 'nav.orders.archived' },
		],
	},
	{
		title: 'nav.contractors.title',
		items: [
			{ to: ROUTER_PATH.dashboard.contractors.customers, icon: CustomersIcon, label: 'nav.contractors.customers' },
			{ to: ROUTER_PATH.dashboard.contractors.carriers, icon: CarriersIcon, label: 'nav.contractors.carriers' },
		],
	},
	{
		title: 'nav.fleet.title',
		items: [
			{ to: ROUTER_PATH.dashboard.fleet.transport, icon: TransportIcon, label: 'nav.fleet.transport' },
		],
	},
	{
		title: 'nav.management.title',
		pinned: true,
		items: [
			{
				icon: ReferenceBooksIcon,
				label: 'nav.management.references.title',
				children: [
					{ to: ROUTER_PATH.dashboard.management.references.transportTypes, label: 'nav.management.references.transportTypes' },
					{ to: ROUTER_PATH.dashboard.management.references.cargoTypes, label: 'nav.management.references.cargoTypes' },
					{ to: ROUTER_PATH.dashboard.management.references.cities, label: 'nav.management.references.cities' },
				],
			},
			{ to: ROUTER_PATH.dashboard.management.managers, icon: ManagersIcon, label: 'nav.management.managers' },
		],
	},
];
