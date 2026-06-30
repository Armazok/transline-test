import { useCallback, useRef, useState } from 'react';

import { useClickOutside } from '@/shared/hooks';

export const useUserMenu = () => {
	const [isOpen, setIsOpen] = useState(false);
	const ref = useRef<HTMLDivElement>(null);

	const close = useCallback(() => setIsOpen(false), []);
	useClickOutside(ref, close);

	const toggle = useCallback(() => setIsOpen((p) => !p), []);

	return { isOpen, ref, toggle, close };
};
