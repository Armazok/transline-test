export type UserRole = 'customer' | 'carrier';

export interface UserProfile {
	phone: string;
	role: UserRole;
	lastName: string;
	firstName: string;
	middleName: string;
	email: string;
	taxId: string;
}

export type EditableProfileFields = Pick<
	UserProfile,
	'lastName' | 'firstName' | 'middleName' | 'email' | 'phone'
>;
