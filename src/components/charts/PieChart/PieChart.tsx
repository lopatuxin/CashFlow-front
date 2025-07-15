import clsx from 'clsx';
import React from 'react';
import styles from './PieChart.module.scss';

export interface PieChartDataPoint {
    label: string;
    value: number;
    color?: string;
}

export interface PieChartProps {
    data: PieChartDataPoint[];
    title?: string;
    height?: number;
    className?: string;
}

export const PieChart: React.FC<PieChartProps> = ({
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
                    Pie Chart Component
                    <br />
                    Data points: {data.length}
                </div>
            </div>
        </div>
    );
};