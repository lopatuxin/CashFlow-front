import clsx from 'clsx';
import React from 'react';
import styles from './Card.module.scss';

export interface CardProps {
    children: React.ReactNode;
    title?: string;
    subtitle?: string;
    className?: string;
    padding?: 'none' | 'sm' | 'md' | 'lg';
    shadow?: 'none' | 'sm' | 'md' | 'lg';
    border?: boolean;
}

export const Card: React.FC<CardProps> = ({
    children,
    title,
    subtitle,
    className,
    padding = 'md',
    shadow = 'md',
    border = true,
}) => {
    return (
        <div
            className={clsx(
                styles.card,
                styles[`card--padding-${padding}`],
                styles[`card--shadow-${shadow}`],
                { [styles['card--border']]: border },
                className
            )}
        >
            {(title || subtitle) && (
                <div className={styles.header}>
                    {title && <h3 className={styles.title}>{title}</h3>}
                    {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
                </div>
            )}
            <div className={styles.content}>{children}</div>
        </div>
    );
};