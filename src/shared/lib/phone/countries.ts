export interface Country {
	code: string;
	dial: string;
	flag: string;
	name: string;
	mask: string;
	digits: number;
}

export const formatPhone = (digits: string, mask: string): string => {
	let digitIndex = 0;
	let result = '';

	for (let i = 0; i < mask.length; i++) {
		if (digitIndex >= digits.length) break;
		const char = mask[i];
		if (char === 'X') {
			result += digits[digitIndex++];
		} else {
			result += char;
		}
	}

	return result;
};
