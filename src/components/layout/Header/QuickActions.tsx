import React, { useEffect, useRef, useState } from 'react';
import styles from './Header.module.scss';
import { QuickAction } from './Header.types';

interface QuickActionsProps {
    actions: QuickAction[];
    onActionClick: (action: QuickAction) => void;
    className?: string;
    isSidebar?: boolean;
}

export const QuickActions: React.FC<QuickActionsProps> = ({
    actions,
    onActionClick,
    className,
    isSidebar = false
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleActionClick = (action: QuickAction) => {
        onActionClick(action);
        setIsOpen(false);
    };

    const getActionIcon = (icon: string) => {
        const iconMap: Record<string, JSX.Element> = {
            add_income: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 5v14M5 12h14" />
                </svg>
            ),
            add_expense: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 5v14M5 12h14" />
                </svg>
            ),
            add_transaction: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 12l2 2 4-4" />
                    <path d="M21 12c-1 0-2-1-2-2s1-2 2-2 2 1 2 2-1 2-2 2z" />
                    <path d="M3 12c1 0 2-1 2-2s-1-2-2-2-2 1-2 2 1 2 2 2z" />
                </svg>
            ),
            create_goal: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <polygon points="10,8 16,12 10,16 10,8" />
                </svg>
            ),
            add_account: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                    <line x1="8" y1="21" x2="16" y2="21" />
                    <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
            )
        };

        return iconMap[icon] || (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M5 12h14" />
            </svg>
        );
    };

    // Применяем дополнительные классы для боковой панели
    const buttonClassName = isSidebar
        ? `${styles.quickActionsButton} ${styles.quickActionsSidebarButton}`
        : styles.quickActionsButton;

    const dropdownClassName = isSidebar
        ? `${styles.quickActionsDropdown} ${styles.quickActionsSidebarDropdown}`
        : styles.quickActionsDropdown;

    return (
        <div className={`${styles.quickActionsContainer} ${className || ''}`}>
            <button
                ref={buttonRef}
                className={buttonClassName}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Быстрые действия"
                aria-expanded={isOpen}
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 5v14M5 12h14" />
                </svg>
                <span className={styles.quickActionsLabel}>Действия</span>
            </button>

            {isOpen && (
                <div ref={dropdownRef} className={dropdownClassName}>
                    <div className={styles.quickActionsHeader}>
                        <h3>Быстрые действия</h3>
                    </div>

                    <div className={styles.quickActionsList}>
                        {actions.map((action) => (
                            <button
                                key={action.id}
                                className={`${styles.quickActionItem} ${action.variant === 'primary' ? styles.quickActionItemPrimary : ''}`}
                                onClick={() => handleActionClick(action)}
                            >
                                <div className={styles.quickActionIcon}>
                                    {getActionIcon(action.icon)}
                                </div>
                                <span className={styles.quickActionLabel}>{action.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};