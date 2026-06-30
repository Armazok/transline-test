import { useCallback, useRef, useState } from 'react';

import { useTranslation } from 'react-i18next';

import type { SupportedLang } from '@/shared/config';
import { useClickOutside } from '@/shared/hooks';

export const useLangSwitcher = () => {
	const { i18n } = useTranslation();
	const currentLang = i18n.language as SupportedLang;
	const [open, setOpen] = useState(false);
	const ref = useRef<HTMLDivElement>(null);

	const close = useCallback(() => setOpen(false), []);
	useClickOutside(ref, close);

	const handleSelect = useCallback(
		async (lang: SupportedLang) => {
			if (lang !== currentLang) await i18n.changeLanguage(lang);
			setOpen(false);
		},
		[currentLang, i18n],
	);

	const toggle = useCallback(() => setOpen((p) => !p), []);

	return { currentLang, open, ref, toggle, handleSelect };
};
