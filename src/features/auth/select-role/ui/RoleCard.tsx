import { memo, type ReactNode } from 'react';

import classNames from 'classnames';

import { Button, BUTTON_VARIANT, Paragraph, PARAGRAPH_VARIANT } from '@/shared/ui';

import cls from './RoleCard.module.scss';

import type { UserRole } from '../model/types/types';


export interface RoleCardProps {
	role: UserRole;
	icon: ReactNode;
	title: string;
	description: string;
	illustration: ReactNode;
	selected: boolean;
	onSelect: (role: UserRole) => void;
}

export const RoleCard = memo(
	({ role, icon, title, description, illustration, selected, onSelect }: RoleCardProps) => (
		<Button
			variant={BUTTON_VARIANT.CLEAR}
			type="button"
			className={classNames(cls.RoleCard, { [cls.RoleCard_selected]: selected })}
			onClick={() => onSelect(role)}
		>
			<div className={cls.RoleCard__content}>
				<div className={cls.RoleCard__icon}>{icon}</div>
				<Paragraph variant={PARAGRAPH_VARIANT.text_1} className={cls.RoleCard__title}>
					{title}
				</Paragraph>
				<Paragraph variant={PARAGRAPH_VARIANT.text_1} className={cls.RoleCard__description}>
					{description}
				</Paragraph>
			</div>
			<div className={cls.RoleCard__illustration}>{illustration}</div>
		</Button>
	),
);

RoleCard.displayName = 'RoleCard';
