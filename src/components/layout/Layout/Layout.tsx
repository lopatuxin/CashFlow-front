import React from 'react';
import { useLocation } from 'react-router-dom';
import { Footer } from '../Footer';
import { Header } from '../Header';
import { NavigationItem, Notification, QuickAction } from '../Header/Header.types';
import { Sidebar } from '../Sidebar';
import styles from './Layout.module.scss';

interface LayoutProps {
    children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

    const handleSidebarToggle = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleNavigationClick = (item: NavigationItem) => {
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
            <div className={styles.content}>
                <Sidebar
                    isOpen={isSidebarOpen}
                    onToggle={handleSidebarToggle}
                />
                <main className={styles.main}>
                    {children}
                </main>
            </div>
            <Footer
                version="1.0.0"
                systemStatus="Система работает стабильно"
            />
        </div>
    );
};