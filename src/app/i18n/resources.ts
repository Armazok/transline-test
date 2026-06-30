import registerEn from '@/pages/auth/register/i18n/en.json';
import registerRu from '@/pages/auth/register/i18n/ru.json';
import carriersEn from '@/pages/contractors/carriers/i18n/en.json';
import carriersRu from '@/pages/contractors/carriers/i18n/ru.json';
import customersEn from '@/pages/contractors/customers/i18n/en.json';
import customersRu from '@/pages/contractors/customers/i18n/ru.json';
import errorEn from '@/pages/error/i18n/en.json';
import errorRu from '@/pages/error/i18n/ru.json';
import transportEn from '@/pages/fleet/transport/i18n/en.json';
import transportRu from '@/pages/fleet/transport/i18n/ru.json';
import managersEn from '@/pages/management/managers/i18n/en.json';
import managersRu from '@/pages/management/managers/i18n/ru.json';
import referencesCargoTypesEn from '@/pages/management/references/cargo-types/i18n/en.json';
import referencesCargoTypesRu from '@/pages/management/references/cargo-types/i18n/ru.json';
import referencesCitiesEn from '@/pages/management/references/cities/i18n/en.json';
import referencesCitiesRu from '@/pages/management/references/cities/i18n/ru.json';
import referencesTransportTypesEn from '@/pages/management/references/transport-types/i18n/en.json';
import referencesTransportTypesRu from '@/pages/management/references/transport-types/i18n/ru.json';
import mainEn from '@/pages/orders/active-applications/i18n/en.json';
import mainRu from '@/pages/orders/active-applications/i18n/ru.json';
import ordersArchivedEn from '@/pages/orders/archived/i18n/en.json';
import ordersArchivedRu from '@/pages/orders/archived/i18n/ru.json';

import dashboardEn from '@/widgets/sidebar/i18n/en.json';
import dashboardRu from '@/widgets/sidebar/i18n/ru.json';

import langEn from '@/features/lang/i18n/en.json';
import langRu from '@/features/lang/i18n/ru.json';
import profileEn from '@/features/user/edit-profile/i18n/en.json';
import profileRu from '@/features/user/edit-profile/i18n/ru.json';

import type { SupportedLang } from '@/shared/config';

export const NAMESPACES = {
	// auth
	register: { en: registerEn, ru: registerRu },

	// main & orders
	main: { en: mainEn, ru: mainRu },
	ordersArchived: { en: ordersArchivedEn, ru: ordersArchivedRu },

	// entities
	customers: { en: customersEn, ru: customersRu },
	carriers: { en: carriersEn, ru: carriersRu },
	managers: { en: managersEn, ru: managersRu },
	transport: { en: transportEn, ru: transportRu },

	// references
	referencesTransportTypes: { en: referencesTransportTypesEn, ru: referencesTransportTypesRu },
	referencesCargoTypes: { en: referencesCargoTypesEn, ru: referencesCargoTypesRu },
	referencesCities: { en: referencesCitiesEn, ru: referencesCitiesRu },

	// misc
	error: { en: errorEn, ru: errorRu },

	// widgets
	dashboard: { en: dashboardEn, ru: dashboardRu },

	// features
	profile: { en: profileEn, ru: profileRu },
	lang: { en: langEn, ru: langRu },
} satisfies Record<string, Record<SupportedLang, object>>;

export type AppNamespace = keyof typeof NAMESPACES;

export type I18nResources = {
	[K in AppNamespace]: (typeof NAMESPACES)[K]['en'];
};
