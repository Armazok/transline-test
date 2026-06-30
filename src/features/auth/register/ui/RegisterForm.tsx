import { memo } from 'react';

import { Controller } from 'react-hook-form';
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

import { useRegisterForm } from '../model/hooks/useRegisterForm';

import cls from './RegisterForm.module.scss';

interface RegisterFormProps {
	onSuccess?: (phone: string) => void;
}

export const RegisterForm = memo(({ onSuccess }: RegisterFormProps) => {
	const { t } = useTranslation('register');
	const {
		control,
		country,
		countries,
		phoneDisplay,
		isSubmitting,
		isFormValid,
		handleCountryChange,
		onSubmit,
	} = useRegisterForm({ onSuccess });

	return (
		<form className={cls.RegisterForm} onSubmit={onSubmit}>
			<div className={cls.RegisterForm__header}>
				<Heading variant={HEADING_VARIANT.h3} className={cls.RegisterForm__title}>
					{t('RegisterForm.title')}
				</Heading>
				<Paragraph variant={PARAGRAPH_VARIANT.text_1}>
					{t('RegisterForm.subtitle')}
				</Paragraph>
			</div>

			<Controller
				name="phone"
				control={control}
				rules={{
					validate: (value) =>
						// eslint-disable-next-line i18next/no-literal-string
						value.length === country.digits || 'RegisterForm.errors.phone',
				}}
				render={({ field: { onChange, ref }, fieldState: { error } }) => (
					<div className={cls.RegisterForm__phoneGroup}>
						<PhoneInput
							ref={ref}
							className={cls.RegisterForm__phoneRow}
							countries={countries}
							country={country}
							value={phoneDisplay}
							placeholder={t('RegisterForm.phonePlaceholder')}
							onChange={(e) => {
								const digits = e.target.value.replace(/\D/g, '').slice(0, country.digits);
								onChange(digits);
							}}
							onCountryChange={handleCountryChange}
						/>
						{error && (
							<Paragraph
								variant={PARAGRAPH_VARIANT.text_1}
								className={cls.RegisterForm__phoneError}
							>
								{/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
								{t(error.message as any)}
							</Paragraph>
						)}
					</div>
				)}
			/>

			<Controller
				name="agreed"
				control={control}
				rules={{ required: true }}
				render={({ field: { value, onChange } }) => (
					<Checkbox
						className={cls.RegisterForm__agreement}
						checked={value}
						onChange={onChange}
					>
						{t('RegisterForm.agreement')}{' '}
						<Button
							as="a"
							variant={BUTTON_VARIANT.CLEAR}
							href="#"
							className={cls.RegisterForm__agreementLink}
						>
							{t('RegisterForm.agreementLink')}
						</Button>
					</Checkbox>
				)}
			/>

			<Button type="submit" disabled={!isFormValid || isSubmitting}>
				{t('RegisterForm.submit')}
			</Button>
		</form>
	);
});

RegisterForm.displayName = 'RegisterForm';
