import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface UIState {
    // Состояние интерфейса
    sidebarOpen: boolean;
    theme: 'light' | 'dark';
    language: 'ru' | 'en';
    modalOpen: boolean;
    modalType: string | null;
    notifications: Array<{
        id: string;
        type: 'success' | 'error' | 'warning' | 'info';
        message: string;
        duration?: number;
    }>;

    // Действия
    toggleSidebar: () => void;
    setTheme: (theme: 'light' | 'dark') => void;
    setLanguage: (language: 'ru' | 'en') => void;
    openModal: (type: string) => void;
    closeModal: () => void;
    addNotification: (notification: Omit<UIState['notifications'][0], 'id'>) => void;
    removeNotification: (id: string) => void;
    clearNotifications: () => void;
}

export const useUIStore = create<UIState>()(
    devtools(
        (set, get) => ({
            // Начальное состояние
            sidebarOpen: true,
            theme: 'light',
            language: 'ru',
            modalOpen: false,
            modalType: null,
            notifications: [],

            // Действия
            toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),

            setTheme: (theme) => {
                set({ theme });
                // Сохраняем в localStorage
                localStorage.setItem('theme', theme);
                // Применяем тему к документу
                document.documentElement.setAttribute('data-theme', theme);
            },

            setLanguage: (language) => {
                set({ language });
                // Сохраняем в localStorage
                localStorage.setItem('language', language);
            },

            openModal: (type) => set({ modalOpen: true, modalType: type }),

            closeModal: () => set({ modalOpen: false, modalType: null }),

            addNotification: (notification) => {
                const id = Date.now().toString();
                const newNotification = { ...notification, id };

                set((state) => ({
                    notifications: [...state.notifications, newNotification],
                }));

                // Автоматически удаляем уведомление через указанное время
                if (notification.duration !== 0) {
                    setTimeout(() => {
                        get().removeNotification(id);
                    }, notification.duration || 5000);
                }
            },

            removeNotification: (id) =>
                set((state) => ({
                    notifications: state.notifications.filter((n) => n.id !== id),
                })),

            clearNotifications: () => set({ notifications: [] }),
        }),
        {
            name: 'ui-store',
        }
    )
);