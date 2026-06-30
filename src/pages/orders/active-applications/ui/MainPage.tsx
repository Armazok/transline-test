import { memo } from 'react';

import { useTranslation } from 'react-i18next';

import { Heading, HEADING_VARIANT } from '@/shared/ui';

import cls from './MainPage.module.scss';

export const MainPage = memo(() => {
	const { t } = useTranslation('main');

	return (
		<section className={cls.MainPage}>
			<Heading variant={HEADING_VARIANT.h2}>{t('title')}</Heading>
		</section>
	);
});

MainPage.displayName = 'MainPage';
