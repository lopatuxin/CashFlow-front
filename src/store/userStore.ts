import { User } from '@/types/analytics';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { BaseState } from './types';

interface UserState extends BaseState {
    // Данные пользователя
    user: User | null;
    isAuthenticated: boolean;
    permissions: string[];
    preferences: {
        defaultDashboard: string;
        emailNotifications: boolean;
        pushNotifications: boolean;
        timezone: string;
    };

    // Действия
    setUser: (user: User | null) => void;
    setAuthenticated: (isAuthenticated: boolean) => void;
    setPermissions: (permissions: string[]) => void;
    setPreferences: (preferences: Partial<UserState['preferences']>) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;

    // Асинхронные действия
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    fetchUserProfile: () => Promise<void>;
    updateUserProfile: (updates: Partial<User>) => Promise<void>;
    updatePreferences: (preferences: Partial<UserState['preferences']>) => Promise<void>;
}

export const useUserStore = create<UserState>()(
    devtools(
        (set, get) => ({
            // Начальное состояние
            user: null,
            isAuthenticated: false,
            permissions: [],
            preferences: {
                defaultDashboard: 'main',
                emailNotifications: true,
                pushNotifications: false,
                timezone: 'Europe/Moscow',
            },
            isLoading: false,
            error: null,

            // Синхронные действия
            setUser: (user) => set({ user }),
            setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
            setPermissions: (permissions) => set({ permissions }),
            setPreferences: (preferences) =>
                set((state) => ({
                    preferences: { ...state.preferences, ...preferences }
                })),
            setLoading: (isLoading) => set({ isLoading }),
            setError: (error) => set({ error }),

            // Асинхронные действия
            login: async (email, password) => {
                set({ isLoading: true, error: null });
                try {
                    // Здесь будет вызов API для авторизации
                    // const response = await AuthApi.login(email, password);

                    // Имитация успешной авторизации
                    const mockUser: User = {
                        id: '1',
                        name: 'Иван Иванов',
                        email: email,
                        role: 'admin',
                    };

                    const mockPermissions = ['read:analytics', 'write:analytics', 'admin:users'];

                    set({
                        user: mockUser,
                        isAuthenticated: true,
                        permissions: mockPermissions,
                        isLoading: false,
                    });

                    // Сохраняем токен в localStorage
                    localStorage.setItem('auth_token', 'mock_token_123');
                } catch (error) {
                    set({
                        error: error instanceof Error ? error.message : 'Ошибка авторизации',
                        isLoading: false,
                    });
                }
            },

            logout: async () => {
                set({ isLoading: true });
                try {
                    // Здесь будет вызов API для выхода
                    // await AuthApi.logout();

                    // Очищаем данные пользователя
                    set({
                        user: null,
                        isAuthenticated: false,
                        permissions: [],
                        isLoading: false,
                    });

                    // Удаляем токен из localStorage
                    localStorage.removeItem('auth_token');
                } catch (error) {
                    set({
                        error: error instanceof Error ? error.message : 'Ошибка при выходе',
                        isLoading: false,
                    });
                }
            },

            fetchUserProfile: async () => {
                set({ isLoading: true, error: null });
                try {
                    // Здесь будет вызов API для получения профиля
                    // const user = await AuthApi.getProfile();

                    // Имитация получения профиля
                    const mockUser: User = {
                        id: '1',
                        name: 'Иван Иванов',
                        email: 'ivan@example.com',
                        role: 'admin',
                    };

                    set({
                        user: mockUser,
                        isAuthenticated: true,
                        isLoading: false,
                    });
                } catch (error) {
                    set({
                        error: error instanceof Error ? error.message : 'Ошибка получения профиля',
                        isLoading: false,
                    });
                }
            },

            updateUserProfile: async (updates) => {
                set({ isLoading: true, error: null });
                try {
                    // Здесь будет вызов API для обновления профиля
                    // const updatedUser = await AuthApi.updateProfile(updates);

                    // Имитация обновления профиля
                    const updatedUser = { ...get().user, ...updates } as User;

                    set({
                        user: updatedUser,
                        isLoading: false,
                    });
                } catch (error) {
                    set({
                        error: error instanceof Error ? error.message : 'Ошибка обновления профиля',
                        isLoading: false,
                    });
                }
            },

            updatePreferences: async (preferences) => {
                set({ isLoading: true, error: null });
                try {
                    // Здесь будет вызов API для обновления настроек
                    // await UserApi.updatePreferences(preferences);

                    // Обновляем локальные настройки
                    set((state) => ({
                        preferences: { ...state.preferences, ...preferences },
                        isLoading: false,
                    }));

                    // Сохраняем в localStorage
                    localStorage.setItem('user_preferences', JSON.stringify({
                        ...get().preferences,
                        ...preferences,
                    }));
                } catch (error) {
                    set({
                        error: error instanceof Error ? error.message : 'Ошибка обновления настроек',
                        isLoading: false,
                    });
                }
            },
        }),
        {
            name: 'user-store',
        }
    )
);