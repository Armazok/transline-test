import { memo } from 'react';

import { ProfilePanel } from '@/features/user/edit-profile';

interface ProfilePanelWidgetProps {
	className?: string;
}

export const ProfilePanelWidget = memo(({ className }: ProfilePanelWidgetProps) => (
	<ProfilePanel className={className} />
));

ProfilePanelWidget.displayName = 'ProfilePanelWidget';
