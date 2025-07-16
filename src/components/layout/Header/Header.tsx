import clsx from 'clsx';
import React, { useState } from 'react';
import { BalanceDisplay } from './BalanceDisplay';
import styles from './Header.module.scss';
import { HeaderProps, NavigationItem, Notification, QuickAction, User } from './Header.types';
import { Logo } from './Logo';
import { Navigation } from './Navigation';
import { NotificationsButton } from './NotificationsButton';
import { QuickActions } from './QuickActions';
import { UserMenu } from './UserMenu';

// Моковые данные для демонстрации
const defaultNavigationItems: NavigationItem[] = [
    { id: 'dashboard', label: 'Дашборд', path: '/dashboard', icon: 'dashboard', isActive: true },
    { id: 'budget', label: 'Бюджет', path: '/budget', icon: 'budget' },
    { id: 'transactions', label: 'Транзакции', path: '/transactions', icon: 'transactions' },
    { id: 'analytics', label: 'Аналитика', path: '/analytics', icon: 'analytics' },
    { id: 'investments', label: 'Инвестиции', path: '/investments', icon: 'investments' },
    { id: 'accounts', label: 'Счета', path: '/accounts', icon: 'accounts' },
    { id: 'goals', label: 'Цели', path: '/goals', icon: 'goals' },
    { id: 'settings', label: 'Настройки', path: '/settings', icon: 'settings' }
];

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

const defaultQuickActions: QuickAction[] = [
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
        id: 'add_transaction',
        label: 'Новая транзакция',
        icon: 'add_transaction',
        action: () => console.log('Add transaction')
    },
    {
        id: 'create_goal',
        label: 'Создать цель',
        icon: 'create_goal',
        action: () => console.log('Create goal')
    }
];

export const Header: React.FC<HeaderProps> = ({
    user = defaultUser,
    notifications = defaultNotifications,
    quickActions = defaultQuickActions,
    onMenuToggle,
    onNotificationClick,
    onUserMenuToggle,
    onQuickAction,
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

    const handleQuickAction = (action: QuickAction) => {
        onQuickAction?.(action);
        action.action();
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

                <QuickActions
                    actions={quickActions}
                    onActionClick={handleQuickAction}
                    className={styles.headerQuickActions}
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