const REG_STORAGE_KEY = 'reg_progress';

export const loadRegProgress = <T>(): T | null => {
	try {
		const raw = localStorage.getItem(REG_STORAGE_KEY);
		return raw ? (JSON.parse(raw) as T) : null;
	} catch {
		return null;
	}
};

export const saveRegProgress = (data: unknown): void => {
	localStorage.setItem(REG_STORAGE_KEY, JSON.stringify(data));
};

export const clearRegProgress = (): void => {
	localStorage.removeItem(REG_STORAGE_KEY);
};
