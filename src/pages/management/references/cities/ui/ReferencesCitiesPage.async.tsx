import { lazy } from 'react';

export const ReferencesCitiesPageAsync = lazy(() =>
	import('./ReferencesCitiesPage').then((m) => ({ default: m.ReferencesCitiesPage })),
);
