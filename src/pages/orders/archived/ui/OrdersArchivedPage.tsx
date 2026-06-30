import { memo } from 'react';

import { useTranslation } from 'react-i18next';

import { Heading, HEADING_VARIANT } from '@/shared/ui';

import cls from './OrdersArchivedPage.module.scss';

export const OrdersArchivedPage = memo(() => {
	const { t } = useTranslation('ordersArchived');

	return (
		<section className={cls.OrdersArchivedPage}>
			<Heading variant={HEADING_VARIANT.h2}>{t('title')}</Heading>
		</section>
	);
});

OrdersArchivedPage.displayName = 'OrdersArchivedPage';
