import { ToastContainer } from 'react-toastify';

import { UserProvider } from '@/entities/user';

import { ErrorBoundary } from '@/shared/ui';

import { ErrorFallback } from './app/providers/ErrorFallback';
import { AppRouter } from './app/router/AppRouter';

function App() {
	return (
		<ErrorBoundary fallback={<ErrorFallback />}>
			<UserProvider>
				<AppRouter />
				<ToastContainer />
			</UserProvider>
		</ErrorBoundary>
	);
}

export default App;
