import { memo } from 'react';

import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import { Button, Heading, HEADING_VARIANT, Paragraph, PARAGRAPH_VARIANT } from '@/shared/ui';

import { type UserRole } from '../model/types';
import { useSelectRole } from '../model/useSelectRole';

import cls from './SelectRoleForm.module.scss';

const BriefcaseIcon = () => (
	<svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
		<path
			d="M12 12V10a3 3 0 013-3h6a3 3 0 013 3v2"
			stroke="#05C0E6"
			strokeWidth="1.8"
			strokeLinecap="round"
		/>
		<rect x="4" y="12" width="28" height="19" rx="3.5" stroke="#05C0E6" strokeWidth="1.8" />
		<line x1="4" y1="22" x2="32" y2="22" stroke="#05C0E6" strokeWidth="1.5" />
		<rect x="14" y="20" width="8" height="4" rx="1.5" stroke="#05C0E6" strokeWidth="1.5" />
	</svg>
);

const TruckIcon = () => (
	<svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
		<rect x="2" y="11" width="20" height="15" rx="2.5" stroke="#05C0E6" strokeWidth="1.8" />
		<path d="M22 15h7l5 6v5H22V15z" stroke="#05C0E6" strokeWidth="1.8" strokeLinejoin="round" />
		<circle cx="9" cy="26" r="4" stroke="#05C0E6" strokeWidth="1.8" fill="white" />
		<circle cx="28" cy="26" r="4" stroke="#05C0E6" strokeWidth="1.8" fill="white" />
	</svg>
);

const CustomerIllustration = () => (
	<svg
		width="118"
		height="92"
		viewBox="0 0 118 92"
		fill="none"
		aria-hidden="true"
		xmlns="http://www.w3.org/2000/svg"
	>
		{/* Truck at top-right */}
		<rect x="52" y="4" width="52" height="26" rx="3.5" stroke="#05C0E6" strokeWidth="1.6" fill="white" />
		<path
			d="M86 4 L96 4 Q104 4 104 12 L104 30 L86 30 Z"
			stroke="#05C0E6"
			strokeWidth="1.6"
			fill="white"
			strokeLinejoin="round"
		/>
		<path
			d="M88 7 L101 7 Q103 7 103 9 L103 20 L88 20 Z"
			fill="rgba(5,192,230,0.15)"
		/>
		<circle cx="64" cy="30" r="5" stroke="#05C0E6" strokeWidth="1.6" fill="white" />
		<circle cx="92" cy="30" r="5" stroke="#05C0E6" strokeWidth="1.6" fill="white" />

		{/* Route curve */}
		<circle cx="88" cy="38" r="3.5" fill="#05C0E6" />
		<path
			d="M88 38 C 88 52 30 52 30 66"
			stroke="#05C0E6"
			strokeWidth="1.6"
			strokeDasharray="4 3.5"
			strokeLinecap="round"
			fill="none"
		/>
		<circle cx="30" cy="66" r="3.5" fill="#05C0E6" />

		{/* Download icon at bottom-left */}
		<rect x="4" y="68" width="28" height="20" rx="3" stroke="#05C0E6" strokeWidth="1.6" fill="white" />
		<line x1="18" y1="60" x2="18" y2="72" stroke="#05C0E6" strokeWidth="1.6" strokeLinecap="round" />
		<polyline
			points="13,68 18,73 23,68"
			stroke="#05C0E6"
			strokeWidth="1.6"
			strokeLinecap="round"
			strokeLinejoin="round"
			fill="none"
		/>
	</svg>
);

const CarrierIllustration = () => (
	<svg
		width="118"
		height="80"
		viewBox="0 0 118 80"
		fill="none"
		aria-hidden="true"
		xmlns="http://www.w3.org/2000/svg"
	>
		{/* Vertical connector */}
		<line x1="22" y1="28" x2="22" y2="52" stroke="#D0D0D0" strokeWidth="1.5" />

		{/* Top radio button (selected) */}
		<circle cx="22" cy="22" r="10" stroke="#05C0E6" strokeWidth="2" fill="white" />
		<circle cx="22" cy="22" r="5" fill="#05C0E6" />

		{/* Bottom radio button (selected) */}
		<circle cx="22" cy="58" r="10" stroke="#05C0E6" strokeWidth="2" fill="white" />
		<circle cx="22" cy="58" r="5" fill="#05C0E6" />

		{/* Top row lines (cyan) */}
		<rect x="42" y="15" width="70" height="7" rx="3.5" fill="#05C0E6" />
		<rect x="42" y="27" width="52" height="5" rx="2.5" fill="rgba(5,192,230,0.5)" />

		{/* Bottom row lines (grey) */}
		<rect x="42" y="51" width="70" height="7" rx="3.5" fill="#D8D8D8" />
		<rect x="42" y="63" width="42" height="5" rx="2.5" fill="#E8E8E8" />
	</svg>
);

interface RoleCardProps {
	role: UserRole;
	icon: React.ReactNode;
	title: string;
	description: string;
	illustration: React.ReactNode;
	selected: boolean;
	onSelect: (role: UserRole) => void;
}

const RoleCard = memo(
	({ role, icon, title, description, illustration, selected, onSelect }: RoleCardProps) => (
		<button
			type="button"
			className={classNames(cls.RoleCard, { [cls.RoleCard_selected]: selected })}
			onClick={() => onSelect(role)}
		>
			<div className={cls.RoleCard__content}>
				<div className={cls.RoleCard__icon}>{icon}</div>
				<p className={cls.RoleCard__title}>{title}</p>
				<p className={cls.RoleCard__description}>{description}</p>
			</div>
			<div className={cls.RoleCard__illustration}>{illustration}</div>
		</button>
	),
);

RoleCard.displayName = 'RoleCard';

interface SelectRoleFormProps {
	onSuccess?: (role: UserRole) => void;
	className?: string;
}

export const SelectRoleForm = memo(({ onSuccess, className }: SelectRoleFormProps) => {
	const { t } = useTranslation('register');
	const { role, handleSelect, handleSubmit } = useSelectRole({ onSuccess });

	return (
		<div className={classNames(cls.SelectRoleForm, className)}>
			<div className={cls.SelectRoleForm__header}>
				<Heading variant={HEADING_VARIANT.h3} className={cls.SelectRoleForm__title}>
					{t('SelectRoleForm.title')}
				</Heading>
				<Paragraph variant={PARAGRAPH_VARIANT.text_1}>
					{t('SelectRoleForm.subtitle')}
				</Paragraph>
			</div>

			<div className={cls.SelectRoleForm__cards}>
				<RoleCard
					role="customer"
					icon={<BriefcaseIcon />}
					title={t('SelectRoleForm.customer.title')}
					description={t('SelectRoleForm.customer.description')}
					illustration={<CustomerIllustration />}
					selected={role === 'customer'}
					onSelect={handleSelect}
				/>
				<RoleCard
					role="carrier"
					icon={<TruckIcon />}
					title={t('SelectRoleForm.carrier.title')}
					description={t('SelectRoleForm.carrier.description')}
					illustration={<CarrierIllustration />}
					selected={role === 'carrier'}
					onSelect={handleSelect}
				/>
			</div>

			<Button
				disabled={role === null}
				isDisabled={role === null}
				className={cls.SelectRoleForm__submit}
				onClick={handleSubmit}
			>
				{t('SelectRoleForm.submit')}
			</Button>
		</div>
	);
});

SelectRoleForm.displayName = 'SelectRoleForm';
