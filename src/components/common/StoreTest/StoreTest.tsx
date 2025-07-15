import { useAnalyticsStore, useFiltersStore, useUIStore, useUserStore } from '@/store';
import React, { useEffect } from 'react';

export const StoreTest: React.FC = () => {
    const analytics = useAnalyticsStore();
    const ui = useUIStore();
    const user = useUserStore();
    const filters = useFiltersStore();

    useEffect(() => {
        // Загружаем данные при монтировании компонента
        analytics.fetchDashboardData();
        user.fetchUserProfile();
        filters.fetchAvailableFilters();
    }, []);

    const handleLogin = () => {
        user.login('test@example.com', 'password');
    };

    const handleLogout = () => {
        user.logout();
    };

    const handleToggleSidebar = () => {
        ui.toggleSidebar();
    };

    const handleAddNotification = () => {
        ui.addNotification({
            type: 'success',
            message: 'Тестовое уведомление!',
            duration: 3000,
        });
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h2>Тест Stores</h2>

            <div style={{ marginBottom: '20px' }}>
                <h3>Analytics Store</h3>
                <p>Загрузка: {analytics.isLoading ? 'Да' : 'Нет'}</p>
                <p>Ошибка: {analytics.error || 'Нет'}</p>
                <p>Метрики: {analytics.metrics.length}</p>
                <p>Графики: {analytics.charts.length}</p>
                <p>Виджеты: {analytics.dashboardWidgets.length}</p>
                <button onClick={() => analytics.fetchMetrics()}>
                    Загрузить метрики
                </button>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <h3>UI Store</h3>
                <p>Sidebar открыт: {ui.sidebarOpen ? 'Да' : 'Нет'}</p>
                <p>Тема: {ui.theme}</p>
                <p>Язык: {ui.language}</p>
                <p>Уведомления: {ui.notifications.length}</p>
                <button onClick={handleToggleSidebar}>
                    Переключить sidebar
                </button>
                <button onClick={handleAddNotification}>
                    Добавить уведомление
                </button>
                <button onClick={() => ui.setTheme(ui.theme === 'light' ? 'dark' : 'light')}>
                    Сменить тему
                </button>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <h3>User Store</h3>
                <p>Авторизован: {user.isAuthenticated ? 'Да' : 'Нет'}</p>
                <p>Пользователь: {user.user?.name || 'Не авторизован'}</p>
                <p>Email: {user.user?.email || 'Не авторизован'}</p>
                <p>Роль: {user.user?.role || 'Не авторизован'}</p>
                <p>Разрешения: {user.permissions.length}</p>
                {!user.isAuthenticated ? (
                    <button onClick={handleLogin}>
                        Войти
                    </button>
                ) : (
                    <button onClick={handleLogout}>
                        Выйти
                    </button>
                )}
            </div>

            <div style={{ marginBottom: '20px' }}>
                <h3>Filters Store</h3>
                <p>Категории: {filters.availableCategories.length}</p>
                <p>Метрики: {filters.availableMetrics.length}</p>
                <p>Сохраненные фильтры: {filters.savedFilters.length}</p>
                <p>Текущий фильтр: {filters.currentFilters.categories.length} категорий</p>
                <button onClick={() => filters.resetFilters()}>
                    Сбросить фильтры
                </button>
            </div>

            {ui.notifications.length > 0 && (
                <div style={{
                    position: 'fixed',
                    top: '20px',
                    right: '20px',
                    zIndex: 1000
                }}>
                    {ui.notifications.map((notification) => (
                        <div
                            key={notification.id}
                            style={{
                                padding: '10px',
                                margin: '5px',
                                backgroundColor: notification.type === 'success' ? '#4caf50' : '#f44336',
                                color: 'white',
                                borderRadius: '4px',
                                minWidth: '200px',
                            }}
                        >
                            {notification.message}
                            <button
                                onClick={() => ui.removeNotification(notification.id)}
                                style={{
                                    float: 'right',
                                    background: 'none',
                                    border: 'none',
                                    color: 'white',
                                    cursor: 'pointer',
                                }}
                            >
                                ×
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};