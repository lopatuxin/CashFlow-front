// Утилиты для работы с localStorage

// Типы для storage
export interface StorageItem<T = any> {
    value: T;
    timestamp: number;
    expiresAt?: number;
}

export interface StorageConfig {
    prefix?: string;
    defaultTTL?: number; // Time to live в миллисекундах
}

// Константы
const DEFAULT_PREFIX = 'analytics_dashboard_';
const DEFAULT_TTL = 24 * 60 * 60 * 1000; // 24 часа

// Класс для работы с localStorage
export class LocalStorage {
    private prefix: string;
    private defaultTTL: number;

    constructor(config: StorageConfig = {}) {
        this.prefix = config.prefix || DEFAULT_PREFIX;
        this.defaultTTL = config.defaultTTL || DEFAULT_TTL;
    }

    // Генерация ключа с префиксом
    private getKey(key: string): string {
        return `${this.prefix}${key}`;
    }

    // Проверка поддержки localStorage
    private isSupported(): boolean {
        try {
            const test = '__localStorage_test__';
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        } catch {
            return false;
        }
    }

    // Сохранение данных
    set<T>(key: string, value: T, ttl?: number): boolean {
        if (!this.isSupported()) {
            console.warn('localStorage не поддерживается');
            return false;
        }

        try {
            const storageKey = this.getKey(key);
            const expiresAt = ttl ? Date.now() + ttl : Date.now() + this.defaultTTL;

            const item: StorageItem<T> = {
                value,
                timestamp: Date.now(),
                expiresAt,
            };

            localStorage.setItem(storageKey, JSON.stringify(item));
            return true;
        } catch (error) {
            console.error('Ошибка сохранения в localStorage:', error);
            return false;
        }
    }

    // Получение данных
    get<T>(key: string): T | null {
        if (!this.isSupported()) {
            return null;
        }

        try {
            const storageKey = this.getKey(key);
            const item = localStorage.getItem(storageKey);

            if (!item) {
                return null;
            }

            const parsedItem: StorageItem<T> = JSON.parse(item);

            // Проверка срока действия
            if (parsedItem.expiresAt && Date.now() > parsedItem.expiresAt) {
                this.remove(key);
                return null;
            }

            return parsedItem.value;
        } catch (error) {
            console.error('Ошибка чтения из localStorage:', error);
            return null;
        }
    }

    // Удаление данных
    remove(key: string): boolean {
        if (!this.isSupported()) {
            return false;
        }

        try {
            const storageKey = this.getKey(key);
            localStorage.removeItem(storageKey);
            return true;
        } catch (error) {
            console.error('Ошибка удаления из localStorage:', error);
            return false;
        }
    }

    // Проверка существования ключа
    has(key: string): boolean {
        if (!this.isSupported()) {
            return false;
        }

        const storageKey = this.getKey(key);
        return localStorage.getItem(storageKey) !== null;
    }

    // Очистка всех данных с префиксом
    clear(): boolean {
        if (!this.isSupported()) {
            return false;
        }

        try {
            const keys = Object.keys(localStorage);
            const prefixedKeys = keys.filter(key => key.startsWith(this.prefix));

            prefixedKeys.forEach(key => {
                localStorage.removeItem(key);
            });

            return true;
        } catch (error) {
            console.error('Ошибка очистки localStorage:', error);
            return false;
        }
    }

    // Получение всех ключей с префиксом
    keys(): string[] {
        if (!this.isSupported()) {
            return [];
        }

        try {
            const keys = Object.keys(localStorage);
            return keys
                .filter(key => key.startsWith(this.prefix))
                .map(key => key.replace(this.prefix, ''));
        } catch (error) {
            console.error('Ошибка получения ключей localStorage:', error);
            return [];
        }
    }

    // Получение размера данных
    size(): number {
        if (!this.isSupported()) {
            return 0;
        }

        try {
            const keys = this.keys();
            let totalSize = 0;

            keys.forEach(key => {
                const storageKey = this.getKey(key);
                const item = localStorage.getItem(storageKey);
                if (item) {
                    totalSize += item.length;
                }
            });

            return totalSize;
        } catch (error) {
            console.error('Ошибка подсчета размера localStorage:', error);
            return 0;
        }
    }

