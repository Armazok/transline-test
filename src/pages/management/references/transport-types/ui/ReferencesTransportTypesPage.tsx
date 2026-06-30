import { memo } from 'react';

import { useTranslation } from 'react-i18next';

import { Heading, HEADING_VARIANT } from '@/shared/ui';

import cls from './ReferencesTransportTypesPage.module.scss';

export const ReferencesTransportTypesPage = memo(() => {
	const { t } = useTranslation('referencesTransportTypes');

	return (
		<section className={cls.ReferencesTransportTypesPage}>
			<Heading variant={HEADING_VARIANT.h2}>{t('title')}</Heading>
		</section>
	);
});

ReferencesTransportTypesPage.displayName = 'ReferencesTransportTypesPage';
