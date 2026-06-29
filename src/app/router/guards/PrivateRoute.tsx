import { Navigate, Outlet } from 'react-router-dom';

import { ROUTER_PATH } from '@/shared/config';
import { getAccessToken } from '@/shared/lib';

export const PrivateRoute = () => {
	const token = getAccessToken();
	return token ? <Outlet /> : <Navigate to={ROUTER_PATH.auth.register} replace />;
};
