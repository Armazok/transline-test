import { memo, useCallback } from 'react';

import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { useUser } from '@/entities/user';

import { ROUTER_PATH } from '@/shared/config';
import { removeAccessToken } from '@/shared/lib';
import { Button, BUTTON_VARIANT, Input } from '@/shared/ui';

import { useEditProfile } from '../model/useEditProfile';

import cls from './ProfilePanel.module.scss';

interface ProfilePanelProps {
	className?: string;
}

interface FieldRowProps {
	label: string;
	value: string;
}

const FieldRow = ({ label, value }: FieldRowProps) => (
	<div className={cls.ProfilePanel__row}>
		<span className={cls.ProfilePanel__label}>{label}</span>
		<span className={cls.ProfilePanel__value}>{value}</span>
	</div>
);

export const ProfilePanel = memo(({ className }: ProfilePanelProps) => {
	const { t } = useTranslation('profile');
	const navigate = useNavigate();
	const { clearProfile } = useUser();
	const { profile, isEditing, draft, startEdit, cancelEdit, handleDraftChange, saveEdit } =
		useEditProfile();

	const handleLogout = useCallback(() => {
		clearProfile();
		removeAccessToken();
		navigate(ROUTER_PATH.auth.register, { replace: true });
	}, [clearProfile, navigate]);

	if (!profile) return null;

	const roleLabel =
		profile.role === 'carrier' ? t('ProfilePage.roles.carrier') : t('ProfilePage.roles.customer');

	return (
		<div className={classNames(cls.ProfilePanel, className)}>
			<div className={cls.ProfilePanel__body}>
				{isEditing ? (
					<>
						<div className={cls.ProfilePanel__editRow}>
							<span className={cls.ProfilePanel__label}>{t('ProfilePage.fields.lastName')}</span>
							<Input
								name="lastName"
								value={draft.lastName}
								onChange={handleDraftChange}
								wrapperClassName={cls.ProfilePanel__editInput}
							/>
						</div>
						<div className={cls.ProfilePanel__editRow}>
							<span className={cls.ProfilePanel__label}>{t('ProfilePage.fields.firstName')}</span>
							<Input
								name="firstName"
								value={draft.firstName}
								onChange={handleDraftChange}
								wrapperClassName={cls.ProfilePanel__editInput}
							/>
						</div>
						<div className={cls.ProfilePanel__editRow}>
							<span className={cls.ProfilePanel__label}>{t('ProfilePage.fields.email')}</span>
							<Input
								name="email"
								 
								type="email"
								value={draft.email}
								onChange={handleDraftChange}
								wrapperClassName={cls.ProfilePanel__editInput}
							/>
						</div>
						<FieldRow label={t('ProfilePage.fields.phone')} value={profile.phone} />
						<FieldRow label={t('ProfilePage.fields.role')} value={roleLabel} />
						{profile.middleName && (
							<FieldRow label={t('ProfilePage.fields.middleName')} value={profile.middleName} />
						)}
						<FieldRow label={t('ProfilePage.fields.taxId')} value={profile.taxId} />
					</>
				) : (
					<>
						<FieldRow label={t('ProfilePage.fields.lastName')} value={profile.lastName} />
						<FieldRow label={t('ProfilePage.fields.firstName')} value={profile.firstName} />
						{profile.middleName && (
							<FieldRow label={t('ProfilePage.fields.middleName')} value={profile.middleName} />
						)}
						<FieldRow label={t('ProfilePage.fields.email')} value={profile.email} />
						<FieldRow label={t('ProfilePage.fields.phone')} value={profile.phone} />
						<FieldRow label={t('ProfilePage.fields.role')} value={roleLabel} />
						<FieldRow label={t('ProfilePage.fields.taxId')} value={profile.taxId} />
					</>
				)}
			</div>

			<div className={cls.ProfilePanel__actions}>
				{isEditing ? (
					<>
						<Button onClick={saveEdit}>{t('ProfilePage.saveBtn')}</Button>
						<Button variant={BUTTON_VARIANT.CLEAR} onClick={cancelEdit}>
							{t('ProfilePage.cancelBtn')}
						</Button>
					</>
				) : (
					<>
						<Button onClick={startEdit}>{t('ProfilePage.editBtn')}</Button>
						<Button variant={BUTTON_VARIANT.CLEAR} onClick={handleLogout}>
							{t('ProfilePage.logoutBtn')}
						</Button>
					</>
				)}
			</div>
		</div>
	);
});

ProfilePanel.displayName = 'ProfilePanel';
