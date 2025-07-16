import React, { useEffect, useRef, useState } from 'react';
import styles from './Header.module.scss';
import { Notification } from './Header.types';

interface NotificationsButtonProps {
    notifications: Notification[];
    onNotificationClick: (notification: Notification) => void;
    className?: string;
}

export const NotificationsButton: React.FC<NotificationsButtonProps> = ({
    notifications,
    onNotificationClick,
    className
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const unreadCount = notifications.filter(n => !n.isRead).length;
    const highPriorityCount = notifications.filter(n => n.priority === 'high' && !n.isRead).length;

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

    const handleNotificationClick = (notification: Notification) => {
        onNotificationClick(notification);
        setIsOpen(false);
    };

    const getPriorityIcon = (priority: Notification['priority']) => {
        switch (priority) {
            case 'high':
                return (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                        <line x1="12" y1="9" x2="12" y2="13" />
                        <line x1="12" y1="17" x2="12.01" y2="17" />
                    </svg>
                );
            case 'medium':
                return (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                );
            default:
                return (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                        <line x1="9" y1="9" x2="9.01" y2="9" />
                        <line x1="15" y1="9" x2="15.01" y2="9" />
                    </svg>
                );
        }
    };

    const getTypeIcon = (type: Notification['type']) => {
        switch (type) {
            case 'budget_exceeded':
                return (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                );
            case 'large_transaction':
                return (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 12l2 2 4-4" />
                        <path d="M21 12c-1 0-2-1-2-2s1-2 2-2 2 1 2 2-1 2-2 2z" />
                        <path d="M3 12c1 0 2-1 2-2s-1-2-2-2-2 1-2 2 1 2 2 2z" />
                    </svg>
                );
            case 'goal_achieved':
                return (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <polygon points="10,8 16,12 10,16 10,8" />
                    </svg>
                );
            default:
                return (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                        <line x1="9" y1="9" x2="9.01" y2="9" />
                        <line x1="15" y1="9" x2="15.01" y2="9" />
                    </svg>
                );
        }
    };

    return (
        <div className={`${styles.notificationsContainer} ${className || ''}`}>
            <button
                ref={buttonRef}
                className={styles.notificationsButton}
                onClick={() => setIsOpen(!isOpen)}
                aria-label={`Уведомления ${unreadCount > 0 ? `(${unreadCount} непрочитанных)` : ''}`}
                aria-expanded={isOpen}
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                </svg>
                {unreadCount > 0 && (
                    <span className={`${styles.notificationsBadge} ${highPriorityCount > 0 ? styles.notificationsBadgeHigh : ''}`}>
                        {unreadCount}
                    </span>
                )}
            </button>

            {isOpen && (
                <div ref={dropdownRef} className={styles.notificationsDropdown}>
                    <div className={styles.notificationsHeader}>
                        <h3>Уведомления</h3>
                        {unreadCount > 0 && (
                            <span className={styles.notificationsCount}>{unreadCount} новых</span>
                        )}
                    </div>

                    <div className={styles.notificationsList}>
                        {notifications.length === 0 ? (
                            <div className={styles.notificationsEmpty}>
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                                    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                                    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                                </svg>
                                <p>Нет новых уведомлений</p>
                            </div>
                        ) : (
                            notifications.slice(0, 5).map((notification) => (
                                <button
                                    key={notification.id}
                                    className={`${styles.notificationItem} ${!notification.isRead ? styles.notificationItemUnread : ''}`}
                                    onClick={() => handleNotificationClick(notification)}
                                >
                                    <div className={styles.notificationIcon}>
                                        {getTypeIcon(notification.type)}
                                    </div>
                                    <div className={styles.notificationContent}>
                                        <div className={styles.notificationHeader}>
                                            <span className={styles.notificationTitle}>{notification.title}</span>
                                            {notification.priority === 'high' && (
                                                <span className={styles.notificationPriority}>
                                                    {getPriorityIcon(notification.priority)}
                                                </span>
                                            )}
                                        </div>
                                        <p className={styles.notificationMessage}>{notification.message}</p>
                                        <span className={styles.notificationTime}>
                                            {new Date(notification.timestamp).toLocaleString('ru-RU')}
                                        </span>
                                    </div>
                                </button>
                            ))
                        )}
                    </div>

                    {notifications.length > 5 && (
                        <div className={styles.notificationsFooter}>
                            <button className={styles.notificationsViewAll}>
                                Показать все уведомления
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};