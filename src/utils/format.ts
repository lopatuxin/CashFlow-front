// Утилиты для форматирования данных

// Форматирование чисел
export const formatNumber = (
    value: number,
    options: {
        decimals?: number;
        locale?: 'ru' | 'en';
        currency?: string;
        compact?: boolean;
    } = {}
): string => {
    const {
        decimals = 2,
        locale = 'ru',
        currency,
        compact = false,
    } = options;

    try {
        const localeMap = {
            ru: 'ru-RU',
            en: 'en-US',
        };

        const numberOptions: Intl.NumberFormatOptions = {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
        };

        if (currency) {
            numberOptions.style = 'currency';
            numberOptions.currency = currency;
        }

        if (compact) {
            numberOptions.notation = 'compact';
            numberOptions.compactDisplay = 'short';
        }

        return new Intl.NumberFormat(localeMap[locale], numberOptions).format(value);
    } catch (error) {
        console.error('Error formatting number:', error);
        return value.toString();
    }
};

// Форматирование процентов
export const formatPercent = (
    value: number,
    decimals: number = 1,
    locale: 'ru' | 'en' = 'ru'
): string => {
    try {
        const localeMap = {
            ru: 'ru-RU',
            en: 'en-US',
        };

        return new Intl.NumberFormat(localeMap[locale], {
            style: 'percent',
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
        }).format(value / 100);
    } catch (error) {
        console.error('Error formatting percent:', error);
        return `${value.toFixed(decimals)}%`;
    }
};

// Форматирование размера файла
export const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Б';

    const k = 1024;
    const sizes = ['Б', 'КБ', 'МБ', 'ГБ', 'ТБ'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

// Форматирование времени
export const formatDuration = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
        return `${hours}ч ${minutes}м ${secs}с`;
    } else if (minutes > 0) {
        return `${minutes}м ${secs}с`;
    } else {
        return `${secs}с`;
    }
};

// Форматирование телефонного номера
export const formatPhoneNumber = (phone: string): string => {
    const cleaned = phone.replace(/\D/g, '');

    if (cleaned.length === 11 && cleaned.startsWith('7')) {
        return `+7 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7, 9)}-${cleaned.slice(9)}`;
    }

    if (cleaned.length === 10) {
        return `+7 (${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 8)}-${cleaned.slice(8)}`;
    }

    return phone;
};

// Форматирование ИНН
export const formatInn = (inn: string): string => {
    const cleaned = inn.replace(/\D/g, '');

    if (cleaned.length === 10) {
        return `${cleaned.slice(0, 2)} ${cleaned.slice(2, 5)} ${cleaned.slice(5, 8)} ${cleaned.slice(8)}`;
    }

    if (cleaned.length === 12) {
        return `${cleaned.slice(0, 2)} ${cleaned.slice(2, 5)} ${cleaned.slice(5, 8)} ${cleaned.slice(8, 10)} ${cleaned.slice(10)}`;
    }

    return inn;
};

// Форматирование банковской карты
export const formatCardNumber = (cardNumber: string): string => {
    const cleaned = cardNumber.replace(/\D/g, '');

    if (cleaned.length === 16) {
        return `${cleaned.slice(0, 4)} ${cleaned.slice(4, 8)} ${cleaned.slice(8, 12)} ${cleaned.slice(12)}`;
    }

    return cardNumber;
};

// Маскирование чувствительных данных
export const maskSensitiveData = (
    data: string,
    type: 'phone' | 'email' | 'card' | 'inn' | 'passport'
): string => {
    switch (type) {
        case 'phone':
            return data.replace(/(\+7\s\(\d{3}\)\s\d{3}-\d{2}-)\d{2}/, '$1**');

        case 'email':
            const [local, domain] = data.split('@');
            if (local.length <= 2) return data;
            return `${local.slice(0, 2)}***@${domain}`;

        case 'card':
            return data.replace(/(\d{4}\s\d{4}\s\d{4}\s)\d{4}/, '$1****');

        case 'inn':
            return data.replace(/(\d{2}\s\d{3}\s\d{3}\s)\d{2}/, '$1**');

        case 'passport':
            return data.replace(/(\d{4}\s)\d{6}/, '$1******');

        default:
            return data;
    }
};

// Форматирование имени
export const formatName = (firstName: string, lastName: string, middleName?: string): string => {
    const parts = [lastName, firstName];
    if (middleName) parts.push(middleName);
    return parts.join(' ');
};

// Форматирование инициалов
export const formatInitials = (firstName: string, lastName: string, middleName?: string): string => {
    const parts = [lastName, `${firstName.charAt(0)}.`];
    if (middleName) parts.push(`${middleName.charAt(0)}.`);
    return parts.join(' ');
};

// Форматирование адреса
export const formatAddress = (address: {
    street?: string;
    house?: string;
    apartment?: string;
    city?: string;
    region?: string;
    postalCode?: string;
}): string => {
    const parts = [];

    if (address.street && address.house) {
        parts.push(`${address.street}, ${address.house}`);
        if (address.apartment) parts.push(`кв. ${address.apartment}`);
    }

    if (address.city) parts.push(address.city);
    if (address.region) parts.push(address.region);
    if (address.postalCode) parts.push(address.postalCode);

    return parts.join(', ');
};

// Форматирование тренда
export const formatTrend = (value: number, locale: 'ru' | 'en' = 'ru'): string => {
    const sign = value >= 0 ? '+' : '';
    const formattedValue = formatPercent(Math.abs(value), 1, locale);

    if (locale === 'ru') {
        return `${sign}${formattedValue}`;
    } else {
        return `${sign}${formattedValue}`;
    }
};

// Форматирование статуса
export const formatStatus = (status: string, locale: 'ru' | 'en' = 'ru'): string => {
    const statusMap = {
        ru: {
            active: 'Активный',
            inactive: 'Неактивный',
            pending: 'В ожидании',
            completed: 'Завершен',
            cancelled: 'Отменен',
            draft: 'Черновик',
            published: 'Опубликован',
            archived: 'Архивирован',
        },
        en: {
            active: 'Active',
            inactive: 'Inactive',
            pending: 'Pending',
            completed: 'Completed',
            cancelled: 'Cancelled',
            draft: 'Draft',
            published: 'Published',
            archived: 'Archived',
        },
    };

    return statusMap[locale][status.toLowerCase()] || status;
};

// Форматирование роли пользователя
export const formatUserRole = (role: string, locale: 'ru' | 'en' = 'ru'): string => {
    const roleMap = {
        ru: {
            admin: 'Администратор',
            user: 'Пользователь',
            viewer: 'Наблюдатель',
            manager: 'Менеджер',
            editor: 'Редактор',
        },
        en: {
            admin: 'Administrator',
            user: 'User',
            viewer: 'Viewer',
            manager: 'Manager',
            editor: 'Editor',
        },
    };

    return roleMap[locale][role.toLowerCase()] || role;
};