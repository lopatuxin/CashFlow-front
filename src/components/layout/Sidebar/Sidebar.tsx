import clsx from 'clsx';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Sidebar.module.scss';

interface FinancialGoal {
    id: string;
    name: string;
    currentAmount: number;
    targetAmount: number;
}

interface ExpenseCategory {
    id: string;
    name: string;
    icon?: React.ReactNode;
}

export interface SidebarProps {
    isOpen?: boolean;
    onToggle?: () => void;
    frequentCategories?: ExpenseCategory[];
    activeGoals?: FinancialGoal[];
    className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
    isOpen = true,
    onToggle,
    frequentCategories = [],
    activeGoals = [],
    className,
}) => {
    const navigate = useNavigate();

    const financialSections = [
        { id: 'income', label: 'Доходы', path: '/income' },
        { id: 'expenses', label: 'Расходы', path: '/expenses' },
        { id: 'investments', label: 'Инвестиции', path: '/investments' },
        { id: 'savings', label: 'Сбережения', path: '/savings' },
    ];

    const renderToggleButton = () => (
        <button
            className={styles.toggleButton}
            onClick={onToggle}
            aria-label={isOpen ? 'Свернуть панель' : 'Развернуть панель'}
        >
            {isOpen ? '←' : '→'}
        </button>
    );

    const renderPeriodFilters = () => (
        <div className={styles.periodFilters}>
            <h3 className={styles.sectionTitle}>Период</h3>
            <div className={styles.filterButtons}>
                <button>Месяц</button>
                <button>Квартал</button>
                <button>Год</button>
            </div>
        </div>
    );

    const renderFrequentCategories = () => (
        <div className={styles.categories}>
            <h3 className={styles.sectionTitle}>Частые категории расходов</h3>
            <div className={styles.categoryList}>
                {frequentCategories.map(category => (
                    <button
                        key={category.id}
                        className={styles.categoryButton}
                        onClick={() => navigate(`/expenses/${category.id}`)}
                    >
                        {category.icon}
                        {category.name}
                    </button>
                ))}
            </div>
        </div>
    );

    const renderQuickActions = () => (
        <div className={styles.quickActions}>
            <h3 className={styles.sectionTitle}>Быстрые действия</h3>
            <button onClick={() => navigate('/transactions/new')}>
                Добавить транзакцию
            </button>
            <button onClick={() => navigate('/goals/new')}>
                Создать цель
            </button>
        </div>
    );

    const renderActiveGoals = () => (
        <div className={styles.activeGoals}>
            <h3 className={styles.sectionTitle}>Активные цели</h3>
            {activeGoals.map(goal => (
                <div key={goal.id} className={styles.goalProgress}>
                    <div className={styles.goalInfo}>
                        <span className={styles.goalName}>{goal.name}</span>
                        <span className={styles.goalAmount}>
                            {goal.currentAmount} / {goal.targetAmount} ₽
                        </span>
                    </div>
                    <div className={styles.progressBar}>
                        <div
                            className={styles.progressFill}
                            style={{
                                width: `${(goal.currentAmount / goal.targetAmount) * 100}%`
                            }}
                        />
                    </div>
                </div>
            ))}
        </div>
    );

    const renderFinancialNavigation = () => (
        <nav className={styles.financialNavigation}>
            <h3 className={styles.sectionTitle}>Разделы</h3>
            {financialSections.map(section => (
                <button
                    key={section.id}
                    className={styles.navButton}
                    onClick={() => navigate(section.path)}
                >
                    {section.label}
                </button>
            ))}
        </nav>
    );

    return (
        <aside
            className={clsx(
                styles.sidebar,
                { [styles['sidebar--closed']]: !isOpen },
                className
            )}
        >
            {renderToggleButton()}
            <div className={styles.sidebarContent}>
                {renderPeriodFilters()}
                {renderFinancialNavigation()}
                {renderFrequentCategories()}
                {renderQuickActions()}
                {renderActiveGoals()}
            </div>
        </aside>
    );
};