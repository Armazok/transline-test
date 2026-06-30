import { memo } from 'react';

import { useTranslation } from 'react-i18next';

import { Heading, HEADING_VARIANT } from '@/shared/ui';

import cls from './ManagersPage.module.scss';

export const ManagersPage = memo(() => {
	const { t } = useTranslation('managers');

	return (
		<section className={cls.ManagersPage}>
			<Heading variant={HEADING_VARIANT.h2}>{t('title')}</Heading>
		</section>
	);
});

ManagersPage.displayName = 'ManagersPage';
