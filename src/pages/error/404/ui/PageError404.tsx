import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { ROUTER_PATH } from '@/shared/config';
import { Button, Heading, HEADING_VARIANT, Paragraph, PARAGRAPH_VARIANT } from '@/shared/ui';

import cls from './PageError404.module.scss';

export const PageError404 = () => {
	const { t } = useTranslation('error');
	const navigate = useNavigate();

	return (
		<div className={cls.page}>
			<div className={cls.inner}>
				<span className={cls.code}>{t('Error404.code')}</span>

				<Heading variant={HEADING_VARIANT.h2} className={cls.title}>
					{t('Error404.title')}
				</Heading>

				<Paragraph variant={PARAGRAPH_VARIANT.text_1} className={cls.desc}>
					{t('Error404.desc')}
				</Paragraph>

				<Button onClick={() => navigate(ROUTER_PATH.dashboard.orders.activeApplications)}>
					{t('Error404.backBtn')}
				</Button>
			</div>
		</div>
	);
};

PageError404.displayName = 'PageError404';
