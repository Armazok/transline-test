import { toast as _toast, type ToastOptions } from 'react-toastify';

const DEFAULTS: ToastOptions = {
	position: 'top-right',
	autoClose: 3000,
	closeOnClick: true,
	pauseOnHover: true,
};

const merge = (options?: ToastOptions): ToastOptions => ({ ...DEFAULTS, ...options });

export const useToast = () => ({
	success: (message: string, options?: ToastOptions) => _toast.success(message, merge(options)),
	error: (message: string, options?: ToastOptions) => _toast.error(message, merge(options)),
	warning: (message: string, options?: ToastOptions) => _toast.warning(message, merge(options)),
	info: (message: string, options?: ToastOptions) => _toast.info(message, merge(options)),
	loading: (message: string, options?: ToastOptions) => _toast.loading(message, merge(options)),
	update: _toast.update,
	dismiss: _toast.dismiss,
});
