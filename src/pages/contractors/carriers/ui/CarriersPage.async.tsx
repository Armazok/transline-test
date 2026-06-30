import { lazy } from 'react';

export const CarriersPageAsync = lazy(() =>
	import('./CarriersPage').then((m) => ({ default: m.CarriersPage })),
);
