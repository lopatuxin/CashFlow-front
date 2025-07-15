import clsx from 'clsx';
import React from 'react';
import styles from './GaugeChart.module.scss';

export interface GaugeChartProps {
    value: number;
    maxValue: number;
    title?: string;
    height?: number;
    className?: string;
}

export const GaugeChart: React.FC<GaugeChartProps> = ({
    value,
    maxValue,
    title,
    height = 200,
    className,
}) => {
    const percentage = Math.min((value / maxValue) * 100, 100);

    return (
        <div className={clsx(styles.container, className)} style={{ height }}>
            {title && <h3 className={styles.title}>{title}</h3>}
            <div className={styles.chart}>
                <div className={styles.placeholder}>
                    Gauge Chart Component
                    <br />
                    Value: {value} / {maxValue} ({percentage.toFixed(1)}%)
                </div>
            </div>
        </div>
    );
};