// Утилиты для валидации данных

// Типы для валидации
export interface ValidationRule {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    custom?: (value: any) => boolean | string;
}

export interface ValidationResult {
    isValid: boolean;
    errors: string[];
}

export interface ValidationSchema {
    [key: string]: ValidationRule;
}

// Базовые правила валидации
export const VALIDATION_RULES = {
    // Email
    email: {
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Введите корректный email адрес',
    },

    // Телефон (российский)
    phone: {
        pattern: /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/,
        message: 'Введите корректный номер телефона',
    },

    // Пароль
    password: {
        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
        message: 'Пароль должен содержать минимум 8 символов, включая заглавные и строчные буквы, цифры',
    },

    // ИНН (10 или 12 цифр)
    inn: {
        pattern: /^\d{10}(\d{2})?$/,
        message: 'ИНН должен содержать 10 или 12 цифр',
    },

    // Банковская карта (13-19 цифр)
    cardNumber: {
        pattern: /^\d{13,19}$/,
        message: 'Номер карты должен содержать от 13 до 19 цифр',
    },

    // Дата
    date: {
        pattern: /^\d{4}-\d{2}-\d{2}$/,
        message: 'Введите дату в формате ГГГГ-ММ-ДД',
    },

    // URL
    url: {
        pattern: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
        message: 'Введите корректный URL',
    },
} as const;

// Функция валидации одного поля
export const validateField = (value: any, rules: ValidationRule): ValidationResult => {
    const errors: string[] = [];

    // Проверка на обязательность
    if (rules.required && (!value || (typeof value === 'string' && value.trim() === ''))) {
        errors.push('Это поле обязательно для заполнения');
        return { isValid: false, errors };
    }

    // Если значение пустое и не обязательное, пропускаем остальные проверки
    if (!value || (typeof value === 'string' && value.trim() === '')) {
        return { isValid: true, errors: [] };
    }

    // Проверка минимальной длины
    if (rules.minLength && typeof value === 'string' && value.length < rules.minLength) {
        errors.push(`Минимальная длина: ${rules.minLength} символов`);
    }

    // Проверка максимальной длины
    if (rules.maxLength && typeof value === 'string' && value.length > rules.maxLength) {
        errors.push(`Максимальная длина: ${rules.maxLength} символов`);
    }

    // Проверка по регулярному выражению
    if (rules.pattern && typeof value === 'string' && !rules.pattern.test(value)) {
        errors.push('Неверный формат');
    }

    // Пользовательская валидация
    if (rules.custom) {
        const customResult = rules.custom(value);
        if (typeof customResult === 'string') {
            errors.push(customResult);
        } else if (!customResult) {
            errors.push('Неверное значение');
        }
    }

    return {
        isValid: errors.length === 0,
        errors,
    };
};

// Функция валидации объекта по схеме
export const validateObject = (data: any, schema: ValidationSchema): ValidationResult => {
    const errors: string[] = [];

    for (const [field, rules] of Object.entries(schema)) {
        const fieldValue = data[field];
        const fieldValidation = validateField(fieldValue, rules);

        if (!fieldValidation.isValid) {
            errors.push(...fieldValidation.errors.map(error => `${field}: ${error}`));
        }
    }

    return {
        isValid: errors.length === 0,
        errors,
    };
};

// Специализированные функции валидации

// Валидация email
export const validateEmail = (email: string): ValidationResult => {
    return validateField(email, {
        required: true,
        pattern: VALIDATION_RULES.email.pattern,
    });
};

// Валидация телефона
export const validatePhone = (phone: string): ValidationResult => {
    return validateField(phone, {
        required: true,
        pattern: VALIDATION_RULES.phone.pattern,
    });
};

// Валидация пароля
export const validatePassword = (password: string): ValidationResult => {
    return validateField(password, {
        required: true,
        minLength: 8,
        pattern: VALIDATION_RULES.password.pattern,
    });
};

