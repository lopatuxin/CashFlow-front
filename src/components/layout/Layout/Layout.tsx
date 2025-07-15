import clsx from 'clsx';
import React, { useState } from 'react';
import { Header } from '../Header';
import { Sidebar, SidebarItem } from '../Sidebar';
import styles from './Layout.module.scss';

export interface LayoutProps {
    children: React.ReactNode;
    sidebarItems?: SidebarItem[];
    title?: string;
    className?: string;
}

export const Layout: React.FC<LayoutProps> = ({
    children,
    sidebarItems = [],
    title,
    className,
}) => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [activeItem, setActiveItem] = useState<string>();

    const handleMenuToggle = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const handleSidebarItemClick = (item: SidebarItem) => {
        setActiveItem(item.id);
        item.onClick?.();
    };

    return (
        <div className={clsx(styles.layout, className)}>
            <Header
                title={title}
                onMenuToggle={handleMenuToggle}
                className={styles.header}
            />
            <div className={styles.content}>
                <Sidebar
                    items={sidebarItems}
                    isOpen={sidebarOpen}
                    activeItem={activeItem}
                    onItemClick={handleSidebarItemClick}
                    className={styles.sidebar}
                />
                <main className={styles.main}>
                    {children}
                </main>
            </div>
        </div>
    );
};