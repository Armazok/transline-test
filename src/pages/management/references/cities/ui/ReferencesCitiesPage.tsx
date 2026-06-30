import { memo } from 'react';

import { useTranslation } from 'react-i18next';

import { Heading, HEADING_VARIANT } from '@/shared/ui';

import cls from './ReferencesCitiesPage.module.scss';

export const ReferencesCitiesPage = memo(() => {
	const { t } = useTranslation('referencesCities');

	return (
		<section className={cls.ReferencesCitiesPage}>
			<Heading variant={HEADING_VARIANT.h2}>{t('title')}</Heading>
		</section>
	);
});

ReferencesCitiesPage.displayName = 'ReferencesCitiesPage';
