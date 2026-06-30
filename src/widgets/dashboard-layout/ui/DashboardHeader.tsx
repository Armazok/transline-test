import { memo } from 'react';

import { useTranslation } from 'react-i18next';

import { LangSwitcher } from '@/features/lang';
import { ThemeToggle } from '@/features/theme';

import IconMenuIcon from '@/shared/assets/icons/ui/icon-menu.svg?react';
import { Button, BUTTON_VARIANT } from '@/shared/ui';

import { UserMenu } from './UserMenu';
import { type UserMenuAction } from '../model/types/types';

import cls from './DashboardHeader.module.scss';

interface DashboardHeaderProps {
	onToggleSidebar: () => void;
	onMenuAction: (action: UserMenuAction) => void;
	activeMenuActions: ReadonlySet<UserMenuAction>;
}

export const DashboardHeader = memo(
	({ onToggleSidebar, onMenuAction, activeMenuActions }: DashboardHeaderProps) => {
		const { t } = useTranslation('dashboard');

		return (
			<header className={cls.DashboardHeader}>
				<div className={cls.DashboardHeader__left}>
					<Button
						variant={BUTTON_VARIANT.ICON}
						className={cls.DashboardHeader__menuBtn}
						onClick={onToggleSidebar}
						aria-label="Menu"
					>
						<IconMenuIcon />
					</Button>
					<span className={cls.DashboardHeader__brand}>{t('brand')}</span>
				</div>

				<div className={cls.DashboardHeader__right}>
					<LangSwitcher />
					<ThemeToggle />
					<UserMenu onAction={onMenuAction} activeActions={activeMenuActions} />
				</div>
			</header>
		);
	},
);

DashboardHeader.displayName = 'DashboardHeader';
