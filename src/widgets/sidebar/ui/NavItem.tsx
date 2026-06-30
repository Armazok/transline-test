import { memo, useState } from 'react';

import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

import ChevronDownIcon from '@/shared/assets/icons/ui/chevron-down.svg?react';
import { Button, BUTTON_VARIANT } from '@/shared/ui';

import cls from './Sidebar.module.scss';

import type { SvgIcon } from '../model/types/types';

interface NavItemChild {
	to: string;
	label: string;
}

type NavItemProps =
	| {
			to: string;
			icon: SvgIcon;
			label: string;
			end?: boolean;
			children?: never;
	  }
	| {
			icon: SvgIcon;
			label: string;
			children: NavItemChild[];
	  };

export const NavItem = memo((props: NavItemProps) => {
	const [open, setOpen] = useState(false);

	if (props.children) {
		const { icon: Icon, label, children } = props;
		return (
			<div className={cls.NavItemGroup}>
				<Button
					variant={BUTTON_VARIANT.CLEAR}
					type="button"
					className={cls.NavItem}
					onClick={() => setOpen((p) => !p)}
				>
					<span className={cls.NavItem__icon}>
						<Icon />
					</span>
					<span className={cls.NavItem__label}>{label}</span>
					<ChevronDownIcon
						className={classNames(cls.chevron, { [cls.chevron_up]: open })}
					/>
				</Button>

				<div
					className={classNames(cls.NavItemGroup__children, {
						[cls.NavItemGroup__children_open]: open,
					})}
				>
					<div className={cls.NavItemGroup__inner}>
						{children.map((child) => (
							<NavLink
								key={child.to}
								to={child.to}
								className={({ isActive }) =>
									classNames(cls.NavItem, cls.NavItem_child, {
										[cls.NavItem_active]: isActive,
									})
								}
							>
								<span className={cls.NavItem__label}>{child.label}</span>
							</NavLink>
						))}
					</div>
				</div>
			</div>
		);
	}

	const { to, icon: Icon, label, end } = props;
	return (
		<NavLink
			to={to}
			end={end}
			className={({ isActive }) =>
				classNames(cls.NavItem, { [cls.NavItem_active]: isActive })
			}
		>
			<span className={cls.NavItem__icon}>
				<Icon />
			</span>
			<span className={cls.NavItem__label}>{label}</span>
		</NavLink>
	);
});

NavItem.displayName = 'NavItem';
