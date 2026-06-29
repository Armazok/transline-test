import { Suspense } from 'react';

import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';

import { PageError403 } from '@/pages/error/403';
import { PageError404 } from '@/pages/error/404';
import { PageError500 } from '@/pages/error/500';
import { MainPage } from '@/pages/main';
import { ProfilePage } from '@/pages/profile';
import { RegisterPage } from '@/pages/register';

import { AuthLayout } from '@/widgets/auth-layout';
import { DashboardLayout } from '@/widgets/dashboard-layout';

import { ROUTER_PATH } from '@/shared/config';
import { getAccessToken } from '@/shared/lib';

import { ErrorFallback } from '../providers/ErrorFallback';
import { PrivateRoute } from './guards/PrivateRoute';
import { PublicRoute } from './guards/PublicRoute';

const RootRedirect = () => {
	const token = getAccessToken();
	return <Navigate to={token ? ROUTER_PATH.dashboard.main : ROUTER_PATH.auth.register} replace />;
};

const router = createBrowserRouter([
	{
		errorElement: <ErrorFallback />,
		children: [
			{ path: '/', element: <RootRedirect /> },
			{
				element: <PublicRoute />,
				children: [
					{
						element: <AuthLayout />,
						children: [{ path: ROUTER_PATH.auth.register, element: <RegisterPage /> }],
					},
				],
			},
			{
				element: <PrivateRoute />,
				children: [
					{
						element: <DashboardLayout />,
						children: [
						{ path: ROUTER_PATH.dashboard.main, element: <MainPage /> },
						{ path: ROUTER_PATH.dashboard.profile, element: <ProfilePage /> },
					],
					},
				],
			},
			{ path: ROUTER_PATH.error.error_403, element: <PageError403 /> },
			{ path: ROUTER_PATH.error.error_500, element: <PageError500 /> },
			{ path: ROUTER_PATH.error.error_404, element: <PageError404 /> },
		],
	},
]);

export const AppRouter = () => (
	<Suspense fallback={null}>
		<RouterProvider router={router} />
	</Suspense>
);