    // Очистка устаревших данных
    cleanup(): number {
        if (!this.isSupported()) {
            return 0;
        }

        try {
            const keys = this.keys();
            let removedCount = 0;

            keys.forEach(key => {
                const storageKey = this.getKey(key);
                const item = localStorage.getItem(storageKey);

                if (item) {
                    try {
                        const parsedItem: StorageItem = JSON.parse(item);

                        if (parsedItem.expiresAt && Date.now() > parsedItem.expiresAt) {
                            localStorage.removeItem(storageKey);
                            removedCount++;
                        }
                    } catch {
                        // Если не удается распарсить, удаляем
                        localStorage.removeItem(storageKey);
                        removedCount++;
                    }
                }
            });

            return removedCount;
        } catch (error) {
            console.error('Ошибка очистки устаревших данных:', error);
            return 0;
        }
    }
}

// Создание экземпляра по умолчанию
export const storage = new LocalStorage();

// Специализированные функции для работы с конкретными типами данных

// Работа с пользовательскими настройками
export const userSettings = {
    set: (settings: Record<string, any>) => storage.set('user_settings', settings),
    get: () => storage.get<Record<string, any>>('user_settings') || {},
    update: (updates: Record<string, any>) => {
        const current = userSettings.get();
        const updated = { ...current, ...updates };
        userSettings.set(updated);
        return updated;
    },
};

// Работа с токенами авторизации
export const authTokens = {
    set: (tokens: { access_token: string; refresh_token: string }) =>
        storage.set('auth_tokens', tokens, 60 * 60 * 1000), // 1 час
    get: () => storage.get<{ access_token: string; refresh_token: string }>('auth_tokens'),
    remove: () => storage.remove('auth_tokens'),
    hasValidToken: () => {
        const tokens = authTokens.get();
        return tokens !== null;
    },
};

// Работа с фильтрами
export const savedFilters = {
    set: (filters: Record<string, any>) => storage.set('saved_filters', filters),
    get: () => storage.get<Record<string, any>>('saved_filters') || {},
    add: (name: string, filter: any) => {
        const current = savedFilters.get();
        const updated = { ...current, [name]: filter };
        savedFilters.set(updated);
        return updated;
    },
    remove: (name: string) => {
        const current = savedFilters.get();
        const { [name]: removed, ...updated } = current;
        savedFilters.set(updated);
        return updated;
    },
};

// Работа с темой
export const themeSettings = {
    set: (theme: 'light' | 'dark') => storage.set('theme', theme),
    get: (): 'light' | 'dark' => storage.get<'light' | 'dark'>('theme') || 'light',
    toggle: () => {
        const current = themeSettings.get();
        const newTheme = current === 'light' ? 'dark' : 'light';
        themeSettings.set(newTheme);
        return newTheme;
    },
};

// Работа с языком
export const languageSettings = {
    set: (language: 'ru' | 'en') => storage.set('language', language),
    get: (): 'ru' | 'en' => storage.get<'ru' | 'en'>('language') || 'ru',
};

// Работа с историей поиска
export const searchHistory = {
    set: (history: string[]) => storage.set('search_history', history),
    get: (): string[] => storage.get<string[]>('search_history') || [],
    add: (query: string) => {
        const history = searchHistory.get();
        const filtered = history.filter(item => item !== query);
        const updated = [query, ...filtered].slice(0, 10); // Максимум 10 записей
        searchHistory.set(updated);
        return updated;
    },
    clear: () => searchHistory.set([]),
};

// Работа с избранными виджетами
export const favoriteWidgets = {
    set: (widgets: string[]) => storage.set('favorite_widgets', widgets),
    get: (): string[] => storage.get<string[]>('favorite_widgets') || [],
    add: (widgetId: string) => {
        const widgets = favoriteWidgets.get();
        if (!widgets.includes(widgetId)) {
            const updated = [...widgets, widgetId];
            favoriteWidgets.set(updated);
            return updated;
        }
        return widgets;
    },
    remove: (widgetId: string) => {
        const widgets = favoriteWidgets.get();
        const updated = widgets.filter(id => id !== widgetId);
        favoriteWidgets.set(updated);
        return updated;
    },
    toggle: (widgetId: string) => {
        const widgets = favoriteWidgets.get();
        if (widgets.includes(widgetId)) {
            return favoriteWidgets.remove(widgetId);
        } else {
            return favoriteWidgets.add(widgetId);
        }
    },
};