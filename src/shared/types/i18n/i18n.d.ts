// eslint-disable-next-line boundaries/dependencies -- type-only import; ambient declarations have no runtime coupling so FSD boundary is acceptable here
import type { I18nResources } from '@/app/i18n/resources';

declare module 'i18next' {
	interface CustomTypeOptions {
		defaultNS: 'main';
		resources: I18nResources;
	}
}
