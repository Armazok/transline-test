import { memo } from 'react';

import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import { type UserRole } from '@/features/auth/select-role';

import { Button, Heading, HEADING_VARIANT, Input, Paragraph, PARAGRAPH_VARIANT } from '@/shared/ui';

import { useRegisterProfileForm } from '../model/useRegisterProfileForm';
import { type ProfileFormValues } from '../model/validate';

import cls from './RegisterProfileForm.module.scss';

interface RegisterProfileFormProps {
	role: UserRole;
	onSuccess: (values: ProfileFormValues) => void;
	className?: string;
}

export const RegisterProfileForm = memo(({ role, onSuccess, className }: RegisterProfileFormProps) => {
	const { t } = useTranslation('register');
	const {
		values,
		errors,
		isSubmitting,
		taxIdLabel,
		handleChange,
		handleBlur,
		handleSubmit,
	} = useRegisterProfileForm({ role, onSuccess });

	return (
		<form
			className={classNames(cls.RegisterProfileForm, className)}
			onSubmit={handleSubmit}
			noValidate
		>
			<div className={cls.RegisterProfileForm__header}>
				<Heading variant={HEADING_VARIANT.h3} className={cls.RegisterProfileForm__title}>
					{t('RegisterProfileForm.title')}
				</Heading>
				<Paragraph variant={PARAGRAPH_VARIANT.text_1}>
					{t('RegisterProfileForm.subtitle')}
				</Paragraph>
			</div>

			<div className={cls.RegisterProfileForm__fields}>
				<Input
					name="lastName"
					placeholder={t('RegisterProfileForm.fields.lastName')}
					value={values.lastName}
					onChange={handleChange}
					onBlur={handleBlur}
					error={errors.lastName}
					disabled={isSubmitting}
				/>
				<Input
					name="firstName"
					placeholder={t('RegisterProfileForm.fields.firstName')}
					value={values.firstName}
					onChange={handleChange}
					onBlur={handleBlur}
					error={errors.firstName}
					disabled={isSubmitting}
				/>
				<Input
					name="middleName"
					placeholder={t('RegisterProfileForm.fields.middleName')}
					value={values.middleName}
					onChange={handleChange}
					onBlur={handleBlur}
					disabled={isSubmitting}
				/>
				<Input
					name="email"
					 
					type="email"
					// eslint-disable-next-line i18next/no-literal-string
					autoComplete="email"
					placeholder={t('RegisterProfileForm.fields.email')}
					value={values.email}
					onChange={handleChange}
					onBlur={handleBlur}
					error={errors.email}
					disabled={isSubmitting}
				/>
				<Input
					name="password"
					 
					type="password"
					// eslint-disable-next-line i18next/no-literal-string
					autoComplete="new-password"
					placeholder={t('RegisterProfileForm.fields.password')}
					value={values.password}
					onChange={handleChange}
					onBlur={handleBlur}
					error={errors.password}
					disabled={isSubmitting}
				/>
				<Input
					name="confirmPassword"
					 
					type="password"
					// eslint-disable-next-line i18next/no-literal-string
					autoComplete="new-password"
					placeholder={t('RegisterProfileForm.fields.confirmPassword')}
					value={values.confirmPassword}
					onChange={handleChange}
					onBlur={handleBlur}
					error={errors.confirmPassword}
					disabled={isSubmitting}
				/>
				<Input
					name="taxId"
					// eslint-disable-next-line i18next/no-literal-string
					inputMode="numeric"
					maxLength={12}
					placeholder={taxIdLabel}
					value={values.taxId}
					onChange={handleChange}
					onBlur={handleBlur}
					error={errors.taxId}
					disabled={isSubmitting}
				/>
			</div>

			<Button type="submit" disabled={isSubmitting} isDisabled={isSubmitting}>
				{t('RegisterProfileForm.submit')}
			</Button>
		</form>
	);
});

RegisterProfileForm.displayName = 'RegisterProfileForm';
