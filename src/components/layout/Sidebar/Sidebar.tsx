import React from 'react';
import { QuickAction } from '../Header/Header.types';
import { QuickActions } from '../Header/QuickActions';
import styles from './Sidebar.module.scss';

export interface SidebarProps {
    isOpen?: boolean;
    onToggle?: () => void;
    className?: string;
    quickActions?: QuickAction[];
    onQuickAction?: (action: QuickAction) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
    isOpen = true,
    onToggle,
    className,
    quickActions = [],
    onQuickAction,
}) => {
    const handleQuickAction = (action: QuickAction) => {
        if (onQuickAction) {
            onQuickAction(action);
        }
        action.action();
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