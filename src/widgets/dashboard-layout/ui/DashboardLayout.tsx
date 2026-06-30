import { memo, useCallback, useEffect, useMemo } from 'react';

import classNames from 'classnames';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { Sidebar } from '@/widgets/sidebar';

import { clearRegProgress } from '@/features/auth/register';
import { ProfilePanel } from '@/features/user/edit-profile';

import { useUser } from '@/entities/user';

import { ROUTER_PATH } from '@/shared/config';
import { removeAccessToken } from '@/shared/lib';

import { DashboardHeader } from './DashboardHeader';
import { useDashboardLayout } from '../model/hooks/useDashboardLayout';
import { type UserMenuAction } from '../model/types/types';

import cls from './DashboardLayout.module.scss';

export const DashboardLayout = memo(() => {
	const navigate = useNavigate();
	const location = useLocation();
	const { clearProfile } = useUser();
	const {
		isSidebarOpen,
		isMobile,
		toggleSidebar,
		closeSidebar,
		isProfileOpen,
		openProfile,
		closeProfile,
	} = useDashboardLayout();

	// Закрываем сайдбар при навигации на мобильном
	useEffect(() => {
		if (isMobile) closeSidebar();
	}, [location.pathname, isMobile, closeSidebar]);

	const handleMenuAction = useCallback(
		(action: UserMenuAction) => {
			if (action === 'editProfile') openProfile();
			if (action === 'logout') {
				clearProfile();
				removeAccessToken();
				clearRegProgress();
				navigate(ROUTER_PATH.auth.register, { replace: true });
			}
		},
		[openProfile, clearProfile, navigate],
	);

	const activeActions = useMemo<ReadonlySet<UserMenuAction>>(
		// eslint-disable-next-line i18next/no-literal-string
		() => new Set(isProfileOpen ? (['editProfile'] as UserMenuAction[]) : []),
		[isProfileOpen],
	);

	return (
		<div className={cls.root}>
			<DashboardHeader
				onToggleSidebar={toggleSidebar}
				onMenuAction={handleMenuAction}
				activeMenuActions={activeActions}
			/>

			<div className={cls.body}>
				{isSidebarOpen && <div className={cls.backdrop} onClick={closeSidebar} />}

				<div
					className={classNames(cls.sidebarWrapper, {
						[cls.sidebarWrapper_closed]: !isSidebarOpen,
					})}
				>
					<Sidebar className={cls.sidebar} />
				</div>

				<div className={cls.main}>
					<main className={cls.main__pages}>
						<Outlet />
					</main>

					<div
						className={classNames(cls.profileSlot, {
							[cls.profileSlot_open]: isProfileOpen,
						})}
					>
						<ProfilePanel onClose={closeProfile} />
					</div>
				</div>
			</div>
		</div>
	);
});

DashboardLayout.displayName = 'DashboardLayout';
