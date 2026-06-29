export const sendOtp = (phone: string): Promise<void> =>
	new Promise((resolve) => {
		console.log('sendOtp ->', phone);
		setTimeout(resolve, 1500);
	});
