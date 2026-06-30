export const verifyOtp = (code: string): Promise<void> =>
	new Promise((resolve, reject) => {
		console.warn('verifyOtp ->', code);
		setTimeout(() => {
			if (code === '123456') resolve();
			else reject(new Error());
		}, 1000);
	});
