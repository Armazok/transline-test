import { memo } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

import { RegisterForm } from '@/features/auth/register';
import { RegisterProfileForm } from '@/features/auth/register-profile';
import { SelectRoleForm } from '@/features/auth/select-role';
import { VerifyOtpForm } from '@/features/auth/verify-otp';

import { useRegisterPanel } from '../model/hooks/useRegisterPanel';

import cls from './RegisterPanelWidget.module.scss';

const variants = {
	initial: { opacity: 0, x: 32 },
	animate: { opacity: 1, x: 0 },
	exit: { opacity: 0, x: -32 },
};

const transition = { duration: 0.28, ease: 'easeInOut' } as const;

export const RegisterPanelWidget = memo(() => {
	const {
		step,
		phone,
		role,
		handlePhoneSuccess,
		handleRoleSuccess,
		handleOtpResend,
		handleOtpSuccess,
		handleProfileSuccess,
	} = useRegisterPanel();

	const renderStep = () => {
		if (step === 'phone') return <RegisterForm onSuccess={handlePhoneSuccess} />;
		if (step === 'role') return <SelectRoleForm onSuccess={handleRoleSuccess} />;
		if (step === 'otp')
			return (
				<VerifyOtpForm
					phone={phone}
					onResend={handleOtpResend}
					onSuccess={handleOtpSuccess}
				/>
			);
		return <RegisterProfileForm role={role} onSuccess={handleProfileSuccess} />;
	};

	return (
		<div className={cls.RegisterPanelWidget}>
			<AnimatePresence mode="wait">
				<motion.div
					key={step}
					variants={variants}
					initial="initial"
					animate="animate"
					exit="exit"
					transition={transition}
				>
					{renderStep()}
				</motion.div>
			</AnimatePresence>
		</div>
	);
});

RegisterPanelWidget.displayName = 'RegisterPanelWidget';
