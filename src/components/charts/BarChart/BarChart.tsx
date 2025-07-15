import clsx from 'clsx';
import React from 'react';
import styles from './BarChart.module.scss';

export interface BarChartDataPoint {
    label: string;
    value: number;
    color?: string;
}

export interface BarChartProps {
    data: BarChartDataPoint[];
    title?: string;
    height?: number;
    className?: string;
}

export const BarChart: React.FC<BarChartProps> = ({
    data,
    title,
    height = 300,
    className,
}) => {
    return (
        <div className={clsx(styles.container, className)} style={{ height }}>
            {title && <h3 className={styles.title}>{title}</h3>}
            <div className={styles.chart}>
                <div className={styles.placeholder}>
                    Bar Chart Component
                    <br />
                    Data points: {data.length}
                </div>
            </div>
        </div>
    );
};