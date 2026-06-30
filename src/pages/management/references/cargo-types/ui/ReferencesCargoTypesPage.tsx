import { memo } from 'react';

import { useTranslation } from 'react-i18next';

import { Heading, HEADING_VARIANT } from '@/shared/ui';

import cls from './ReferencesCargoTypesPage.module.scss';

export const ReferencesCargoTypesPage = memo(() => {
	const { t } = useTranslation('referencesCargoTypes');

	return (
		<section className={cls.ReferencesCargoTypesPage}>
			<Heading variant={HEADING_VARIANT.h2}>{t('title')}</Heading>
		</section>
	);
});

ReferencesCargoTypesPage.displayName = 'ReferencesCargoTypesPage';
