import { lazy } from 'react';

export const PageError404Async = lazy(() =>
	import('./PageError404').then((m) => ({ default: m.PageError404 })),
);
