import { type ProfileFormValues } from '../model/validate';

export const registerProfile = (values: ProfileFormValues): Promise<void> =>
	new Promise((resolve) => {
		console.warn('registerProfile ->', values);
		setTimeout(resolve, 1000);
	});
