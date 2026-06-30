import { COUNTRIES } from '../config/countries';

export const detectCountryByLocale = (): string => {
	const locales = navigator.languages?.length
		? (navigator.languages as string[])
		: // eslint-disable-next-line i18next/no-literal-string
			[navigator.language ?? 'en-US'];

	for (const locale of locales) {
		const region = locale.split('-')[1]?.toUpperCase();
		if (region) {
			const found = COUNTRIES.find((c) => c.code === region);
			if (found) return found.code;
		}
	}

	return 'KZ';
};
