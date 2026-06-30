import type { Country } from '@/shared/lib';

export const COUNTRIES: Country[] = [
	{ code: 'KZ', dial: '+7', flag: '🇰🇿', name: 'Казахстан', mask: '(XXX) XXX-XX-XX', digits: 10 },
	{ code: 'RU', dial: '+7', flag: '🇷🇺', name: 'Россия', mask: '(XXX) XXX-XX-XX', digits: 10 },
	{ code: 'BY', dial: '+375', flag: '🇧🇾', name: 'Беларусь', mask: '(XX) XXX-XX-XX', digits: 9 },
	{ code: 'UZ', dial: '+998', flag: '🇺🇿', name: 'Узбекистан', mask: 'XX XXX-XX-XX', digits: 9 },
	{ code: 'US', dial: '+1', flag: '🇺🇸', name: 'США', mask: '(XXX) XXX-XXXX', digits: 10 },
	{ code: 'GB', dial: '+44', flag: '🇬🇧', name: 'Великобритания', mask: 'XXXX XXXXXX', digits: 10 },
	{ code: 'DE', dial: '+49', flag: '🇩🇪', name: 'Германия', mask: 'XXX XXXXXXX', digits: 10 },
	{ code: 'TR', dial: '+90', flag: '🇹🇷', name: 'Турция', mask: '(XXX) XXX-XXXX', digits: 10 },
];
