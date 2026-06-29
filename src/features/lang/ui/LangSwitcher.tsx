import { memo, useCallback, useMemo } from 'react';

import { useTranslation } from 'react-i18next';

import { LANG_LABELS, SUPPORTED_LANGS } from '@/shared/config';
import type { SupportedLang } from '@/shared/config';
import { Select, SELECT_VARIANT } from '@/shared/ui';

import cls from './LangSwitcher.module.scss';

export const LangSwitcher = memo(() => {
	const { i18n } = useTranslation();
	const currentLang = i18n.language as SupportedLang;

	const options = useMemo(
		() => SUPPORTED_LANGS.map((lang) => ({ value: lang, label: LANG_LABELS[lang] })),
		[],
	);

	const handleChange = useCallback(
		async (value: string | string[]) => {
			const lang = value as SupportedLang;
			if (lang !== currentLang) {
				await i18n.changeLanguage(lang);
			}
		},
		[currentLang, i18n],
	);

	return (
		<div className={cls.switcher}>
			<Select
				variant={SELECT_VARIANT.DEFAULT}
				options={options}
				value={currentLang}
				onChange={handleChange}
			/>
		</div>
	);
});

LangSwitcher.displayName = 'LangSwitcher';
