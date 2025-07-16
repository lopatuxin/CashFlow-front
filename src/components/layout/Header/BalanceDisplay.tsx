import React from 'react';
import styles from './Header.module.scss';
import { User } from './Header.types';

interface BalanceDisplayProps {
    user: User;
    className?: string;
    showCurrency?: boolean;
}

export const BalanceDisplay: React.FC<BalanceDisplayProps> = ({
    user,
    className,
    showCurrency = true
}) => {
    const formatBalance = (balance: number, currency: string) => {
        const formatter = new Intl.NumberFormat('ru-RU', {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
        });

        return formatter.format(balance);
    };

    const getBalanceColor = (balance: number) => {
        if (balance >= 0) return styles.balancePositive;
        return styles.balanceNegative;
    };

    return (
        <div className={`${styles.balanceDisplay} ${className || ''}`}>
            <div className={styles.balanceLabel}>Баланс</div>
            <div className={`${styles.balanceAmount} ${getBalanceColor(user.balance)}`}>
                {formatBalance(user.balance, user.currency)}
            </div>
            {showCurrency && (
                <div className={styles.balanceCurrency}>{user.currency}</div>
            )}
        </div>
    );
};