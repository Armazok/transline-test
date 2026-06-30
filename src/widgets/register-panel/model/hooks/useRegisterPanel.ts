import { useCallback, useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { clearRegProgress, loadRegProgress, saveRegProgress, sendOtp } from '@/features/auth/register';
import type { ProfileFormValues } from '@/features/auth/register-profile';

import { useUser, type UserRole } from '@/entities/user';

import { ROUTER_PATH } from '@/shared/config';
import { setAccessToken } from '@/shared/lib';

import { NEXT_STEP } from '../config/stepsConfig';

import type { RegisterProgress, RegisterStep } from '../types/types';

const DEFAULT_ROLE: UserRole = 'carrier';
const INITIAL_STEP: RegisterStep = 'phone';

export const useRegisterPanel = () => {
	const navigate = useNavigate();
	const { setProfile } = useUser();

	const [step, setStep] = useState<RegisterStep>(
		() => loadRegProgress<RegisterProgress>()?.step ?? INITIAL_STEP,
	);
	const [phone, setPhone] = useState(
		() => loadRegProgress<RegisterProgress>()?.phone ?? '',
	);
	const [role, setRole] = useState<UserRole>(
		() => loadRegProgress<RegisterProgress>()?.role ?? DEFAULT_ROLE,
	);

	useEffect(() => {
		saveRegProgress({ step, phone, role });
	}, [step, phone, role]);

	const goNext = useCallback((current: RegisterStep) => {
		const next = NEXT_STEP[current];
		if (next) setStep(next);
	}, []);

	const handlePhoneSuccess = useCallback(
		(fullPhone: string) => {
			setPhone(fullPhone);
			goNext('phone');
		},
		[goNext],
	);

	const handleRoleSuccess = useCallback(
		(selectedRole: UserRole) => {
			setRole(selectedRole);
			goNext('role');
		},
		[goNext],
	);

	const handleOtpResend = useCallback(async () => {
		await sendOtp(phone);
	}, [phone]);

	const handleOtpSuccess = useCallback(() => {
		goNext('otp');
	}, [goNext]);

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
			clearRegProgress();
			setAccessToken('session');
			navigate(ROUTER_PATH.dashboard.orders.activeApplications, { replace: true });
		},
		[phone, role, setProfile, navigate],
	);

	return {
		step,
		phone,
		role,
		handlePhoneSuccess,
		handleRoleSuccess,
		handleOtpResend,
		handleOtpSuccess,
		handleProfileSuccess,
	};
};
