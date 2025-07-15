import clsx from 'clsx';
import React from 'react';
import styles from './FilterPanel.module.scss';

export interface FilterOption {
    value: string;
    label: string;
}

export interface FilterPanelProps {
    title?: string;
    filters: {
        [key: string]: {
            label: string;
            type: 'select' | 'date' | 'text';
            options?: FilterOption[];
            value?: any;
        };
    };
    onFilterChange?: (key: string, value: any) => void;
    className?: string;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
    title = 'Фильтры',
    filters,
    onFilterChange,
    className,
}) => {
    return (
        <div className={clsx(styles.container, className)}>
            <h3 className={styles.title}>{title}</h3>
            <div className={styles.filters}>
                {Object.entries(filters).map(([key, filter]) => (
                    <div key={key} className={styles.filter}>
                        <label className={styles.label}>{filter.label}</label>
                        <div className={styles.input}>
                            Filter input for {filter.type}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};