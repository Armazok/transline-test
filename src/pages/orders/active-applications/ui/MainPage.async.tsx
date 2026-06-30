import { lazy } from 'react';

export const MainPageAsync = lazy(() =>
	import('./MainPage').then((m) => ({ default: m.MainPage })),
);
