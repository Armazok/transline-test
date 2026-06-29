export const ROUTER_PATH = {
	auth: {
		register: '/register',
	},
	dashboard: {
		main: '/main',
		profile: '/profile',
	},
	error: {
		error_404: '*',
		error_403: '/403',
		error_500: '/500',
	},
} as const;

type OnlyStrings<T> = T extends string ? T : never;
type Values<T> = T[keyof T];
type DeepValues<T> = Values<{ [K in keyof T]: Values<T[K]> }>;

export type RouterPath = OnlyStrings<DeepValues<typeof ROUTER_PATH>>;
