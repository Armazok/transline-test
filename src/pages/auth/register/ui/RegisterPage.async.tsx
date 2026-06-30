import { lazy } from 'react';

export const RegisterPageAsync = lazy(() =>
	import('./RegisterPage').then((m) => ({ default: m.RegisterPage })),
);
