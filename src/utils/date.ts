import { addDays, endOfDay, format, isValid, parseISO, startOfDay, subDays } from 'date-fns';
import { enUS, ru } from 'date-fns/locale';

// Локали для форматирования дат
const locales = {
    ru,
    en: enUS,
};

// Форматы дат
export const DATE_FORMATS = {
    SHORT: 'dd.MM.yyyy',
    MEDIUM: 'dd MMM yyyy',
    LONG: 'dd MMMM yyyy',
    TIME: 'HH:mm',
    DATETIME: 'dd.MM.yyyy HH:mm',
    ISO: 'yyyy-MM-dd',
    MONTH_YEAR: 'MMMM yyyy',
    DAY_MONTH: 'dd MMM',
} as const;

// Типы для работы с датами
export interface DateRange {
    start: Date;
    end: Date;
}

export interface DateFilter {
    from: string;
    to: string;
}

// Функция для форматирования даты
export const formatDate = (
    date: Date | string,
    formatStr: string = DATE_FORMATS.SHORT,
    locale: 'ru' | 'en' = 'ru'
): string => {
    try {
        const dateObj = typeof date === 'string' ? parseISO(date) : date;

        if (!isValid(dateObj)) {
            return 'Неверная дата';
        }

        return format(dateObj, formatStr, { locale: locales[locale] });
    } catch (error) {
        console.error('Error formatting date:', error);
        return 'Неверная дата';
    }
};

// Функция для создания диапазона дат
export const createDateRange = (start: Date, end: Date): DateRange => ({
    start: startOfDay(start),
    end: endOfDay(end),
});

// Функция для получения диапазона последних N дней
export const getLastDaysRange = (days: number): DateRange => {
    const end = new Date();
    const start = subDays(end, days - 1);
    return createDateRange(start, end);
};

// Функция для получения диапазона текущего месяца
export const getCurrentMonthRange = (): DateRange => {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    return createDateRange(start, end);
};

// Функция для получения диапазона текущего года
export const getCurrentYearRange = (): DateRange => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 1);
    const end = new Date(now.getFullYear(), 11, 31);
    return createDateRange(start, end);
};

// Функция для конвертации DateRange в строки
export const dateRangeToStrings = (range: DateRange): DateFilter => ({
    from: format(range.start, DATE_FORMATS.ISO),
    to: format(range.end, DATE_FORMATS.ISO),
});

// Функция для конвертации строк в DateRange
export const stringsToDateRange = (filter: DateFilter): DateRange => ({
    start: parseISO(filter.from),
    end: parseISO(filter.to),
});

// Функция для проверки, находится ли дата в диапазоне
export const isDateInRange = (date: Date, range: DateRange): boolean => {
    return date >= range.start && date <= range.end;
};

// Функция для получения относительного времени
export const getRelativeTime = (date: Date | string, locale: 'ru' | 'en' = 'ru'): string => {
    try {
        const dateObj = typeof date === 'string' ? parseISO(date) : date;

        if (!isValid(dateObj)) {
            return 'Неверная дата';
        }

        const now = new Date();
        const diffInMs = now.getTime() - dateObj.getTime();
        const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
        const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
        const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

        if (locale === 'ru') {
            if (diffInMinutes < 1) return 'только что';
            if (diffInMinutes < 60) return `${diffInMinutes} мин. назад`;
            if (diffInHours < 24) return `${diffInHours} ч. назад`;
            if (diffInDays < 7) return `${diffInDays} дн. назад`;
            return formatDate(dateObj, DATE_FORMATS.MEDIUM, locale);
        } else {
            if (diffInMinutes < 1) return 'just now';
            if (diffInMinutes < 60) return `${diffInMinutes} min ago`;
            if (diffInHours < 24) return `${diffInHours} hours ago`;
            if (diffInDays < 7) return `${diffInDays} days ago`;
            return formatDate(dateObj, DATE_FORMATS.MEDIUM, locale);
        }
    } catch (error) {
        console.error('Error getting relative time:', error);
        return 'Неверная дата';
    }
};

// Функция для получения названия месяца
export const getMonthName = (date: Date, locale: 'ru' | 'en' = 'ru'): string => {
    return format(date, 'MMMM', { locale: locales[locale] });
};

// Функция для получения названия дня недели
export const getDayName = (date: Date, locale: 'ru' | 'en' = 'ru'): string => {
    return format(date, 'EEEE', { locale: locales[locale] });
};

// Функция для проверки, является ли дата сегодняшней
export const isToday = (date: Date): boolean => {
    const today = new Date();
    return format(date, DATE_FORMATS.ISO) === format(today, DATE_FORMATS.ISO);
};

// Функция для проверки, является ли дата вчерашней
export const isYesterday = (date: Date): boolean => {
    const yesterday = subDays(new Date(), 1);
    return format(date, DATE_FORMATS.ISO) === format(yesterday, DATE_FORMATS.ISO);
};

// Функция для получения количества дней между датами
export const getDaysBetween = (start: Date, end: Date): number => {
    const diffInMs = end.getTime() - start.getTime();
    return Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
};

// Функция для добавления дней к дате
export const addDaysToDate = (date: Date, days: number): Date => {
    return addDays(date, days);
};

// Функция для вычитания дней из даты
export const subtractDaysFromDate = (date: Date, days: number): Date => {
    return subDays(date, days);
};