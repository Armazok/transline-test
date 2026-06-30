import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { ROUTER_PATH } from '@/shared/config';
import { Button, Heading, HEADING_VARIANT, Paragraph, PARAGRAPH_VARIANT } from '@/shared/ui';

import cls from './PageError500.module.scss';

export const PageError500 = () => {
	const { t } = useTranslation('error');
	const navigate = useNavigate();

	return (
		<div className={cls.PageError}>
			<div className={cls.PageError__inner}>
				<span className={cls.PageError__code}>{t('Error500.code')}</span>

				<Heading variant={HEADING_VARIANT.h2} className={cls.PageError__title}>
					{t('Error500.title')}
				</Heading>

				<Paragraph variant={PARAGRAPH_VARIANT.text_1} className={cls.PageError__desc}>
					{t('Error500.desc')}
				</Paragraph>

				<Button onClick={() => navigate(ROUTER_PATH.dashboard.orders.activeApplications)}>
					{t('Error500.backBtn')}
				</Button>
			</div>
		</div>
	);
};

PageError500.displayName = 'PageError500';
