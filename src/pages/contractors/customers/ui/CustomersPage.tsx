import { memo } from 'react';

import { useTranslation } from 'react-i18next';

import { Heading, HEADING_VARIANT } from '@/shared/ui';

import cls from './CustomersPage.module.scss';

export const CustomersPage = memo(() => {
	const { t } = useTranslation('customers');
	return (
		<section className={cls.CustomersPage}>
			<Heading variant={HEADING_VARIANT.h2}>{t('title')}</Heading>
		</section>
	);
});

CustomersPage.displayName = 'CustomersPage';
