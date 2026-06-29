import { memo, useCallback, useState } from 'react';

import { useNavigate } from 'react-router-dom';


import { RegisterForm, sendOtp } from '@/features/auth/register';
import { type ProfileFormValues, RegisterProfileForm } from '@/features/auth/register-profile';
import { SelectRoleForm, type UserRole } from '@/features/auth/select-role';
import { VerifyOtpForm } from '@/features/auth/verify-otp';

import { useUser } from '@/entities/user';

import { ROUTER_PATH } from '@/shared/config';
import { setAccessToken } from '@/shared/lib';

import cls from './RegisterPanelWidget.module.scss';

type Step = 0 | 1 | 2 | 3;

 
const DEFAULT_ROLE: UserRole = 'carrier';

export const RegisterPanelWidget = memo(() => {
	const navigate = useNavigate();
	const { setProfile } = useUser();
	const [step, setStep] = useState<Step>(0);
	const [phone, setPhone] = useState('');
	const [role, setRole] = useState<UserRole>(DEFAULT_ROLE);

	const handlePhoneSuccess = useCallback((fullPhone: string) => {
		setPhone(fullPhone);
		setStep(1);
	}, []);

	const handleRoleSuccess = useCallback((selectedRole: UserRole) => {
		setRole(selectedRole);
		setStep(2);
	}, []);

	const handleOtpResend = useCallback(() => {
		sendOtp(phone);
	}, [phone]);

	const handleOtpSuccess = useCallback(() => {
		setStep(3);
	}, []);

	const handleProfileSuccess = useCallback(
		(values: ProfileFormValues) => {
			setProfile({
				phone,
				role,
				lastName: values.lastName,
				firstName: values.firstName,
				middleName: values.middleName,
				email: values.email,
				taxId: values.taxId,
			});
			// eslint-disable-next-line i18next/no-literal-string
			setAccessToken('session');
			navigate(ROUTER_PATH.dashboard.profile, { replace: true });
		},
		[phone, role, setProfile, navigate],
	);

	if (step === 3) {
		return (
			<div className={cls.RegisterPanelWidget}>
				<RegisterProfileForm role={role} onSuccess={handleProfileSuccess} />
			</div>
		);
	}

	if (step === 2) {
		return (
			<div className={cls.RegisterPanelWidget}>
				<VerifyOtpForm
					phone={phone}
					onResend={handleOtpResend}
					onSuccess={handleOtpSuccess}
				/>
			</div>
		);
	}

	if (step === 1) {
		return (
			<div className={cls.RegisterPanelWidget}>
				<SelectRoleForm onSuccess={handleRoleSuccess} />
			</div>
		);
	}

	return (
		<div className={cls.RegisterPanelWidget}>
			<RegisterForm onSuccess={handlePhoneSuccess} />
		</div>
	);
});

RegisterPanelWidget.displayName = 'RegisterPanelWidget';
