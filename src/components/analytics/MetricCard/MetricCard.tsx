import clsx from 'clsx';
import React from 'react';
import styles from './MetricCard.module.scss';

export interface MetricCardProps {
    title: string;
    value: string | number;
    change?: {
        value: number;
        type: 'increase' | 'decrease';
    };
    icon?: React.ReactNode;
    className?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
    title,
    value,
    change,
    icon,
    className,
}) => {
    return (
        <div className={clsx(styles.card, className)}>
            <div className={styles.header}>
                {icon && <div className={styles.icon}>{icon}</div>}
                <div className={styles.content}>
                    <h3 className={styles.title}>{title}</h3>
                    <div className={styles.value}>{value}</div>
                    {change && (
                        <div
                            className={clsx(
                                styles.change,
                                styles[`change--${change.type}`]
                            )}
                        >
                            {change.type === 'increase' ? '+' : ''}
                            {change.value}%
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};