import { memo } from 'react';

import { useTranslation } from 'react-i18next';

import ChevronDownIcon from '@/shared/assets/icons/ui/chevron-down.svg?react';
import { Button, BUTTON_VARIANT, Input, INPUT_VARIANT } from '@/shared/ui';

import { PROFILE_FIELDS } from '../model/config/profile-fields-config';
import { type ProfileFormFields, useEditProfile } from '../model/hooks/useEditProfile';

import cls from './ProfilePanel.module.scss';

interface ProfilePanelProps {
	onClose: () => void;
}

export const ProfilePanel = memo(({ onClose }: ProfilePanelProps) => {
	const { t } = useTranslation('profile');
	const { profile, fields, watch, clearField, getFieldError, isDirty, handleClose, onSubmit } = useEditProfile();

	if (!profile) return null;

	return (
		<form className={cls.ProfilePanel} onSubmit={onSubmit} noValidate>
			<div className={cls.ProfilePanel__header}>
				<Button
					variant={BUTTON_VARIANT.CLEAR}
					type="submit"
					className={cls.ProfilePanel__saveBtn}
					disabled={!isDirty}
					isDisabled={!isDirty}
				>
					{t('ProfilePage.saveBtn').toLowerCase()}
				</Button>
				<Button
					variant={BUTTON_VARIANT.CLEAR}
					type="button"
					className={cls.ProfilePanel__closeBtn}
					onClick={() => handleClose(onClose)}
					aria-label={t('ProfilePage.closeBtn')}
				>
					<ChevronDownIcon className={cls.ProfilePanel__closeIcon} />
				</Button>
			</div>

			<div className={cls.ProfilePanel__body}>
				{PROFILE_FIELDS.map(({ name, label, readonly }) => {
					const rhfName = name as keyof ProfileFormFields;
					const fieldLabel =
						name === 'taxId'
							? // eslint-disable-next-line @typescript-eslint/no-explicit-any
								t((`ProfilePage.fields.${profile.role === 'customer' ? 'bin' : 'iin'}`) as any)
							: t(label);
					return (
						<div key={name} className={cls.ProfilePanel__row}>
							<span className={cls.ProfilePanel__label}>{fieldLabel}</span>
							<div className={cls.ProfilePanel__valueCell}>
								{readonly ? (
									<span className={cls.ProfilePanel__readonlyValue}>
										{name === 'role'
											? // eslint-disable-next-line @typescript-eslint/no-explicit-any
												t(`ProfilePage.roles.${profile.role}` as any)
											: String(profile[name])}
									</span>
								) : (
									<>
										<Input
											variant={INPUT_VARIANT.GHOST}
											wrapperClassName={cls.ProfilePanel__inputWrapper}
											className={cls.ProfilePanel__input}
											{...fields[rhfName]}
											error={getFieldError(rhfName)}
										/>
										{watch(rhfName) && (
											<Button
												variant={BUTTON_VARIANT.CLEAR}
												type="button"
												className={cls.ProfilePanel__clearBtn}
												onClick={() => clearField(rhfName)}
												aria-label={t('ProfilePage.clearField')}
											>
												×
											</Button>
										)}
									</>
								)}
							</div>
						</div>
					);
				})}
			</div>
		</form>
	);
});

ProfilePanel.displayName = 'ProfilePanel';
