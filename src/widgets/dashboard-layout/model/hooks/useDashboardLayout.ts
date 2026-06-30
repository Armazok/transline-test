import { useCallback, useEffect, useState } from 'react';

import { useMediaQuery } from '@/shared/hooks';

const MOBILE_QUERY = '(max-width: 834px)';

export const useDashboardLayout = () => {
	const isMobile = useMediaQuery(MOBILE_QUERY);

	const [isSidebarOpen, setIsSidebarOpen] = useState(() => !isMobile);
	const [isProfileOpen, setIsProfileOpen] = useState(false);

	useEffect(() => {
		if (isMobile) setIsSidebarOpen(false);
	}, [isMobile]);

	const toggleSidebar = useCallback(() => setIsSidebarOpen((p) => !p), []);
	const closeSidebar = useCallback(() => setIsSidebarOpen(false), []);
	const openProfile = useCallback(() => setIsProfileOpen(true), []);
	const closeProfile = useCallback(() => setIsProfileOpen(false), []);

	return {
		isSidebarOpen,
		isMobile,
		toggleSidebar,
		closeSidebar,
		isProfileOpen,
		openProfile,
		closeProfile,
	};
};
