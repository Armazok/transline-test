import { lazy } from 'react';

export const ReferencesCargoTypesPageAsync = lazy(() =>
	import('./ReferencesCargoTypesPage').then((m) => ({ default: m.ReferencesCargoTypesPage })),
);
