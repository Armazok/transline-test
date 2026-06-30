// Чтобы добавить новый язык:
// 1. Добавить запись в LANGS_CONFIG
// 2. Добавить переводы во все i18n-папки (pages/*/i18n, features/*/i18n)
const LANGS_CONFIG = {
	en: { label: 'EN' },
	ru: { label: 'RU' },
} satisfies Record<string, { label: string }>;

export type SupportedLang = keyof typeof LANGS_CONFIG;

export const SUPPORTED_LANGS = Object.keys(LANGS_CONFIG) as SupportedLang[];

export const LANG_LABELS = Object.fromEntries(
	Object.entries(LANGS_CONFIG).map(([lang, { label }]) => [lang, label]),
) as Record<SupportedLang, string>;

export const DEFAULT_NS = 'main' as const;
