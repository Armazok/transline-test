import { lazy } from 'react';

export const OrdersArchivedPageAsync = lazy(() =>
	import('./OrdersArchivedPage').then((m) => ({ default: m.OrdersArchivedPage })),
);
