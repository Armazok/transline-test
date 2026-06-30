import { memo } from 'react';

import { useTranslation } from 'react-i18next';

import { Heading, HEADING_VARIANT } from '@/shared/ui';

import cls from './TransportPage.module.scss';

export const TransportPage = memo(() => {
	const { t } = useTranslation('transport');

	return (
		<section className={cls.TransportPage}>
			<Heading variant={HEADING_VARIANT.h2}>{t('title')}</Heading>
		</section>
	);
});

TransportPage.displayName = 'TransportPage';
