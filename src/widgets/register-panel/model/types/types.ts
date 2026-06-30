import type { UserRole } from '@/features/auth/select-role';

export type RegisterStep = 'phone' | 'role' | 'otp' | 'profile';

export interface RegisterProgress {
	step: RegisterStep;
	phone: string;
	role: UserRole;
}
