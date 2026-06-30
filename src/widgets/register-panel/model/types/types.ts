import type { UserRole } from '@/entities/user';

export type RegisterStep = 'phone' | 'role' | 'otp' | 'profile';

export interface RegisterProgress {
	step: RegisterStep;
	phone: string;
	role: UserRole;
}
