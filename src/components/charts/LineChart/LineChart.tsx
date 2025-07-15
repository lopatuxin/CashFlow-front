import clsx from 'clsx';
import React from 'react';
import styles from './LineChart.module.scss';

export interface LineChartDataPoint {
    x: string | number;
    y: number;
}

export interface LineChartProps {
    data: LineChartDataPoint[];
    title?: string;
    height?: number;
    width?: number;
    className?: string;
}

export const LineChart: React.FC<LineChartProps> = ({
    data,
    title,
    height = 300,
    width,
    className,
}) => {
    // Здесь будет логика для отрисовки графика
    // Пока что просто заглушка
    return (
        <div
            className={clsx(styles.container, className)}
            style={{ height, width }}
        >
            {title && <h3 className={styles.title}>{title}</h3>}
            <div className={styles.chart}>
                <div className={styles.placeholder}>
                    Line Chart Component
                    <br />
                    Data points: {data.length}
                </div>
            </div>
        </div>
    );
};