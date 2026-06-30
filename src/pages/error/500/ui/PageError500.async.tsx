import { lazy } from 'react';

export const PageError500Async = lazy(() =>
	import('./PageError500').then((m) => ({ default: m.PageError500 })),
);
