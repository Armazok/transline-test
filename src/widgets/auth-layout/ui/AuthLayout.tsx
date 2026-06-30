import { memo } from 'react';

import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router-dom';

import { LangSwitcher } from '@/features/lang';
import { ThemeToggle } from '@/features/theme';

import { Heading, HEADING_VARIANT } from '@/shared/ui';

import CarIcon from '../assets/car.svg?react';
import LogoIcon from '../assets/logo.svg?react';
import PlaceIcon from '../assets/place.svg?react';

import cls from './AuthLayout.module.scss';

export const AuthLayout = memo(() => {
	const { t } = useTranslation('register');

	return (
		<main className={cls.AuthLayout}>
			<div className={cls.AuthLayout__content}>
				<div className={cls.AuthLayout__welcomeWrapper}>
					<div className={cls.AuthLayout__welcomeInner}>
						<LogoIcon className={cls.AuthLayout__logo} />
						<Heading variant={HEADING_VARIANT.h1} className={cls.AuthLayout__title}>
							{t('AuthLayout.welcome')}
						</Heading>
					</div>
				</div>

				<div className={cls.AuthLayout__formWrapper}>
					<div className={cls.AuthLayout__controls}>
						<LangSwitcher />
						<ThemeToggle />
					</div>
					<Outlet />
				</div>

				<div className={cls.AuthLayout__footer}>
					<div className={cls.AuthLayout__footerVisuals}>
						<CarIcon className={cls.AuthLayout__footerCar} />
						<PlaceIcon className={cls.AuthLayout__footerPlace} />
					</div>
					<div className={cls.AuthLayout__footerLine}>
						<div className={cls.AuthLayout__footerLine_white} />
						<div className={cls.AuthLayout__footerLine_blue} />
					</div>
				</div>
			</div>
		</main>
	);
});

AuthLayout.displayName = 'AuthLayout';
