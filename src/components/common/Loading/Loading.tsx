import clsx from 'clsx';
import React from 'react';
import styles from './Loading.module.scss';

export interface LoadingProps {
    size?: 'sm' | 'md' | 'lg';
    variant?: 'spinner' | 'dots' | 'pulse';
    text?: string;
    className?: string;
}

export const Loading: React.FC<LoadingProps> = ({
    size = 'md',
    variant = 'spinner',
    text,
    className,
}) => {
    return (
        <div className={clsx(styles.container, className)}>
            <div
                className={clsx(
                    styles.loader,
                    styles[`loader--${variant}`],
                    styles[`loader--${size}`]
                )}
            />
            {text && <p className={styles.text}>{text}</p>}
        </div>
    );
};