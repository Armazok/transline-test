import { memo } from 'react';

import { useTranslation } from 'react-i18next';

import {
	Button,
	BUTTON_VARIANT,
	Checkbox,
	Heading,
	HEADING_VARIANT,
	Paragraph,
	PARAGRAPH_VARIANT,
	PhoneInput,
} from '@/shared/ui';

import { useRegisterForm } from '../model/useRegisterForm';

import cls from './RegisterForm.module.scss';

interface RegisterFormProps {
	onSuccess?: (phone: string) => void;
}

export const RegisterForm = memo(({ onSuccess }: RegisterFormProps) => {
	const { t } = useTranslation('register');
	const {
		country,
		countries,
		phoneDisplay,
		agreed,
		isSubmitting,
		isFormValid,
		handlePhoneChange,
		handleCountryChange,
		handleAgreementChange,
		handleSubmit,
	} = useRegisterForm({ onSuccess });

	return (
		<form className={cls.RegisterForm} onSubmit={handleSubmit}>
			<div className={cls.RegisterForm__header}>
				<Heading variant={HEADING_VARIANT.h3} className={cls.RegisterForm__title}>
					{t('RegisterForm.title')}
				</Heading>
				<Paragraph variant={PARAGRAPH_VARIANT.text_1}>
					{t('RegisterForm.subtitle')}
				</Paragraph>
			</div>

			<PhoneInput
				className={cls.RegisterForm__phoneRow}
				countries={countries}
				country={country}
				value={phoneDisplay}
				placeholder={t('RegisterForm.phonePlaceholder')}
				onChange={handlePhoneChange}
				onCountryChange={handleCountryChange}
			/>

			<Checkbox
				className={cls.RegisterForm__agreement}
				checked={agreed}
				onChange={handleAgreementChange}
			>
				{t('RegisterForm.agreement')}{' '}
				<Button
					as={'a'}
					variant={BUTTON_VARIANT.CLEAR}
					href="#"
					className={cls.RegisterForm__agreementLink}
				>
					{t('RegisterForm.agreementLink')}
				</Button>
			</Checkbox>

			<Button type="submit" disabled={!isFormValid || isSubmitting}>
				{t('RegisterForm.submit')}
			</Button>
		</form>
	);
});

RegisterForm.displayName = 'RegisterForm';
