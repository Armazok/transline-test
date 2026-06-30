import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { ROUTER_PATH } from '@/shared/config';
import { Button, Heading, HEADING_VARIANT, Paragraph, PARAGRAPH_VARIANT } from '@/shared/ui';

import cls from './PageError403.module.scss';

export const PageError403 = () => {
	const { t } = useTranslation('error');
	const navigate = useNavigate();

	return (
		<div className={cls.page}>
			<div className={cls.inner}>
				<span className={cls.code}>{t('Error403.code')}</span>

				<Heading variant={HEADING_VARIANT.h2} className={cls.title}>
					{t('Error403.title')}
				</Heading>

				<Paragraph variant={PARAGRAPH_VARIANT.text_1} className={cls.desc}>
					{t('Error403.desc')}
				</Paragraph>

				<Button onClick={() => navigate(ROUTER_PATH.dashboard.orders.activeApplications)}>
					{t('Error403.backBtn')}
				</Button>
			</div>
		</div>
	);
};

PageError403.displayName = 'PageError403';
