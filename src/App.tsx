import { ToastContainer } from 'react-toastify';

import { ErrorBoundary } from '@/shared/ui';

import { ErrorFallback, UserProvider } from './app/providers';
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
