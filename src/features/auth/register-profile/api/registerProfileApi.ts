import { type ProfileFormValues } from '../model/types/types';

export const registerProfile = (values: ProfileFormValues): Promise<void> =>
	new Promise((resolve) => {
		console.warn('registerProfile ->', values);
		setTimeout(resolve, 1000);
	});
