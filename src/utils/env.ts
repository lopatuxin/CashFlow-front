// Утилиты для работы с переменными окружения

export const ENV = {
    // API
    API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',

    // Приложение
    APP_NAME: import.meta.env.VITE_APP_NAME || 'Analytics Dashboard',
    APP_VERSION: import.meta.env.VITE_APP_VERSION || '1.0.0',
    APP_ENVIRONMENT: import.meta.env.VITE_APP_ENVIRONMENT || 'development',

    // Функции
    ENABLE_DEVTOOLS: import.meta.env.VITE_ENABLE_DEVTOOLS === 'true',

    // Проверка окружения
    IS_DEVELOPMENT: import.meta.env.DEV,
    IS_PRODUCTION: import.meta.env.PROD,
    IS_TEST: import.meta.env.MODE === 'test',
} as const;

// Типы для переменных окружения
export type Environment = 'development' | 'production' | 'test';
export type AppConfig = typeof ENV;

// Функции для проверки окружения
export const isDevelopment = (): boolean => ENV.IS_DEVELOPMENT;
export const isProduction = (): boolean => ENV.IS_PRODUCTION;
export const isTest = (): boolean => ENV.IS_TEST;

// Функция для получения конфигурации API
export const getApiConfig = () => ({
    baseURL: ENV.API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'X-App-Version': ENV.APP_VERSION,
        'X-App-Environment': ENV.APP_ENVIRONMENT,
    },
});

// Функция для логирования в development режиме
export const devLog = (...args: any[]): void => {
    if (isDevelopment()) {
        console.log(`[${ENV.APP_NAME}]`, ...args);
    }
};

// Функция для логирования ошибок
export const devError = (...args: any[]): void => {
    if (isDevelopment()) {
        console.error(`[${ENV.APP_NAME}]`, ...args);
    }
};

// Функция для проверки доступности переменных окружения
export const validateEnvironment = (): void => {
    const requiredVars = [
        'VITE_API_BASE_URL',
        'VITE_APP_NAME',
        'VITE_APP_VERSION',
    ];

    const missingVars = requiredVars.filter(
        (varName) => !import.meta.env[varName]
    );

    if (missingVars.length > 0) {
        devError('Missing required environment variables:', missingVars);
    }
};

// Функция для получения информации о приложении
export const getAppInfo = () => ({
    name: ENV.APP_NAME,
    version: ENV.APP_VERSION,
    environment: ENV.APP_ENVIRONMENT,
    apiUrl: ENV.API_BASE_URL,
    devtoolsEnabled: ENV.ENABLE_DEVTOOLS,
});

// Функция для создания заголовков запросов
export const createRequestHeaders = (additionalHeaders?: Record<string, string>) => ({
    'Content-Type': 'application/json',
    'X-App-Version': ENV.APP_VERSION,
    'X-App-Environment': ENV.APP_ENVIRONMENT,
    ...additionalHeaders,
});