import { RegisterPanelWidget } from '@/widgets/register-panel';

import cls from './RegisterPage.module.scss';

export const RegisterPage = () => (
	<section className={cls.RegisterPage}>
		<RegisterPanelWidget />
	</section>
);

RegisterPage.displayName = 'RegisterPage';
