import { ChartData, DashboardWidget, FilterOptions, MetricData } from '@/types/analytics';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { BaseState } from './types';

interface AnalyticsState extends BaseState {
    // Данные
    metrics: MetricData[];
    charts: ChartData[];
    dashboardWidgets: DashboardWidget[];
    filters: FilterOptions;

    // Действия
    setMetrics: (metrics: MetricData[]) => void;
    setCharts: (charts: ChartData[]) => void;
    setDashboardWidgets: (widgets: DashboardWidget[]) => void;
    setFilters: (filters: FilterOptions) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;

    // Асинхронные действия
    fetchMetrics: () => Promise<void>;
    fetchCharts: () => Promise<void>;
    fetchDashboardData: () => Promise<void>;
    updateWidgetPosition: (widgetId: string, position: { x: number; y: number; width: number; height: number }) => void;
}

export const useAnalyticsStore = create<AnalyticsState>()(
    devtools(
        (set, get) => ({
            // Начальное состояние
            metrics: [],
            charts: [],
            dashboardWidgets: [],
            filters: {
                dateRange: {
                    start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 дней назад
                    end: new Date(),
                },
                categories: [],
                metrics: [],
            },
            isLoading: false,
            error: null,

            // Синхронные действия
            setMetrics: (metrics) => set({ metrics }),
            setCharts: (charts) => set({ charts }),
            setDashboardWidgets: (dashboardWidgets) => set({ dashboardWidgets }),
            setFilters: (filters) => set({ filters }),
            setLoading: (isLoading) => set({ isLoading }),
            setError: (error) => set({ error }),

            // Асинхронные действия
            fetchMetrics: async () => {
                set({ isLoading: true, error: null });
                try {
                    // Здесь будет вызов API
                    // const metrics = await AnalyticsApi.getMetrics(get().filters);
                    const metrics: MetricData[] = [
                        {
                            id: '1',
                            name: 'Общий доход',
                            value: 125000,
                            change: 12.5,
                            trend: 'up',
                        },
                        {
                            id: '2',
                            name: 'Расходы',
                            value: 85000,
                            change: -5.2,
                            trend: 'down',
                        },
                        {
                            id: '3',
                            name: 'Прибыль',
                            value: 40000,
                            change: 8.7,
                            trend: 'up',
                        },
                    ];
                    set({ metrics, isLoading: false });
                } catch (error) {
                    set({
                        error: error instanceof Error ? error.message : 'Неизвестная ошибка',
                        isLoading: false
                    });
                }
            },

            fetchCharts: async () => {
                set({ isLoading: true, error: null });
                try {
                    // Здесь будет вызов API
                    // const charts = await AnalyticsApi.getCharts(get().filters);
                    const charts: ChartData[] = [
                        {
                            labels: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн'],
                            datasets: [
                                {
                                    label: 'Доходы',
                                    data: [65000, 72000, 68000, 75000, 82000, 125000],
                                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                                    borderColor: 'rgba(75, 192, 192, 1)',
                                },
                                {
                                    label: 'Расходы',
                                    data: [45000, 48000, 52000, 58000, 62000, 85000],
                                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                                    borderColor: 'rgba(255, 99, 132, 1)',
                                },
                            ],
                        },
                    ];
                    set({ charts, isLoading: false });
                } catch (error) {
                    set({
                        error: error instanceof Error ? error.message : 'Неизвестная ошибка',
                        isLoading: false
                    });
                }
            },

            fetchDashboardData: async () => {
                set({ isLoading: true, error: null });
                try {
                    // Здесь будет вызов API
                    // const data = await AnalyticsApi.getDashboardData(get().filters);

                    // Загружаем метрики и графики одновременно
                    await Promise.all([
                        get().fetchMetrics(),
                        get().fetchCharts(),
                    ]);

                    // Создаем виджеты дашборда
                    const widgets: DashboardWidget[] = [
                        {
                            id: 'metric-1',
                            type: 'metric',
                            title: 'Общий доход',
                            data: get().metrics[0] || {
                                id: '1',
                                name: 'Общий доход',
                                value: 125000,
                                change: 12.5,
                                trend: 'up',
                            },
                            position: { x: 0, y: 0, width: 300, height: 150 },
                        },
                        {
                            id: 'chart-1',
                            type: 'chart',
                            title: 'Динамика доходов и расходов',
                            data: get().charts[0] || {
                                labels: [],
                                datasets: [],
                            },
                            position: { x: 320, y: 0, width: 600, height: 300 },
                        },
                    ];

                    set({ dashboardWidgets: widgets, isLoading: false });
                } catch (error) {
                    set({
                        error: error instanceof Error ? error.message : 'Неизвестная ошибка',
                        isLoading: false
                    });
                }
            },

            updateWidgetPosition: (widgetId, position) => {
                set((state) => ({
                    dashboardWidgets: state.dashboardWidgets.map((widget) =>
                        widget.id === widgetId ? { ...widget, position } : widget
                    ),
                }));
            },
        }),
        {
            name: 'analytics-store',
        }
    )
);