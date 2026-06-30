export const ROUTER_PATH = {
	auth: {
		register: '/register',
	},
	dashboard: {
		orders: {
			activeApplications: '/orders/active-applications',
			archived: '/orders/archived',
		},
		contractors: {
			customers: '/contractors/customers',
			carriers: '/contractors/carriers',
		},
		fleet: {
			transport: '/fleet/transport',
		},
		management: {
			references: {
				transportTypes: '/management/references/transport-types',
				cargoTypes: '/management/references/cargo-types',
				cities: '/management/references/cities',
			},
			managers: '/management/managers',
		},
	},
	error: {
		notFound: '*',
		forbidden: '/403',
		serverError: '/500',
	},
} as const;

type OnlyStrings<T> = T extends string ? T : never;
type Leaves<T> = T extends object ? Leaves<T[keyof T]> : T;

export type RouterPath = OnlyStrings<Leaves<typeof ROUTER_PATH>>;
