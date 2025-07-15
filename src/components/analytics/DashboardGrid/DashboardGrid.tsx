import clsx from 'clsx';
import React from 'react';
import styles from './DashboardGrid.module.scss';

export interface DashboardGridItem {
    id: string;
    component: React.ReactNode;
    size?: 'small' | 'medium' | 'large';
}

export interface DashboardGridProps {
    items: DashboardGridItem[];
    className?: string;
}

export const DashboardGrid: React.FC<DashboardGridProps> = ({
    items,
    className,
}) => {
    return (
        <div className={clsx(styles.grid, className)}>
            {items.map((item) => (
                <div
                    key={item.id}
                    className={clsx(
                        styles.item,
                        styles[`item--${item.size || 'medium'}`]
                    )}
                >
                    {item.component}
                </div>
            ))}
        </div>
    );
};