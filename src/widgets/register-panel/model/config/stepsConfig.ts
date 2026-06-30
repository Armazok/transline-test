import type { RegisterStep } from '../types/types';

export const NEXT_STEP: Record<RegisterStep, RegisterStep | null> = {
	phone: 'role',
	role: 'otp',
	otp: 'profile',
	profile: null,
};
