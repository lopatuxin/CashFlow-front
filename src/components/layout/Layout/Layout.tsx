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

    // Моковые данные для быстрых действий
    const quickActions: QuickAction[] = [
        {
            id: 'add_income',
            label: 'Добавить доход',
            icon: 'add_income',
            action: () => console.log('Add income'),
            variant: 'primary'
        },
        {
            id: 'add_expense',
            label: 'Добавить расход',
            icon: 'add_expense',
            action: () => console.log('Add expense')
        },
        {
            id: 'add_goal',
            label: 'Добавить цель',
            icon: 'add_income', // Используем такую же иконку как у верхних кнопок (+)
            action: () => console.log('Add goal')
        }
    ];

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
            // Убираем quickActions из Header
            />
            <div className={styles.content}>
                <Sidebar
                    isOpen={isSidebarOpen}
                    onToggle={handleSidebarToggle}
                    quickActions={quickActions}
                    onQuickAction={handleQuickAction}
                    onNavigationClick={handleNavigationClick}
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