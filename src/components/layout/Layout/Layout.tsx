import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Layout.module.scss';

interface LayoutProps {
    children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    return (
        <div className={styles.layout}>
            <header className={styles.header}>
                <h1>Analytics Dashboard</h1>
                <nav className={styles.nav}>
                    <Link
                        to="/dashboard"
                        className={`${styles.navLink} ${isActive('/dashboard') ? styles.active : ''}`}
                    >
                        Дашборд
                    </Link>
                    <Link
                        to="/analytics"
                        className={`${styles.navLink} ${isActive('/analytics') ? styles.active : ''}`}
                    >
                        Аналитика
                    </Link>
                    <Link
                        to="/reports"
                        className={`${styles.navLink} ${isActive('/reports') ? styles.active : ''}`}
                    >
                        Отчеты
                    </Link>
                    <Link
                        to="/settings"
                        className={`${styles.navLink} ${isActive('/settings') ? styles.active : ''}`}
                    >
                        Настройки
                    </Link>
                </nav>
            </header>
            <main className={styles.main}>
                {children}
            </main>
        </div>
    );
};