// Валидация ИНН
export const validateInn = (inn: string): ValidationResult => {
    return validateField(inn, {
        required: true,
        pattern: VALIDATION_RULES.inn.pattern,
        custom: (value) => {
            // Проверка контрольных цифр для ИНН
            const digits = value.split('').map(Number);

            if (digits.length === 10) {
                const weights = [2, 4, 10, 3, 5, 9, 4, 6, 8];
                const sum = weights.reduce((acc, weight, index) => acc + weight * digits[index], 0);
                const checkDigit = (sum % 11) % 10;
                return checkDigit === digits[9];
            }

            if (digits.length === 12) {
                const weights1 = [7, 2, 4, 10, 3, 5, 9, 4, 6, 8];
                const weights2 = [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8];

                const sum1 = weights1.reduce((acc, weight, index) => acc + weight * digits[index], 0);
                const checkDigit1 = (sum1 % 11) % 10;

                const sum2 = weights2.reduce((acc, weight, index) => acc + weight * digits[index], 0);
                const checkDigit2 = (sum2 % 11) % 10;

                return checkDigit1 === digits[10] && checkDigit2 === digits[11];
            }

            return false;
        },
    });
};

// Валидация банковской карты (алгоритм Луна)
export const validateCardNumber = (cardNumber: string): ValidationResult => {
    return validateField(cardNumber, {
        required: true,
        pattern: VALIDATION_RULES.cardNumber.pattern,
        custom: (value) => {
            const digits = value.split('').map(Number).reverse();
            let sum = 0;

            for (let i = 0; i < digits.length; i++) {
                let digit = digits[i];

                if (i % 2 === 1) {
                    digit *= 2;
                    if (digit > 9) {
                        digit = digit.toString().split('').map(Number).reduce((a, b) => a + b, 0);
                    }
                }

                sum += digit;
            }

            return sum % 10 === 0;
        },
    });
};

// Валидация даты
export const validateDate = (date: string): ValidationResult => {
    return validateField(date, {
        required: true,
        pattern: VALIDATION_RULES.date.pattern,
        custom: (value) => {
            const dateObj = new Date(value);
            return !isNaN(dateObj.getTime()) && dateObj.toISOString().slice(0, 10) === value;
        },
    });
};

// Валидация URL
export const validateUrl = (url: string): ValidationResult => {
    return validateField(url, {
        required: true,
        pattern: VALIDATION_RULES.url.pattern,
    });
};

// Валидация числового диапазона
export const validateNumberRange = (
    value: number,
    min?: number,
    max?: number
): ValidationResult => {
    const errors: string[] = [];

    if (min !== undefined && value < min) {
        errors.push(`Значение должно быть не менее ${min}`);
    }

    if (max !== undefined && value > max) {
        errors.push(`Значение должно быть не более ${max}`);
    }

    return {
        isValid: errors.length === 0,
        errors,
    };
};

// Валидация размера файла
export const validateFileSize = (file: File, maxSizeMB: number): ValidationResult => {
    const maxSizeBytes = maxSizeMB * 1024 * 1024;

    if (file.size > maxSizeBytes) {
        return {
            isValid: false,
            errors: [`Размер файла не должен превышать ${maxSizeMB} МБ`],
        };
    }

    return { isValid: true, errors: [] };
};

// Валидация типа файла
export const validateFileType = (
    file: File,
    allowedTypes: string[]
): ValidationResult => {
    if (!allowedTypes.includes(file.type)) {
        return {
            isValid: false,
            errors: [`Разрешены только файлы типов: ${allowedTypes.join(', ')}`],
        };
    }

    return { isValid: true, errors: [] };
};

// Схемы валидации для форм

export const LOGIN_SCHEMA: ValidationSchema = {
    email: {
        required: true,
        pattern: VALIDATION_RULES.email.pattern,
    },
    password: {
        required: true,
        minLength: 8,
    },
};

export const REGISTRATION_SCHEMA: ValidationSchema = {
    firstName: {
        required: true,
        minLength: 2,
        maxLength: 50,
    },
    lastName: {
        required: true,
        minLength: 2,
        maxLength: 50,
    },
    email: {
        required: true,
        pattern: VALIDATION_RULES.email.pattern,
    },
    password: {
        required: true,
        minLength: 8,
        pattern: VALIDATION_RULES.password.pattern,
    },
    confirmPassword: {
        required: true,
        custom: (value, formData) => value === formData.password,
    },
    phone: {
        required: true,
        pattern: VALIDATION_RULES.phone.pattern,
    },
};

export const PROFILE_SCHEMA: ValidationSchema = {
    firstName: {
        required: true,
        minLength: 2,
        maxLength: 50,
    },
    lastName: {
        required: true,
        minLength: 2,
        maxLength: 50,
    },
    email: {
        required: true,
        pattern: VALIDATION_RULES.email.pattern,
    },
    phone: {
        pattern: VALIDATION_RULES.phone.pattern,
    },
};