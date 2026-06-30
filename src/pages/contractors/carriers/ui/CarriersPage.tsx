import { memo } from 'react';

import { useTranslation } from 'react-i18next';

import { Heading, HEADING_VARIANT } from '@/shared/ui';

import cls from './CarriersPage.module.scss';

export const CarriersPage = memo(() => {
	const { t } = useTranslation('carriers');

	return (
		<section className={cls.CarriersPage}>
			<Heading variant={HEADING_VARIANT.h2}>{t('title')}</Heading>
		</section>
	);
});

CarriersPage.displayName = 'CarriersPage';
