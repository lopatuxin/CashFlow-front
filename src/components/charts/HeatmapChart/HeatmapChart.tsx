import clsx from 'clsx';
import React from 'react';
import styles from './HeatmapChart.module.scss';

export interface HeatmapDataPoint {
    x: string | number;
    y: string | number;
    value: number;
}

export interface HeatmapChartProps {
    data: HeatmapDataPoint[];
    title?: string;
    height?: number;
    className?: string;
}

export const HeatmapChart: React.FC<HeatmapChartProps> = ({
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
                    Heatmap Chart Component
                    <br />
                    Data points: {data.length}
                </div>
            </div>
        </div>
    );
};