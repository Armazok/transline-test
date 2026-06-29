import { memo } from 'react';

import { useTranslation } from 'react-i18next';

import { ProfilePanelWidget } from '@/widgets/profile-panel';

import { Heading, HEADING_VARIANT } from '@/shared/ui';

import cls from './ProfilePage.module.scss';

export const ProfilePage = memo(() => {
	const { t } = useTranslation('profile');

	return (
		<div className={cls.ProfilePage}>
			<Heading variant={HEADING_VARIANT.h2} className={cls.ProfilePage__title}>
				{t('ProfilePage.title')}
			</Heading>
			<ProfilePanelWidget />
		</div>
	);
});

ProfilePage.displayName = 'ProfilePage';
