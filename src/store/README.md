# State Management с Zustand

## Обзор

Проект использует Zustand для управления состоянием приложения. Создано 4 основных store:

1. **AnalyticsStore** - управление аналитическими данными
2. **UIStore** - управление состоянием интерфейса
3. **UserStore** - управление данными пользователя
4. **FiltersStore** - управление фильтрами

## Структура

```
src/store/
├── index.ts              # Экспорт всех stores
├── types.ts              # Общие типы
├── analyticsStore.ts     # Store для аналитики
├── uiStore.ts           # Store для UI
├── userStore.ts         # Store для пользователя
└── filtersStore.ts      # Store для фильтров
```

## Использование

### Импорт stores

```typescript
import { useAnalyticsStore, useUIStore, useUserStore, useFiltersStore } from '@/store';
```

### AnalyticsStore

Управляет аналитическими данными: метрики, графики, виджеты дашборда.

```typescript
const analytics = useAnalyticsStore();

// Получение данных
const { metrics, charts, dashboardWidgets, isLoading, error } = analytics;

// Загрузка данных
await analytics.fetchMetrics();
await analytics.fetchCharts();
await analytics.fetchDashboardData();

// Обновление фильтров
analytics.setFilters(newFilters);

// Обновление позиции виджета
analytics.updateWidgetPosition('widget-id', { x: 100, y: 200, width: 300, height: 150 });
```

### UIStore

Управляет состоянием интерфейса: тема, язык, sidebar, уведомления.

```typescript
const ui = useUIStore();

// Состояние
const { sidebarOpen, theme, language, notifications } = ui;

// Действия
ui.toggleSidebar();
ui.setTheme('dark');
ui.setLanguage('en');

// Уведомления
ui.addNotification({
  type: 'success',
  message: 'Операция выполнена успешно!',
  duration: 5000,
});

ui.removeNotification('notification-id');
```

### UserStore

Управляет данными пользователя: авторизация, профиль, настройки.

```typescript
const user = useUserStore();

// Состояние
const { user: userData, isAuthenticated, permissions, preferences } = user;

// Авторизация
await user.login('email@example.com', 'password');
await user.logout();

// Профиль
await user.fetchUserProfile();
await user.updateUserProfile({ name: 'Новое имя' });

// Настройки
await user.updatePreferences({ emailNotifications: false });
```

### FiltersStore

Управляет фильтрами аналитики: даты, категории, метрики.

```typescript
const filters = useFiltersStore();

// Состояние
const { currentFilters, savedFilters, availableCategories, availableMetrics } = filters;

// Обновление фильтров
filters.updateDateRange(startDate, endDate);
filters.updateCategories(['Доходы', 'Расходы']);
filters.updateMetrics(['Общий доход']);

// Сохранение и загрузка фильтров
filters.saveFilter('Мой фильтр', filterOptions);
filters.loadFilter('filter-id');
filters.deleteFilter('filter-id');

// Сброс к значениям по умолчанию
filters.resetFilters();
```

## DevTools

Все stores интегрированы с Redux DevTools для отладки:

1. Установите расширение Redux DevTools в браузере
2. Откройте DevTools (F12)
3. Перейдите на вкладку "Redux"
4. Выберите нужный store для просмотра состояния и действий

## Персистентность

Некоторые данные автоматически сохраняются в localStorage:

- Тема приложения (`theme`)
- Язык (`language`)
- Токен авторизации (`auth_token`)
- Настройки пользователя (`user_preferences`)

## Типизация

Все stores полностью типизированы с TypeScript. Типы определены в:

- `src/store/types.ts` - общие типы
- `src/types/analytics.ts` - типы аналитики

## Примеры использования

### Компонент с несколькими stores

```typescript
import React, { useEffect } from 'react';
import { useAnalyticsStore, useUIStore, useUserStore } from '@/store';

export const DashboardComponent: React.FC = () => {
  const analytics = useAnalyticsStore();
  const ui = useUIStore();
  const user = useUserStore();

  useEffect(() => {
    if (user.isAuthenticated) {
      analytics.fetchDashboardData();
    }
  }, [user.isAuthenticated]);

  const handleRefresh = async () => {
    ui.addNotification({ type: 'info', message: 'Обновление данных...' });
    await analytics.fetchDashboardData();
    ui.addNotification({ type: 'success', message: 'Данные обновлены!' });
  };

  if (analytics.isLoading) {
    return <div>Загрузка...</div>;
  }

  return (
    <div>
      <h1>Добро пожаловать, {user.user?.name}!</h1>
      <button onClick={handleRefresh}>Обновить</button>
      {/* Отображение данных */}
    </div>
  );
};
```

### Обработка ошибок

```typescript
const analytics = useAnalyticsStore();

useEffect(() => {
  if (analytics.error) {
    // Показать уведомление об ошибке
    ui.addNotification({
      type: 'error',
      message: analytics.error,
      duration: 0, // Не скрывать автоматически
    });
  }
}, [analytics.error]);
```

## Тестирование

Для тестирования stores создан компонент `StoreTest`, доступный по маршруту `/test`. Он демонстрирует все основные функции stores.

## Следующие шаги

1. Интеграция с реальным API
2. Добавление middleware для логирования
3. Реализация оптимистичных обновлений
4. Добавление кэширования данных