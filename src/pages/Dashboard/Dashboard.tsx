import React, { useEffect } from 'react';
import { DashboardGrid } from '../../components/analytics/DashboardGrid';
import { FilterPanel } from '../../components/analytics/FilterPanel';
import { MetricCard } from '../../components/analytics/MetricCard';
import { BarChart } from '../../components/charts/BarChart';
import { GaugeChart } from '../../components/charts/GaugeChart';
import { LineChart } from '../../components/charts/LineChart';
import { PieChart } from '../../components/charts/PieChart';
import { useAnalyticsStore } from '../../store/analyticsStore';
import styles from './Dashboard.module.scss';

export const Dashboard: React.FC = () => {
    const { metrics, charts, isLoading, error, fetchMetrics, fetchCharts } = useAnalyticsStore();

    useEffect(() => {
        fetchMetrics();
        fetchCharts();
    }, [fetchMetrics, fetchCharts]);

    // Моковые данные для демонстрации
    const mockMetrics = [
        {
            id: '1',
            title: 'Активные пользователи',
            value: '1,234',
            change: '+12.5%',
            changeType: 'positive',
            icon: 'users'
        },
        {
            id: '2',
            title: 'Объем данных',
            value: '2.5 TB',
            change: '+8.3%',
            changeType: 'positive',
            icon: 'database'
        },
        {
            id: '3',
            title: 'Производительность',
            value: '98.5%',
            change: '-2.1%',
            changeType: 'negative',
            icon: 'performance'
        },
        {
            id: '4',
            title: 'Подключения',
            value: '45',
            change: '+5.2%',
            changeType: 'positive',
            icon: 'connections'
        }
    ];

    const mockLineChartData = {
        title: 'Тренды активности',
        data: [
            { x: 'Пн', y: 120 },
            { x: 'Вт', y: 150 },
            { x: 'Ср', y: 180 },
            { x: 'Чт', y: 200 },
            { x: 'Пт', y: 220 },
            { x: 'Сб', y: 180 },
            { x: 'Вс', y: 160 }
        ]
    };

    const mockBarChartData = {
        title: 'Распределение по категориям',
        data: [
            { label: 'Категория A', value: 30 },
            { label: 'Категория B', value: 45 },
            { label: 'Категория C', value: 25 },
            { label: 'Категория D', value: 60 }
        ]
    };

    const mockPieChartData = {
        title: 'Доля источников данных',
        data: [
            { label: 'API', value: 40 },
            { label: 'База данных', value: 35 },
            { label: 'Файлы', value: 15 },
            { label: 'Потоки', value: 10 }
        ]
    };

    const mockGaugeData = {
        title: 'Загрузка системы',
        value: 75,
        maxValue: 100
    };

    const mockFilters = {
        dateRange: {
            label: 'Период',
            type: 'date' as const,
            value: new Date()
        },
        category: {
            label: 'Категория',
            type: 'select' as const,
            options: [
                { value: 'all', label: 'Все' },
                { value: 'users', label: 'Пользователи' },
                { value: 'data', label: 'Данные' }
            ],
            value: 'all'
        }
    };

    const dashboardItems = [
        {
            id: 'line-chart',
            component: (
                <LineChart
                    title={mockLineChartData.title}
                    data={mockLineChartData.data}
                    height={300}
                />
            ),
            size: 'large' as const
        },
        {
            id: 'bar-chart',
            component: (
                <BarChart
                    title={mockBarChartData.title}
                    data={mockBarChartData.data}
                    height={300}
                />
            ),
            size: 'medium' as const
        },
        {
            id: 'pie-chart',
            component: (
                <PieChart
                    title={mockPieChartData.title}
                    data={mockPieChartData.data}
                    height={300}
                />
            ),
            size: 'medium' as const
        },
        {
            id: 'gauge-chart',
            component: (
                <GaugeChart
                    title={mockGaugeData.title}
                    value={mockGaugeData.value}
                    maxValue={mockGaugeData.maxValue}
                    height={300}
                />
            ),
            size: 'small' as const
        }
    ];

    if (isLoading) {
        return (
            <div className={styles.dashboard}>
                <div className={styles.loading}>Загрузка аналитических данных...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.dashboard}>
                <div className={styles.error}>Ошибка загрузки данных: {error}</div>
            </div>
        );
    }

    return (
        <div className={styles.dashboard}>
            <div className={styles.dashboardHeader}>
                <h1>Аналитический дашборд</h1>
                <p>Обзор ключевых метрик и показателей системы</p>
            </div>

            <FilterPanel
                filters={mockFilters}
                className={styles.filterPanel}
            />

            <div className={styles.metricsGrid}>
                {mockMetrics.map(metric => (
                    <MetricCard
                        key={metric.id}
                        title={metric.title}
                        value={metric.value}
                        change={{
                            value: parseFloat(metric.change.replace(/[+\-%]/g, '')),
                            type: metric.changeType === 'positive' ? 'increase' : 'decrease'
                        }}
                        icon={metric.icon}
                    />
                ))}
            </div>

            <DashboardGrid
                items={dashboardItems}
                className={styles.dashboardGrid}
            />
        </div>
    );
};