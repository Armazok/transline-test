import { memo, type ReactNode } from 'react';

import classNames from 'classnames';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Button, Heading, HEADING_VARIANT, Paragraph, PARAGRAPH_VARIANT } from '@/shared/ui';


import {
	BriefcaseIcon,
	CarrierIllustration,
	CustomerIllustration,
	TruckIcon,
} from './role-illustrations';
import { RoleCard } from './RoleCard';
import { ROLE_CARDS } from '../model/config/role-cards-config';
import { useSelectRole } from '../model/hooks/useSelectRole';

import cls from './SelectRoleForm.module.scss';

import type { UserRole } from '../model/types/types';

const ROLE_ICONS: Record<UserRole, ReactNode> = {
	customer: <BriefcaseIcon />,
	carrier: <TruckIcon />,
};

const ROLE_ILLUSTRATIONS: Record<UserRole, ReactNode> = {
	customer: <CustomerIllustration />,
	carrier: <CarrierIllustration />,
};

interface SelectRoleFormProps {
	onSuccess?: (role: UserRole) => void;
	className?: string;
}

export const SelectRoleForm = memo(({ onSuccess, className }: SelectRoleFormProps) => {
	const { t } = useTranslation('register');
	const { control, role, onSubmit } = useSelectRole({ onSuccess });

	return (
		<form className={classNames(cls.SelectRoleForm, className)} onSubmit={onSubmit}>
			<div className={cls.SelectRoleForm__header}>
				<Heading variant={HEADING_VARIANT.h3} className={cls.SelectRoleForm__title}>
					{t('SelectRoleForm.title')}
				</Heading>
				<Paragraph variant={PARAGRAPH_VARIANT.text_1}>
					{t('SelectRoleForm.subtitle')}
				</Paragraph>
			</div>

			<Controller
				name="role"
				control={control}
				rules={{ required: true }}
				render={({ field: { onChange } }) => (
					<div className={cls.SelectRoleForm__cards}>
						{ROLE_CARDS.map(({ role: cardRole, titleKey, descriptionKey }) => {
							// eslint-disable-next-line @typescript-eslint/no-explicit-any
							const title = t(titleKey as any) as string;
							// eslint-disable-next-line @typescript-eslint/no-explicit-any
							const description = t(descriptionKey as any) as string;
							return (
								<RoleCard
									key={cardRole}
									role={cardRole}
									icon={ROLE_ICONS[cardRole]}
									title={title}
									description={description}
									illustration={ROLE_ILLUSTRATIONS[cardRole]}
									selected={role === cardRole}
									onSelect={onChange}
								/>
							);
						})}
					</div>
				)}
			/>

			<Button
				type="submit"
				disabled={role === null}
				isDisabled={role === null}
				className={cls.SelectRoleForm__submit}
			>
				{t('SelectRoleForm.submit')}
			</Button>
		</form>
	);
});

SelectRoleForm.displayName = 'SelectRoleForm';
