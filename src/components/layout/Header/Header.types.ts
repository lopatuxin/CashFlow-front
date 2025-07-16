export interface NavigationItem {
    id: string;
    label: string;
    path: string;
    icon?: string;
    badge?: number;
    isActive?: boolean;
}

export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    balance: number;
    currency: string;
}

export interface Notification {
    id: string;
    type: 'budget_exceeded' | 'large_transaction' | 'goal_achieved' | 'system';
    title: string;
    message: string;
    timestamp: string;
    isRead: boolean;
    priority: 'low' | 'medium' | 'high';
}

export interface QuickAction {
    id: string;
    label: string;
    icon: string;
    action: () => void;
    variant?: 'primary' | 'secondary';
}

export interface HeaderProps {
    user?: User;
    notifications?: Notification[];
    quickActions?: QuickAction[];
    onMenuToggle?: () => void;
    onNotificationClick?: (notification: Notification) => void;
    onUserMenuToggle?: () => void;
    onQuickAction?: (action: QuickAction) => void;
    onNavigationClick?: (item: NavigationItem) => void;
    className?: string;
    isMobile?: boolean;
}

export interface HeaderState {
    isUserMenuOpen: boolean;
    isNotificationsOpen: boolean;
    isQuickActionsOpen: boolean;
}