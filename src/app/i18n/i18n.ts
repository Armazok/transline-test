import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import { DEFAULT_NS, SUPPORTED_LANGS } from '@/shared/config';
import type { SupportedLang } from '@/shared/config';

import { NAMESPACES } from './resources';

const resources = Object.fromEntries(
	SUPPORTED_LANGS.map((lang) => [
		lang,
		Object.fromEntries(
			Object.entries(NAMESPACES).map(([ns, translations]) => [
				ns,
				translations[lang as SupportedLang],
			]),
		),
	]),
);

void i18n
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		resources,
		defaultNS: DEFAULT_NS,
		lng: 'ru',
		fallbackLng: 'ru',
		supportedLngs: SUPPORTED_LANGS,
		interpolation: { escapeValue: false },
		detection: {
			order: ['localStorage', 'navigator'],
			caches: ['localStorage'],
			lookupLocalStorage: 'i18n-lang',
		},
	});

export { default } from 'i18next';
