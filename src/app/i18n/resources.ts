import errorEn from '@/pages/error/i18n/en.json';
import errorRu from '@/pages/error/i18n/ru.json';
import mainEn from '@/pages/main/i18n/en.json';
import mainRu from '@/pages/main/i18n/ru.json';
import profileEn from '@/pages/profile/i18n/en.json';
import profileRu from '@/pages/profile/i18n/ru.json';
import registerEn from '@/pages/register/i18n/en.json';
import registerRu from '@/pages/register/i18n/ru.json';

import dashboardEn from '@/widgets/sidebar/i18n/en.json';
import dashboardRu from '@/widgets/sidebar/i18n/ru.json';

import langEn from '@/features/lang/i18n/en.json';
import langRu from '@/features/lang/i18n/ru.json';


import type { SupportedLang } from '@/shared/config';

// ─── Namespace registry ───────────────────────────────────────
// Чтобы добавить переводы новой страницы или фичи:
// 1. Создать {layer}/{slice}/i18n/en.json и ru.json
// 2. Добавить импорты выше
// 3. Добавить запись в NAMESPACES

export const NAMESPACES = {
	main: { en: mainEn, ru: mainRu },
	register: { en: registerEn, ru: registerRu },
	profile: { en: profileEn, ru: profileRu },
	dashboard: { en: dashboardEn, ru: dashboardRu },
	error: { en: errorEn, ru: errorRu },
	lang: { en: langEn, ru: langRu },
} satisfies Record<string, Record<SupportedLang, object>>;

export type AppNamespace = keyof typeof NAMESPACES;

export type I18nResources = {
	[K in AppNamespace]: (typeof NAMESPACES)[K]['en'];
};
