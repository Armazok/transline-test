import { lazy } from 'react';

export const ManagersPageAsync = lazy(() =>
	import('./ManagersPage').then((m) => ({ default: m.ManagersPage })),
);
