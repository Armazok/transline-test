import { lazy } from 'react';

export const ReferencesTransportTypesPageAsync = lazy(() =>
	import('./ReferencesTransportTypesPage').then((m) => ({ default: m.ReferencesTransportTypesPage })),
);
