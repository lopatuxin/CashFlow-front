import React, { useState } from 'react';
import { NavigationItem, QuickAction } from '../Header/Header.types';
import { QuickActions } from '../Header/QuickActions';
import styles from './Sidebar.module.scss';

export interface SidebarProps {
    isOpen?: boolean;
    onToggle?: () => void;
    className?: string;
    quickActions?: QuickAction[];
    onQuickAction?: (action: QuickAction) => void;
    onNavigationClick?: (item: NavigationItem) => void;
}

// Компонент для отображения навигационных элементов в боковой панели
const SidebarNavigation: React.FC<{
    items: NavigationItem[];
    onItemClick: (item: NavigationItem) => void;
}> = ({ items, onItemClick }) => {
    const renderIcon = (icon?: string) => {
        if (!icon) return null;

        // Используем те же иконки, что и в Navigation.tsx
        const iconMap: Record<string, React.ReactNode> = {
            investments: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
            ),
            budget: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
            ),
            goals: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <polygon points="10,8 16,12 10,16 10,8" />
                </svg>
            ),
            settings: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
            ),
            // Можно добавить другие иконки по необходимости
        };

        return iconMap[icon] || null;
    };

    // Обработчик клика по элементу навигации с анимацией
    const handleItemClick = (item: NavigationItem) => {
        // Добавляем эффект нажатия перед вызовом обработчика
        const button = document.querySelector(`[data-nav-id="${item.id}"]`) as HTMLElement;
        if (button) {
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = '';
                onItemClick(item);
            }, 100);
        } else {
            onItemClick(item);
        }
    };

    return (
        <nav className={styles.sidebarNavigation}>
            <ul className={styles.sidebarNavigationList}>
                {items.map((item) => (
                    <li key={item.id} className={styles.sidebarNavigationItem}>
                        <button
                            data-nav-id={item.id}
                            className={`${styles.sidebarNavigationButton} ${item.isActive ? styles.sidebarNavigationButtonActive : ''}`}
                            onClick={() => handleItemClick(item)}
                            aria-label={item.label}
                            aria-current={item.isActive ? 'page' : undefined}
                            style={{ transition: 'all 0.2s ease' }}
                        >
                            {renderIcon(item.icon)}
                            <span className={styles.sidebarNavigationLabel}>{item.label}</span>
                            {item.badge && item.badge > 0 && (
                                <span className={styles.sidebarNavigationBadge}>{item.badge}</span>
                            )}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export const Sidebar: React.FC<SidebarProps> = ({
    isOpen = true,
    onToggle,
    className,
    quickActions = [],
    onQuickAction,
    onNavigationClick,
}) => {
    // Добавляем пункты навигации в боковую панель
    const [sidebarNavItems, setSidebarNavItems] = useState<NavigationItem[]>([
        { id: 'budget', label: 'Бюджет', path: '/budget', icon: 'budget' },
        { id: 'investments', label: 'Инвестиции', path: '/investments', icon: 'investments' },
        { id: 'goals', label: 'Цели', path: '/goals', icon: 'goals' },
        { id: 'settings', label: 'Настройки', path: '/settings', icon: 'settings' }
    ]);

    const handleQuickAction = (action: QuickAction) => {
        if (onQuickAction) {
            onQuickAction(action);
        }
        action.action();
    };

    const handleNavigationClick = (item: NavigationItem) => {
        // Обновляем активное состояние элемента навигации
        setSidebarNavItems(prev =>
            prev.map(navItem => ({
                ...navItem,
                isActive: navItem.id === item.id
            }))
        );

        if (onNavigationClick) {
            onNavigationClick(item);
        }
    };

    return (
        <aside
            className={`${styles.sidebar} ${!isOpen ? styles['sidebar--closed'] : ''} ${className || ''}`}
        >
            <button
                className={styles.toggleButton}
                onClick={onToggle}
                aria-label={isOpen ? 'Свернуть панель' : 'Развернуть панель'}
            >
                {isOpen ? '←' : '→'}
            </button>
            <div className={styles.sidebarContent}>
                {/* Добавляем навигационный компонент с пунктом "Инвестиции" */}
                <SidebarNavigation
                    items={sidebarNavItems}
                    onItemClick={handleNavigationClick}
                />

                {quickActions.length > 0 && (
                    <div className={styles.quickActions}>
                        <QuickActions
                            actions={quickActions}
                            onActionClick={handleQuickAction}
                            className={styles.sidebarQuickActions}
                            isSidebar={true}
                        />
                    </div>
                )}
                {/* Содержимое бокового меню */}
            </div>
        </aside>
    );
};