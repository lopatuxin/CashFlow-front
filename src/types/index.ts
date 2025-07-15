// Экспорт всех типов аналитической системы
export * from './analytics';
export * from './api';

// Общие utility типы
export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type ID = string | number;
