import clsx from 'clsx';
import React, { useState } from 'react';
import { BalanceDisplay } from './BalanceDisplay';
import styles from './Header.module.scss';
import { HeaderProps, NavigationItem, Notification, User } from './Header.types';
import { Logo } from './Logo';
import { Navigation } from './Navigation';
import { NotificationsButton } from './NotificationsButton';
import { UserMenu } from './UserMenu';

// Моковые данные для демонстрации
const defaultNavigationItems: NavigationItem[] = [];

const defaultUser: User = {
    id: '1',
    name: 'Иван Петров',
    email: 'ivan.petrov@example.com',
    balance: 125000.50,
    currency: 'RUB'
};

const defaultNotifications: Notification[] = [
    {
        id: '1',
        type: 'budget_exceeded',
        title: 'Превышение бюджета',
        message: 'Категория "Рестораны" превышена на 15%',
        timestamp: new Date().toISOString(),
        isRead: false,
        priority: 'high'
    },
    {
        id: '2',
        type: 'large_transaction',
        title: 'Крупная операция',
        message: 'Списание 50,000 ₽ со счета',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        isRead: false,
        priority: 'medium'
    },
    {
        id: '3',
        type: 'goal_achieved',
        title: 'Цель достигнута',
        message: 'Поздравляем! Вы достигли цели "Накопления"',
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        isRead: true,
        priority: 'low'
    }
];

export const Header: React.FC<HeaderProps> = ({
    user = defaultUser,
    notifications = defaultNotifications,
    onMenuToggle,
    onNotificationClick,
    onUserMenuToggle,
    onNavigationClick,
    className,
    isMobile = false
}) => {
    const [navigationItems, setNavigationItems] = useState<NavigationItem[]>(defaultNavigationItems);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleNavigationClick = (item: NavigationItem) => {
        // Обновляем активный элемент
        setNavigationItems(prev =>
            prev.map(navItem => ({
                ...navItem,
                isActive: navItem.id === item.id
            }))
        );

        // Вызываем внешний обработчик
        onNavigationClick?.(item);
    };

    const handleNotificationClick = (notification: Notification) => {
        onNotificationClick?.(notification);
    };

    const handleUserMenuToggle = () => {
        onUserMenuToggle?.();
    };

    const handleMobileMenuToggle = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
        onMenuToggle?.();
    };

    return (
        <header className={clsx(styles.header, className)}>
            <div className={styles.headerLeft}>
                {isMobile && (
                    <button
                        className={styles.mobileMenuButton}
                        onClick={handleMobileMenuToggle}
                        aria-label="Открыть меню"
                        aria-expanded={isMobileMenuOpen}
                    >
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <line x1="3" y1="6" x2="21" y2="6" />
                            <line x1="3" y1="12" x2="21" y2="12" />
                            <line x1="3" y1="18" x2="21" y2="18" />
                        </svg>
                    </button>
                )}

                <Logo className={styles.headerLogo} />

                {!isMobile && (
                    <Navigation
                        items={navigationItems}
                        onItemClick={handleNavigationClick}
                        className={styles.headerNavigation}
                    />
                )}
            </div>

            <div className={styles.headerRight}>
                {!isMobile && (
                    <BalanceDisplay
                        user={user}
                        className={styles.headerBalance}
                        showCurrency={false}
                    />
                )}

                <NotificationsButton
                    notifications={notifications}
                    onNotificationClick={handleNotificationClick}
                    className={styles.headerNotifications}
                />

                <UserMenu
                    user={user}
                    onMenuToggle={handleUserMenuToggle}
                    className={styles.headerUserMenu}
                />
            </div>

            {/* Мобильное меню */}
            {isMobile && isMobileMenuOpen && (
                <div className={styles.mobileMenu}>
                    <Navigation
                        items={navigationItems}
                        onItemClick={handleNavigationClick}
                        className={styles.mobileNavigation}
                        isMobile={true}
                    />
                    <BalanceDisplay
                        user={user}
                        className={styles.mobileBalance}
                    />
                </div>
            )}
        </header>
    );
};