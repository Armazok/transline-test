import { memo, useCallback } from 'react';

import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import { useUser } from '@/entities/user';

import ChevronDownIcon from '@/shared/assets/icons/ui/chevron-down.svg?react';
import { Button, BUTTON_VARIANT } from '@/shared/ui';

import { USER_MENU_ITEMS } from '../model/config/user-menu-config';
import { useUserMenu } from '../model/hooks/useUserMenu';
import { type UserMenuAction, type UserMenuItemConfig } from '../model/types/types';

import cls from './UserMenu.module.scss';

interface UserMenuProps {
	onAction: (action: UserMenuAction) => void;
	activeActions: ReadonlySet<UserMenuAction>;
}

export const UserMenu = memo(({ onAction, activeActions }: UserMenuProps) => {
	const { t } = useTranslation('dashboard');
	const { profile } = useUser();
	const { isOpen, ref, toggle, close } = useUserMenu();

	const initial = profile ? (profile.firstName[0] ?? profile.lastName[0] ?? '') : '';

	const handleAction = useCallback(
		(action: UserMenuAction) => {
			onAction(action);
			close();
		},
		[onAction, close],
	);

	return (
		<div ref={ref} className={cls.UserMenu}>
			<Button
				variant={BUTTON_VARIANT.CLEAR}
				type="button"
				className={cls.UserMenu__trigger}
				onClick={toggle}
				aria-label={t('header.profile')}
			>
				<span className={cls.UserMenu__avatar}>{initial.toUpperCase()}</span>
				<ChevronDownIcon
					className={classNames(cls.UserMenu__chevron, {
						[cls.UserMenu__chevron_up]: isOpen,
					})}
				/>
			</Button>

			{isOpen && (
				<div className={cls.UserMenu__dropdown}>
					{USER_MENU_ITEMS.map((item, index) => {
						if ('divider' in item) {
							return <div key={`divider-${index}`} className={cls.UserMenu__divider} />;
						}
						const { action, label } = item as UserMenuItemConfig;
						const isActive = activeActions.has(action);
						return (
							<Button
								key={action}
								variant={BUTTON_VARIANT.CLEAR}
								type="button"
								className={classNames(cls.UserMenu__item, {
									[cls.UserMenu__item_active]: isActive,
								})}
								isDisabled={isActive}
								onClick={() => handleAction(action)}
							>
								{t(label)}
							</Button>
						);
					})}
				</div>
			)}
		</div>
	);
});

UserMenu.displayName = 'UserMenu';
