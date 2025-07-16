import React, { useEffect, useRef, useState } from 'react';
import styles from './Header.module.scss';
import { User } from './Header.types';

interface UserMenuProps {
    user: User;
    onMenuToggle?: () => void;
    className?: string;
}

export const UserMenu: React.FC<UserMenuProps> = ({
    user,
    onMenuToggle,
    className
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

    const handleToggle = () => {
        setIsOpen(!isOpen);
        onMenuToggle?.();
    };

    const handleMenuItemClick = (action: string) => {
        // Здесь можно добавить обработку действий меню
        console.log(`Menu action: ${action}`);
        setIsOpen(false);
    };

    const formatBalance = (balance: number, currency: string) => {
        const formatter = new Intl.NumberFormat('ru-RU', {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
        });

        return formatter.format(balance);
    };

    return (
        <div className={`${styles.userMenuContainer} ${className || ''}`}>
            <button
                ref={buttonRef}
                className={styles.userMenuButton}
                onClick={handleToggle}
                aria-label={`Меню пользователя ${user.name}`}
                aria-expanded={isOpen}
            >
                <div className={styles.userAvatar}>
                    {user.avatar ? (
                        <img src={user.avatar} alt={user.name} className={styles.userAvatarImage} />
                    ) : (
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
                    )}
                </div>
                <div className={styles.userInfo}>
                    <span className={styles.userName}>{user.name}</span>
                    <span className={styles.userEmail}>{user.email}</span>
                </div>
                <svg
                    className={`${styles.userMenuArrow} ${isOpen ? styles.userMenuArrowOpen : ''}`}
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <polyline points="6,9 12,15 18,9" />
                </svg>
            </button>

            {isOpen && (
                <div ref={dropdownRef} className={styles.userMenuDropdown}>
                    <div className={styles.userMenuHeader}>
                        <div className={styles.userMenuAvatar}>
                            {user.avatar ? (
                                <img src={user.avatar} alt={user.name} className={styles.userMenuAvatarImage} />
                            ) : (
                                <svg
                                    width="40"
                                    height="40"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                    <circle cx="12" cy="7" r="4" />
                                </svg>
                            )}
                        </div>
                        <div className={styles.userMenuInfo}>
                            <h3 className={styles.userMenuName}>{user.name}</h3>
                            <p className={styles.userMenuEmail}>{user.email}</p>
                            <div className={styles.userMenuBalance}>
                                {formatBalance(user.balance, user.currency)}
                            </div>
                        </div>
                    </div>

                    <div className={styles.userMenuDivider} />

                    <div className={styles.userMenuList}>
                        <button
                            className={styles.userMenuItem}
                            onClick={() => handleMenuItemClick('profile')}
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                <circle cx="12" cy="7" r="4" />
                            </svg>
                            <span>Профиль</span>
                        </button>

                        <button
                            className={styles.userMenuItem}
                            onClick={() => handleMenuItemClick('settings')}
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="3" />
                                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                            </svg>
                            <span>Настройки</span>
                        </button>

                        <button
                            className={styles.userMenuItem}
                            onClick={() => handleMenuItemClick('help')}
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                                <line x1="12" y1="17" x2="12.01" y2="17" />
                            </svg>
                            <span>Помощь</span>
                        </button>
                    </div>

                    <div className={styles.userMenuDivider} />

                    <div className={styles.userMenuList}>
                        <button
                            className={`${styles.userMenuItem} ${styles.userMenuItemDanger}`}
                            onClick={() => handleMenuItemClick('logout')}
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                <polyline points="16,17 21,12 16,7" />
                                <line x1="21" y1="12" x2="9" y2="12" />
                            </svg>
                            <span>Выйти</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};