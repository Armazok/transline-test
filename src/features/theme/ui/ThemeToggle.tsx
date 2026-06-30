import { memo } from 'react';

import classNames from 'classnames';

import MoonIcon from '@/shared/assets/icons/theme/moon.svg?react';
import SunIcon from '@/shared/assets/icons/theme/sun.svg?react';
import { Button, BUTTON_VARIANT } from '@/shared/ui';

import { useTheme } from '../model/hooks/useTheme';

import cls from './ThemeToggle.module.scss';

export const ThemeToggle = memo(() => {
	const { theme, toggleTheme } = useTheme();

	return (
		<Button
			variant={BUTTON_VARIANT.ICON}
			className={classNames({ [cls.ThemeToggle_dark]: theme === 'dark' })}
			onClick={toggleTheme}
			aria-label={theme === 'dark' ? 'Switch to light' : 'Switch to dark'}
		>
			{theme === 'dark' ? <SunIcon /> : <MoonIcon />}
		</Button>
	);
});

ThemeToggle.displayName = 'ThemeToggle';
