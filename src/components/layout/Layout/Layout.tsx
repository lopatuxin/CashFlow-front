import React from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from '../Header';
import { NavigationItem, Notification, QuickAction } from '../Header/Header.types';
import styles from './Layout.module.scss';

interface LayoutProps {
    children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    const location = useLocation();

    const handleNavigationClick = (item: NavigationItem) => {
        // Здесь можно добавить навигацию через React Router
        console.log(`Navigate to: ${item.path}`);
    };

    const handleNotificationClick = (notification: Notification) => {
        console.log('Notification clicked:', notification);
    };

    const handleQuickAction = (action: QuickAction) => {
        console.log('Quick action:', action);
    };

    return (
        <div className={styles.layout}>
            <Header
                onNavigationClick={handleNavigationClick}
                onNotificationClick={handleNotificationClick}
                onQuickAction={handleQuickAction}
            />
            <main className={styles.main}>
                {children}
            </main>
        </div>
    );
};