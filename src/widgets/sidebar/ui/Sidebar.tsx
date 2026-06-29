import { memo } from 'react';

import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import { ROUTER_PATH } from '@/shared/config';

import cls from './Sidebar.module.scss';

const IconOrders = () => (
	<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
		<rect x="3" y="2" width="14" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
		<line x1="7" y1="7" x2="13" y2="7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
		<line x1="7" y1="10" x2="13" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
		<line x1="7" y1="13" x2="11" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
	</svg>
);

const IconArchive = () => (
	<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
		<rect x="1" y="4" width="18" height="4" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
		<rect x="2" y="8" width="16" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
		<line x1="8" y1="12" x2="12" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
	</svg>
);

const IconPerson = () => (
	<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
		<circle cx="10" cy="6" r="4" stroke="currentColor" strokeWidth="1.5" />
		<path d="M3 18c0-3.866 3.134-7 7-7s7 3.134 7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
	</svg>
);

const IconPersons = () => (
	<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
		<circle cx="7" cy="6" r="3" stroke="currentColor" strokeWidth="1.5" />
		<path d="M1 18c0-3.314 2.686-6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
		<circle cx="13" cy="6" r="3" stroke="currentColor" strokeWidth="1.5" />
		<path d="M13 12c3.314 0 6 2.686 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
		<line x1="7" y1="18" x2="13" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
	</svg>
);

const IconTruck = () => (
	<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
		<rect x="1" y="7" width="12" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
		<path d="M13 10h4l2 3.5V15h-6V10z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
		<circle cx="5" cy="15" r="2" stroke="currentColor" strokeWidth="1.5" />
		<circle cx="16" cy="15" r="2" stroke="currentColor" strokeWidth="1.5" />
	</svg>
);

const IconBook = () => (
	<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
		<path d="M3 4h6a3 3 0 013 3v10a2 2 0 00-2-2H3V4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
		<path d="M17 4h-5a3 3 0 00-3 3v10a2 2 0 012-2h6V4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
	</svg>
);

const IconManager = () => (
	<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
		<circle cx="10" cy="5" r="3" stroke="currentColor" strokeWidth="1.5" />
		<path d="M4 16c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
		<line x1="2" y1="18" x2="18" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
	</svg>
);

const IconMenu = () => (
	<svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
		<line x1="3" y1="6" x2="19" y2="6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
		<line x1="3" y1="11" x2="19" y2="11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
		<line x1="3" y1="16" x2="19" y2="16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
	</svg>
);

interface NavItemProps {
	to: string;
	icon: React.ReactNode;
	label: string;
	end?: boolean;
}

const NavItem = ({ to, icon, label, end }: NavItemProps) => (
	<NavLink
		to={to}
		end={end}
		className={({ isActive }) =>
			classNames(cls.NavItem, { [cls.NavItem_active]: isActive })
		}
	>
		<span className={cls.NavItem__icon}>{icon}</span>
		<span className={cls.NavItem__label}>{label}</span>
	</NavLink>
);

interface SidebarProps {
	className?: string;
}

export const Sidebar = memo(({ className }: SidebarProps) => {
	const { t } = useTranslation('dashboard');

	return (
		<aside className={classNames(cls.Sidebar, className)}>
			<div className={cls.Sidebar__header}>
				<button type="button" className={cls.Sidebar__menuBtn} aria-label="Menu">
					<IconMenu />
				</button>
				<span className={cls.Sidebar__logo}>{t('brand')}</span>
			</div>

			<nav className={cls.Sidebar__nav}>
				<div className={cls.Sidebar__group}>
					<p className={cls.Sidebar__groupTitle}>{t('nav.orders.title')}</p>
					<NavItem to={ROUTER_PATH.dashboard.main} icon={<IconOrders />} label={t('nav.orders.active')} end />
					<NavItem to="#" icon={<IconArchive />} label={t('nav.orders.archived')} />
				</div>

				<div className={cls.Sidebar__group}>
					<p className={cls.Sidebar__groupTitle}>{t('nav.contractors.title')}</p>
					<NavItem to="#" icon={<IconPerson />} label={t('nav.contractors.customers')} />
					<NavItem to="#" icon={<IconPersons />} label={t('nav.contractors.carriers')} />
				</div>

				<div className={cls.Sidebar__group}>
					<p className={cls.Sidebar__groupTitle}>{t('nav.fleet.title')}</p>
					<NavItem to="#" icon={<IconTruck />} label={t('nav.fleet.transport')} />
				</div>

				<div className={cls.Sidebar__group}>
					<p className={cls.Sidebar__groupTitle}>{t('nav.management.title')}</p>
					<NavItem to="#" icon={<IconBook />} label={t('nav.management.references')} />
					<NavItem to="#" icon={<IconManager />} label={t('nav.management.managers')} />
				</div>
			</nav>
		</aside>
	);
});

Sidebar.displayName = 'Sidebar';
