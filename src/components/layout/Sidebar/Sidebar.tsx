import React from 'react';
import styles from './Sidebar.module.scss';

export interface SidebarProps {
    isOpen?: boolean;
    onToggle?: () => void;
    className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
    isOpen = true,
    onToggle,
    className,
}) => {
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
                {/* Содержимое бокового меню */}
            </div>
        </aside>
    );
};