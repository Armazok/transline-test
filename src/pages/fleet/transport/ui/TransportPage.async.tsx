import { lazy } from 'react';

export const TransportPageAsync = lazy(() =>
	import('./TransportPage').then((m) => ({ default: m.TransportPage })),
);
