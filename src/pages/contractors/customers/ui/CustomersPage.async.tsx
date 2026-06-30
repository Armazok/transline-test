import { lazy } from 'react';

export const CustomersPageAsync = lazy(() =>
	import('./CustomersPage').then((m) => ({ default: m.CustomersPage })),
);
