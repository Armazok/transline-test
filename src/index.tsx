import { StrictMode } from 'react';

import ReactDOM from 'react-dom/client';

import './app/i18n/i18n';

import App from './App';

import './app/styles/_globals.scss';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
	<StrictMode>
		<App />
	</StrictMode>,
);
