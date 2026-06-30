import { memo } from 'react';

import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import { Paragraph, PARAGRAPH_VARIANT } from '@/shared/ui';

import { NavItem } from './NavItem';
import { NAV_GROUPS } from '../model/config/nav-config';

import cls from './Sidebar.module.scss';

// Фильтрация статичного массива вынесена на уровень модуля — выполняется один раз
const TOP_GROUPS = NAV_GROUPS.filter((g) => !g.pinned);
const BOTTOM_GROUPS = NAV_GROUPS.filter((g) => g.pinned);

interface SidebarProps {
	className?: string;
}

export const Sidebar = memo(({ className }: SidebarProps) => {
	const { t } = useTranslation('dashboard');

	const renderGroup = (group: (typeof NAV_GROUPS)[number]) => (
		<div key={group.title} className={cls.Sidebar__group}>
			<Paragraph variant={PARAGRAPH_VARIANT.text_1} className={cls.Sidebar__groupTitle}>
				{t(group.title)}
			</Paragraph>
			{group.items.map((item) =>
				item.children ? (
					<NavItem
						key={item.label}
						icon={item.icon}
						label={t(item.label)}
						children={item.children.map((child) => ({ ...child, label: t(child.label) }))}
					/>
				) : (
					<NavItem
						key={item.label}
						to={item.to}
						icon={item.icon}
						label={t(item.label)}
						end={item.end}
					/>
				),
			)}
		</div>
	);

	return (
		<aside className={classNames(cls.Sidebar, className)}>
			<nav className={cls.Sidebar__nav}>
				<div className={cls.Sidebar__navTop}>{TOP_GROUPS.map(renderGroup)}</div>
				<div className={cls.Sidebar__navBottom}>{BOTTOM_GROUPS.map(renderGroup)}</div>
			</nav>
		</aside>
	);
});

Sidebar.displayName = 'Sidebar';
