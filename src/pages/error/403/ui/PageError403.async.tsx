import { lazy } from 'react';

export const PageError403Async = lazy(() =>
	import('./PageError403').then((m) => ({ default: m.PageError403 })),
);
