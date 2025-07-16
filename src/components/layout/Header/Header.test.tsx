import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Header } from './Header';
import { Notification, QuickAction, User } from './Header.types';

// Моковые данные для тестов
const mockUser: User = {
    id: '1',
    name: 'Тест Пользователь',
    email: 'test@example.com',
    balance: 50000,
    currency: 'RUB'
};

const mockNotifications: Notification[] = [
    {
        id: '1',
        type: 'budget_exceeded',
        title: 'Превышение бюджета',
        message: 'Категория превышена',
        timestamp: new Date().toISOString(),
        isRead: false,
        priority: 'high'
    }
];

const mockQuickActions: QuickAction[] = [
    {
        id: 'add_income',
        label: 'Добавить доход',
        icon: 'add_income',
        action: jest.fn(),
        variant: 'primary'
    }
];

describe('Header Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('рендерит основной Header с логотипом', () => {
        render(<Header user={mockUser} />);

        expect(screen.getByText('CashFlow')).toBeInTheDocument();
    });

    it('отображает имя пользователя', () => {
        render(<Header user={mockUser} />);

        expect(screen.getByText('Тест Пользователь')).toBeInTheDocument();
    });

    it('отображает email пользователя', () => {
        render(<Header user={mockUser} />);

        expect(screen.getByText('test@example.com')).toBeInTheDocument();
    });

    it('отображает баланс пользователя', () => {
        render(<Header user={mockUser} />);

        expect(screen.getByText('50 000 ₽')).toBeInTheDocument();
    });

    it('отображает кнопку уведомлений', () => {
        render(<Header user={mockUser} notifications={mockNotifications} />);

        const notificationsButton = screen.getByLabelText(/уведомления/i);
        expect(notificationsButton).toBeInTheDocument();
    });

    it('отображает счетчик непрочитанных уведомлений', () => {
        render(<Header user={mockUser} notifications={mockNotifications} />);

        expect(screen.getByText('1')).toBeInTheDocument();
    });

    it('открывает dropdown уведомлений при клике', async () => {
        render(<Header user={mockUser} notifications={mockNotifications} />);

        const notificationsButton = screen.getByLabelText(/уведомления/i);
        fireEvent.click(notificationsButton);

        await waitFor(() => {
            expect(screen.getByText('Уведомления')).toBeInTheDocument();
            expect(screen.getByText('Превышение бюджета')).toBeInTheDocument();
        });
    });

    it('отображает кнопку быстрых действий', () => {
        render(<Header user={mockUser} quickActions={mockQuickActions} />);

        expect(screen.getByText('Действия')).toBeInTheDocument();
    });

    it('открывает dropdown быстрых действий при клике', async () => {
        render(<Header user={mockUser} quickActions={mockQuickActions} />);

        const actionsButton = screen.getByText('Действия');
        fireEvent.click(actionsButton);

        await waitFor(() => {
            expect(screen.getByText('Быстрые действия')).toBeInTheDocument();
            expect(screen.getByText('Добавить доход')).toBeInTheDocument();
        });
    });

    it('вызывает callback при клике на быстрое действие', async () => {
        const mockAction = jest.fn();
        const actions: QuickAction[] = [
            {
                id: 'test_action',
                label: 'Тестовое действие',
                icon: 'test',
                action: mockAction
            }
        ];

        render(<Header user={mockUser} quickActions={actions} />);

        const actionsButton = screen.getByText('Действия');
        fireEvent.click(actionsButton);

        await waitFor(() => {
            const actionButton = screen.getByText('Тестовое действие');
            fireEvent.click(actionButton);
        });

        expect(mockAction).toHaveBeenCalled();
    });

    it('открывает меню пользователя при клике', async () => {
        render(<Header user={mockUser} />);

        const userButton = screen.getByLabelText(/меню пользователя/i);
        fireEvent.click(userButton);

        await waitFor(() => {
            expect(screen.getByText('Профиль')).toBeInTheDocument();
            expect(screen.getByText('Настройки')).toBeInTheDocument();
            expect(screen.getByText('Помощь')).toBeInTheDocument();
            expect(screen.getByText('Выйти')).toBeInTheDocument();
        });
    });

    it('отображает навигационные элементы', () => {
        render(<Header user={mockUser} />);

        expect(screen.getByText('Дашборд')).toBeInTheDocument();
        expect(screen.getByText('Бюджет')).toBeInTheDocument();
        expect(screen.getByText('Транзакции')).toBeInTheDocument();
    });

    it('отображает активный элемент навигации', () => {
        render(<Header user={mockUser} />);

        const dashboardButton = screen.getByText('Дашборд').closest('button');
        expect(dashboardButton).toHaveClass('navigationButtonActive');
    });

    it('отображает бейдж на элементе навигации', () => {
        render(<Header user={mockUser} />);

        expect(screen.getByText('3')).toBeInTheDocument(); // Бейдж на транзакциях
    });

    it('адаптируется для мобильных устройств', () => {
        render(<Header user={mockUser} isMobile={true} />);

        // На мобильных устройствах навигация скрыта
        expect(screen.queryByText('Бюджет')).not.toBeInTheDocument();

        // Отображается мобильная кнопка меню
        expect(screen.getByLabelText('Открыть меню')).toBeInTheDocument();
    });

    it('открывает мобильное меню при клике на кнопку', async () => {
        render(<Header user={mockUser} isMobile={true} />);

        const mobileMenuButton = screen.getByLabelText('Открыть меню');
        fireEvent.click(mobileMenuButton);

        await waitFor(() => {
            expect(screen.getByText('Бюджет')).toBeInTheDocument();
            expect(screen.getByText('Транзакции')).toBeInTheDocument();
        });
    });

    it('вызывает callback при клике на уведомление', async () => {
        const mockNotificationClick = jest.fn();
        render(
            <Header
                user={mockUser}
                notifications={mockNotifications}
                onNotificationClick={mockNotificationClick}
            />
        );

        const notificationsButton = screen.getByLabelText(/уведомления/i);
        fireEvent.click(notificationsButton);

        await waitFor(() => {
            const notificationItem = screen.getByText('Превышение бюджета');
            fireEvent.click(notificationItem);
        });

        expect(mockNotificationClick).toHaveBeenCalledWith(mockNotifications[0]);
    });

    it('обрабатывает отрицательный баланс', () => {
        const userWithNegativeBalance: User = {
            ...mockUser,
            balance: -1000
        };

        render(<Header user={userWithNegativeBalance} />);

        expect(screen.getByText('-1 000 ₽')).toBeInTheDocument();
    });

    it('отображает пустое состояние уведомлений', async () => {
        render(<Header user={mockUser} notifications={[]} />);

        const notificationsButton = screen.getByLabelText(/уведомления/i);
        fireEvent.click(notificationsButton);

        await waitFor(() => {
            expect(screen.getByText('Нет новых уведомлений')).toBeInTheDocument();
        });
    });

    it('закрывает dropdown при клике вне его', async () => {
        render(<Header user={mockUser} notifications={mockNotifications} />);

        const notificationsButton = screen.getByLabelText(/уведомления/i);
        fireEvent.click(notificationsButton);

        await waitFor(() => {
            expect(screen.getByText('Уведомления')).toBeInTheDocument();
        });

        // Клик вне dropdown
        fireEvent.click(document.body);

        await waitFor(() => {
            expect(screen.queryByText('Уведомления')).not.toBeInTheDocument();
        });
    });
});