/* eslint-disable i18next/no-literal-string */
import { Button, BUTTON_VARIANT, Heading, HEADING_VARIANT } from '@/shared/ui';

export const ErrorFallback = () => (
	<div
		style={{
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'center',
			height: '100vh',
			gap: 16,
		}}
	>
		<Heading variant={HEADING_VARIANT.h2}>Что-то пошло не так</Heading>
		<Button
			variant={BUTTON_VARIANT.CLEAR}
			type="button"
			onClick={() => window.location.reload()}
		>
			Перезагрузить страницу
		</Button>
	</div>
);
