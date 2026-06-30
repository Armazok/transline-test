import { memo, useCallback, useEffect, useMemo } from 'react';

import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { Sidebar } from '@/widgets/sidebar';

import { clearRegProgress } from '@/features/auth/register';
import { ProfilePanel } from '@/features/user/edit-profile';

import { useUser } from '@/entities/user';

import { ROUTER_PATH } from '@/shared/config';
import { useToast } from '@/shared/hooks';
import { removeAccessToken } from '@/shared/lib';

import { DashboardHeader } from './DashboardHeader';
import { useDashboardLayout } from '../model/hooks/useDashboardLayout';
import { type UserMenuAction } from '../model/types/types';

import cls from './DashboardLayout.module.scss';

export const DashboardLayout = memo(() => {
	const navigate = useNavigate();
	const location = useLocation();
	const { t } = useTranslation('dashboard');
	const toast = useToast();
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
				toast.info(t('header.toast.loggedOut'));
				navigate(ROUTER_PATH.auth.register, { replace: true });
			}
		},
		[openProfile, clearProfile, navigate, toast, t],
	);

	const activeActions = useMemo<ReadonlySet<UserMenuAction>>(
		// eslint-disable-next-line i18next/no-literal-string
		() => new Set(isProfileOpen ? (['editProfile'] as UserMenuAction[]) : []),
		[isProfileOpen],
	);

	return (
		<div className={cls.DashboardLayout}>
			<DashboardHeader
				onToggleSidebar={toggleSidebar}
				onMenuAction={handleMenuAction}
				activeMenuActions={activeActions}
			/>

			<div className={cls.DashboardLayout__body}>
				{isSidebarOpen && <div className={cls.DashboardLayout__backdrop} onClick={closeSidebar} />}

				<div
					className={classNames(cls.DashboardLayout__sidebarWrapper, {
						[cls.DashboardLayout__sidebarWrapper_closed]: !isSidebarOpen,
					})}
				>
					<Sidebar className={cls.DashboardLayout__sidebar} />
				</div>

				<div className={cls.DashboardLayout__main}>
					<main className={cls.DashboardLayout__pages}>
						<Outlet />
					</main>

					<div
						className={classNames(cls.DashboardLayout__profileSlot, {
							[cls.DashboardLayout__profileSlot_open]: isProfileOpen,
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
