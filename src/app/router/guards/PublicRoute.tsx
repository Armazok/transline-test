import { Navigate, Outlet } from 'react-router-dom';

import { ROUTER_PATH } from '@/shared/config';
import { getAccessToken } from '@/shared/lib';

export const PublicRoute = () => {
	const token = getAccessToken();
	return token ? <Navigate to={ROUTER_PATH.dashboard.main} replace /> : <Outlet />;
};
