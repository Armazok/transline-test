import { memo } from 'react';

import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import { type UserRole } from '@/entities/user';

import { Button, Heading, HEADING_VARIANT, Input, Paragraph, PARAGRAPH_VARIANT } from '@/shared/ui';

import { useRegisterProfileForm } from '../model/hooks/useRegisterProfileForm';
import { type ProfileFormValues } from '../model/types/types';

import cls from './RegisterProfileForm.module.scss';

interface RegisterProfileFormProps {
	role: UserRole;
	onSuccess: (values: ProfileFormValues) => void;
	className?: string;
}

export const RegisterProfileForm = memo(({ role, onSuccess, className }: RegisterProfileFormProps) => {
	const { t } = useTranslation('register');
	const { fields, getError, isSubmitting, taxIdLabel, onSubmit } = useRegisterProfileForm({
		role,
		onSuccess,
	});

	return (
		<form
			className={classNames(cls.RegisterProfileForm, className)}
			onSubmit={onSubmit}
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
					{...fields.lastName}
					placeholder={t('RegisterProfileForm.fields.lastName')}
					error={getError('lastName')}
					disabled={isSubmitting}
				/>
				<Input
					{...fields.firstName}
					placeholder={t('RegisterProfileForm.fields.firstName')}
					error={getError('firstName')}
					disabled={isSubmitting}
				/>
				<Input
					{...fields.middleName}
					placeholder={t('RegisterProfileForm.fields.middleName')}
					disabled={isSubmitting}
				/>
				<Input
					{...fields.email}
					type="email"
					// eslint-disable-next-line i18next/no-literal-string
					autoComplete="email"
					placeholder={t('RegisterProfileForm.fields.email')}
					error={getError('email')}
					disabled={isSubmitting}
				/>
				<Input
					{...fields.password}
					type="password"
					// eslint-disable-next-line i18next/no-literal-string
					autoComplete="new-password"
					placeholder={t('RegisterProfileForm.fields.password')}
					error={getError('password')}
					disabled={isSubmitting}
				/>
				<Input
					{...fields.confirmPassword}
					type="password"
					// eslint-disable-next-line i18next/no-literal-string
					autoComplete="new-password"
					placeholder={t('RegisterProfileForm.fields.confirmPassword')}
					error={getError('confirmPassword')}
					disabled={isSubmitting}
				/>
				<Input
					{...fields.taxId}
					// eslint-disable-next-line i18next/no-literal-string
					inputMode="numeric"
					maxLength={12}
					placeholder={taxIdLabel}
					error={getError('taxId')}
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
