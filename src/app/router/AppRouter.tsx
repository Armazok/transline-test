import { Suspense } from 'react';

import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';

import { RegisterPage } from '@/pages/auth/register';
import { CarriersPage } from '@/pages/contractors/carriers';
import { CustomersPage } from '@/pages/contractors/customers';
import { PageError403 } from '@/pages/error/403';
import { PageError404 } from '@/pages/error/404';
import { PageError500 } from '@/pages/error/500';
import { TransportPage } from '@/pages/fleet/transport';
import { ManagersPage } from '@/pages/management/managers';
import { ReferencesCargoTypesPage } from '@/pages/management/references/cargo-types';
import { ReferencesCitiesPage } from '@/pages/management/references/cities';
import { ReferencesTransportTypesPage } from '@/pages/management/references/transport-types';
import { MainPage } from '@/pages/orders/active-applications';
import { OrdersArchivedPage } from '@/pages/orders/archived';

import { AuthLayout } from '@/widgets/auth-layout';
import { DashboardLayout } from '@/widgets/dashboard-layout';

import { ROUTER_PATH } from '@/shared/config';
import { getAccessToken } from '@/shared/lib';

import { ErrorFallback } from '../providers';
import { PrivateRoute } from './guards/PrivateRoute';
import { PublicRoute } from './guards/PublicRoute';

const RootRedirect = () => {
	const token = getAccessToken();
	return <Navigate to={token ? ROUTER_PATH.dashboard.orders.activeApplications : ROUTER_PATH.auth.register} replace />;
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
							{ path: ROUTER_PATH.dashboard.orders.activeApplications, element: <MainPage /> },
							{ path: ROUTER_PATH.dashboard.orders.archived, element: <OrdersArchivedPage /> },
							{ path: ROUTER_PATH.dashboard.contractors.customers, element: <CustomersPage /> },
							{ path: ROUTER_PATH.dashboard.contractors.carriers, element: <CarriersPage /> },
							{ path: ROUTER_PATH.dashboard.fleet.transport, element: <TransportPage /> },
{ path: ROUTER_PATH.dashboard.management.references.transportTypes, element: <ReferencesTransportTypesPage /> },
							{ path: ROUTER_PATH.dashboard.management.references.cargoTypes, element: <ReferencesCargoTypesPage /> },
							{ path: ROUTER_PATH.dashboard.management.references.cities, element: <ReferencesCitiesPage /> },
							{ path: ROUTER_PATH.dashboard.management.managers, element: <ManagersPage /> },
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
