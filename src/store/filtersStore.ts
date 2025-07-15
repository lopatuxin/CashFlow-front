import { FilterOptions } from '@/types/analytics';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { BaseState } from './types';

interface FiltersState extends BaseState {
    // Фильтры
    currentFilters: FilterOptions;
    savedFilters: Array<{
        id: string;
        name: string;
        filters: FilterOptions;
        isDefault: boolean;
    }>;
    availableCategories: string[];
    availableMetrics: string[];

    // Действия
    setCurrentFilters: (filters: FilterOptions) => void;
    updateDateRange: (start: Date, end: Date) => void;
    updateCategories: (categories: string[]) => void;
    updateMetrics: (metrics: string[]) => void;
    resetFilters: () => void;
    saveFilter: (name: string, filters: FilterOptions) => void;
    deleteFilter: (id: string) => void;
    loadFilter: (id: string) => void;
    setAvailableCategories: (categories: string[]) => void;
    setAvailableMetrics: (metrics: string[]) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;

    // Асинхронные действия
    fetchAvailableFilters: () => Promise<void>;
    saveFilterToServer: (name: string, filters: FilterOptions) => Promise<void>;
    loadFiltersFromServer: () => Promise<void>;
}

export const useFiltersStore = create<FiltersState>()(
    devtools(
        (set, get) => ({
            // Начальное состояние
            currentFilters: {
                dateRange: {
                    start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 дней назад
                    end: new Date(),
                },
                categories: [],
                metrics: [],
            },
            savedFilters: [
                {
                    id: 'default',
                    name: 'По умолчанию',
                    filters: {
                        dateRange: {
                            start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
                            end: new Date(),
                        },
                        categories: [],
                        metrics: [],
                    },
                    isDefault: true,
                },
            ],
            availableCategories: [
                'Доходы',
                'Расходы',
                'Инвестиции',
                'Сбережения',
                'Кредиты',
            ],
            availableMetrics: [
                'Общий доход',
                'Общие расходы',
                'Чистая прибыль',
                'ROI',
                'Темп роста',
            ],
            isLoading: false,
            error: null,

            // Синхронные действия
            setCurrentFilters: (filters) => set({ currentFilters: filters }),

            updateDateRange: (start, end) =>
                set((state) => ({
                    currentFilters: {
                        ...state.currentFilters,
                        dateRange: { start, end },
                    },
                })),

            updateCategories: (categories) =>
                set((state) => ({
                    currentFilters: {
                        ...state.currentFilters,
                        categories,
                    },
                })),

            updateMetrics: (metrics) =>
                set((state) => ({
                    currentFilters: {
                        ...state.currentFilters,
                        metrics,
                    },
                })),

            resetFilters: () => {
                const defaultFilter = get().savedFilters.find((f) => f.isDefault);
                if (defaultFilter) {
                    set({ currentFilters: defaultFilter.filters });
                }
            },

            saveFilter: (name, filters) => {
                const newFilter = {
                    id: Date.now().toString(),
                    name,
                    filters,
                    isDefault: false,
                };

                set((state) => ({
                    savedFilters: [...state.savedFilters, newFilter],
                }));
            },

            deleteFilter: (id) =>
                set((state) => ({
                    savedFilters: state.savedFilters.filter((f) => f.id !== id),
                })),

            loadFilter: (id) => {
                const filter = get().savedFilters.find((f) => f.id === id);
                if (filter) {
                    set({ currentFilters: filter.filters });
                }
            },

            setAvailableCategories: (categories) => set({ availableCategories: categories }),
            setAvailableMetrics: (metrics) => set({ availableMetrics: metrics }),
            setLoading: (isLoading) => set({ isLoading }),
            setError: (error) => set({ error }),

            // Асинхронные действия
            fetchAvailableFilters: async () => {
                set({ isLoading: true, error: null });
                try {
                    // Здесь будет вызов API для получения доступных фильтров
                    // const { categories, metrics } = await FiltersApi.getAvailable();

                    // Имитация получения данных
                    const categories = [
                        'Доходы',
                        'Расходы',
                        'Инвестиции',
                        'Сбережения',
                        'Кредиты',
                        'Налоги',
                        'Страхование',
                    ];

                    const metrics = [
                        'Общий доход',
                        'Общие расходы',
                        'Чистая прибыль',
                        'ROI',
                        'Темп роста',
                        'Маржинальность',
                        'Ликвидность',
                    ];

                    set({
                        availableCategories: categories,
                        availableMetrics: metrics,
                        isLoading: false,
                    });
                } catch (error) {
                    set({
                        error: error instanceof Error ? error.message : 'Ошибка загрузки фильтров',
                        isLoading: false,
                    });
                }
            },

            saveFilterToServer: async (name, filters) => {
                set({ isLoading: true, error: null });
                try {
                    // Здесь будет вызов API для сохранения фильтра
                    // await FiltersApi.save(name, filters);

                    // Имитация сохранения
                    const newFilter = {
                        id: Date.now().toString(),
                        name,
                        filters,
                        isDefault: false,
                    };

                    set((state) => ({
                        savedFilters: [...state.savedFilters, newFilter],
                        isLoading: false,
                    }));
                } catch (error) {
                    set({
                        error: error instanceof Error ? error.message : 'Ошибка сохранения фильтра',
                        isLoading: false,
                    });
                }
            },

            loadFiltersFromServer: async () => {
                set({ isLoading: true, error: null });
                try {
                    // Здесь будет вызов API для загрузки сохраненных фильтров
                    // const savedFilters = await FiltersApi.getSaved();

                    // Имитация загрузки
                    const savedFilters = [
                        {
                            id: 'default',
                            name: 'По умолчанию',
                            filters: {
                                dateRange: {
                                    start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
                                    end: new Date(),
                                },
                                categories: [],
                                metrics: [],
                            },
                            isDefault: true,
                        },
                        {
                            id: 'monthly',
                            name: 'Месячный отчет',
                            filters: {
                                dateRange: {
                                    start: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                                    end: new Date(),
                                },
                                categories: ['Доходы', 'Расходы'],
                                metrics: ['Общий доход', 'Общие расходы'],
                            },
                            isDefault: false,
                        },
                    ];

                    set({
                        savedFilters,
                        isLoading: false,
                    });
                } catch (error) {
                    set({
                        error: error instanceof Error ? error.message : 'Ошибка загрузки фильтров',
                        isLoading: false,
                    });
                }
            },
        }),
        {
            name: 'filters-store',
        }
    )
);