import clsx from 'clsx';
import React from 'react';
import styles from './Sidebar.module.scss';

export interface SidebarItem {
    id: string;
    label: string;
    icon?: React.ReactNode;
    href?: string;
    onClick?: () => void;
    children?: SidebarItem[];
}

export interface SidebarProps {
    items: SidebarItem[];
    isOpen?: boolean;
    activeItem?: string;
    onItemClick?: (item: SidebarItem) => void;
    className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
    items,
    isOpen = true,
    activeItem,
    onItemClick,
    className,
}) => {
    const handleItemClick = (item: SidebarItem) => {
        onItemClick?.(item);
    };

    const renderItem = (item: SidebarItem) => {
        const isActive = activeItem === item.id;

        return (
            <div key={item.id} className={styles.itemContainer}>
                <button
                    className={clsx(
                        styles.item,
                        { [styles['item--active']]: isActive }
                    )}
                    onClick={() => handleItemClick(item)}
                >
                    {item.icon && <span className={styles.icon}>{item.icon}</span>}
                    <span className={styles.label}>{item.label}</span>
                </button>
                {item.children && (
                    <div className={styles.children}>
                        {item.children.map(renderItem)}
                    </div>
                )}
            </div>
        );
    };

    return (
        <aside
            className={clsx(
                styles.sidebar,
                { [styles['sidebar--closed']]: !isOpen },
                className
            )}
        >
            <nav className={styles.nav}>
                {items.map(renderItem)}
            </nav>
        </aside>
    );
};