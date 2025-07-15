import clsx from 'clsx';
import React from 'react';
import styles from './Header.module.scss';

export interface HeaderProps {
    title?: string;
    onMenuToggle?: () => void;
    className?: string;
}

export const Header: React.FC<HeaderProps> = ({
    title = 'Analytics Dashboard',
    onMenuToggle,
    className,
}) => {
    return (
        <header className={clsx(styles.header, className)}>
            <div className={styles.left}>
                {onMenuToggle && (
                    <button
                        className={styles.menuButton}
                        onClick={onMenuToggle}
                        aria-label="Открыть меню"
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
                <h1 className={styles.title}>{title}</h1>
            </div>
            <div className={styles.right}>
                <div className={styles.userMenu}>
                    <button className={styles.userButton}>
                        <div className={styles.userAvatar}>
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                <circle cx="12" cy="7" r="4" />
                            </svg>
                        </div>
                        <span className={styles.userName}>Пользователь</span>
                    </button>
                </div>
            </div>
        </header>
    );
};