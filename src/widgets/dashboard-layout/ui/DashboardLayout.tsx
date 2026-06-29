import { memo } from 'react';

import { Outlet } from 'react-router-dom';

import { Sidebar } from '@/widgets/sidebar';

import cls from './DashboardLayout.module.scss';

export const DashboardLayout = memo(() => (
	<div className={cls.root}>
		<Sidebar className={cls.sidebar} />

		<div className={cls.body}>
			<main className={cls.main}>
				<Outlet />
			</main>
		</div>
	</div>
));

DashboardLayout.displayName = 'DashboardLayout';
