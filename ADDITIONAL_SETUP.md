# Дополнительные настройки проекта

## Переменные окружения

### Файл конфигурации

Создайте файл `.env` в корне проекта на основе `env.example`:

```env
VITE_API_BASE_URL=http://localhost:8080/api
VITE_APP_NAME=Analytics Dashboard
VITE_APP_VERSION=1.0.0
VITE_APP_ENVIRONMENT=development
VITE_ENABLE_DEVTOOLS=true
```

### Использование переменных

```typescript
import { ENV, getApiConfig, devLog } from '@/utils/env';

// Получение значений
console.log(ENV.API_BASE_URL);
console.log(ENV.APP_NAME);

// Конфигурация API
const apiConfig = getApiConfig();

// Логирование в development
devLog('Приложение запущено');
```

## Утилиты

### Работа с датами

```typescript
import {
  formatDate,
  createDateRange,
  getLastDaysRange,
  getRelativeTime
} from '@/utils/date';

// Форматирование даты
formatDate(new Date(), 'dd.MM.yyyy'); // 15.01.2024
formatDate(new Date(), 'dd MMMM yyyy'); // 15 января 2024

// Создание диапазона дат
const range = createDateRange(startDate, endDate);
const lastWeek = getLastDaysRange(7);

// Относительное время
getRelativeTime('2024-01-10'); // 5 дн. назад
```

### Форматирование данных

```typescript
import {
  formatNumber,
  formatPercent,
  formatPhoneNumber,
  formatFileSize
} from '@/utils/format';

// Форматирование чисел
formatNumber(125000, { currency: 'RUB' }); // 125 000,00 ₽
formatNumber(125000, { compact: true }); // 125K

// Форматирование процентов
formatPercent(12.5); // 12,5%

// Форматирование телефона
formatPhoneNumber('89991234567'); // +7 (999) 123-45-67

// Размер файла
formatFileSize(1024 * 1024); // 1 МБ
```

### Валидация

```typescript
import {
  validateEmail,
  validatePhone,
  validatePassword,
  validateObject,
  LOGIN_SCHEMA
} from '@/utils/validation';

// Валидация email
const emailResult = validateEmail('test@example.com');
if (!emailResult.isValid) {
  console.log(emailResult.errors);
}

// Валидация объекта по схеме
const loginData = { email: 'test@example.com', password: 'password' };
const validation = validateObject(loginData, LOGIN_SCHEMA);
```

### Работа с localStorage

```typescript
import {
  storage,
  themeSettings,
  languageSettings,
  authTokens
} from '@/utils/storage';

// Базовые операции
storage.set('key', 'value');
const value = storage.get('key');
storage.remove('key');

// Специализированные функции
themeSettings.set('dark');
const theme = themeSettings.get();

languageSettings.set('en');
const lang = languageSettings.get();

// Токены авторизации
authTokens.set({ access_token: 'token', refresh_token: 'refresh' });
const tokens = authTokens.get();
```

## Типы API

### Основные типы

```typescript
import {
  ApiResponse,
  PaginatedResponse,
  ApiError,
  AuthToken,
  LoginRequest
} from '@/types/api';

// Типизированный ответ API
interface UserData {
  id: string;
  name: string;
  email: string;
}

const response: ApiResponse<UserData> = {
  data: { id: '1', name: 'Иван', email: 'ivan@example.com' },
  success: true,
  message: 'Пользователь найден'
};

// Пагинированный ответ
const paginatedResponse: PaginatedResponse<UserData> = {
  data: [/* массив пользователей */],
  pagination: {
    page: 1,
    limit: 10,
    total: 100,
    totalPages: 10
  }
};
```

### Специализированные типы

```typescript
// Загрузка файлов
const uploadRequest: FileUploadRequest = {
  file: new File([''], 'test.csv'),
  type: 'csv',
  metadata: { category: 'analytics' }
};

// Экспорт данных
const exportRequest: ExportRequest = {
  format: 'excel',
  filters: { dateRange: { start: '2024-01-01', end: '2024-01-31' } },
  columns: ['name', 'value', 'date']
};

// Уведомления
const notification: NotificationRequest = {
  type: 'success',
  title: 'Операция выполнена',
  message: 'Данные успешно сохранены',
  channel: 'email'
};
```

## Интеграция с stores

### Использование утилит в stores

```typescript
import { useAnalyticsStore } from '@/store';
import { formatNumber, formatDate } from '@/utils';
import { ENV } from '@/utils/env';

// В компоненте
const analytics = useAnalyticsStore();

// Форматирование данных из store
const formattedValue = formatNumber(analytics.metrics[0]?.value || 0, {
  currency: 'RUB'
});

// Использование переменных окружения
const apiUrl = ENV.API_BASE_URL;
```

### Персистентность настроек

```typescript
import { useUIStore } from '@/store';
import { themeSettings, languageSettings } from '@/utils/storage';

// Инициализация из localStorage
const ui = useUIStore();

useEffect(() => {
  const savedTheme = themeSettings.get();
  const savedLanguage = languageSettings.get();

  ui.setTheme(savedTheme);
  ui.setLanguage(savedLanguage);
}, []);

// Сохранение изменений
const handleThemeChange = (theme: 'light' | 'dark') => {
  ui.setTheme(theme);
  themeSettings.set(theme);
};
```

## Тестирование

### Доступные тестовые маршруты

- `/test` - Тест stores (Zustand)
- `/utils` - Тест утилит

### Примеры использования в тестах

```typescript
// Тест валидации
import { validateEmail } from '@/utils/validation';

test('email validation', () => {
  expect(validateEmail('test@example.com').isValid).toBe(true);
  expect(validateEmail('invalid-email').isValid).toBe(false);
});

// Тест форматирования
import { formatNumber } from '@/utils/format';

test('number formatting', () => {
  expect(formatNumber(1000, { currency: 'RUB' })).toContain('₽');
});
```

## Конфигурация для разных окружений

### Development

```env
VITE_APP_ENVIRONMENT=development
VITE_ENABLE_DEVTOOLS=true
VITE_API_BASE_URL=http://localhost:8080/api
```

### Production

```env
VITE_APP_ENVIRONMENT=production
VITE_ENABLE_DEVTOOLS=false
VITE_API_BASE_URL=https://api.example.com
```

### Staging

```env
VITE_APP_ENVIRONMENT=staging
VITE_ENABLE_DEVTOOLS=true
VITE_API_BASE_URL=https://staging-api.example.com
```

## Рекомендации по использованию

### 1. Переменные окружения

- Всегда используйте префикс `VITE_` для переменных, доступных в браузере
- Проверяйте наличие обязательных переменных при запуске
- Используйте значения по умолчанию для необязательных переменных

### 2. Утилиты

- Импортируйте только нужные функции для уменьшения размера бандла
- Используйте специализированные функции вместо общих где возможно
- Кэшируйте результаты форматирования для больших объемов данных

### 3. Валидация

- Создавайте схемы валидации для повторного использования
- Используйте пользовательские валидаторы для сложной логики
- Показывайте понятные сообщения об ошибках пользователю

### 4. localStorage

- Используйте префиксы для избежания конфликтов
- Устанавливайте TTL для временных данных
- Регулярно очищайте устаревшие данные

### 5. Типизация

- Всегда типизируйте API ответы
- Используйте generic типы для переиспользуемых структур
- Документируйте сложные типы

## Следующие шаги

1. Настройка реального API клиента
2. Интеграция с системой логирования
3. Добавление тестов для утилит
4. Настройка CI/CD с переменными окружения
5. Оптимизация производительности утилит