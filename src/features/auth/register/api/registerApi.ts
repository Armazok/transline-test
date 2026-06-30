export const sendOtp = (phone: string): Promise<void> =>
	new Promise((resolve) => {
		console.warn('sendOtp ->', phone);
		setTimeout(resolve, 1500);
	});
