import clsx from 'clsx';
import React, { useState } from 'react';
import styles from './DateRangePicker.module.scss';

export interface DateRange {
    startDate: Date | null;
    endDate: Date | null;
}

export interface DateRangePickerProps {
    value?: DateRange;
    onChange?: (range: DateRange) => void;
    placeholder?: string;
    className?: string;
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
    value,
    onChange,
    placeholder = 'Выберите период',
    className,
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const formatDate = (date: Date | null) => {
        if (!date) return '';
        return date.toLocaleDateString('ru-RU');
    };

    const displayValue = value?.startDate && value?.endDate
        ? `${formatDate(value.startDate)} - ${formatDate(value.endDate)}`
        : placeholder;

    return (
        <div className={clsx(styles.container, className)}>
            <button
                className={styles.trigger}
                onClick={() => setIsOpen(!isOpen)}
                type="button"
            >
                <span className={styles.value}>{displayValue}</span>
                <span className={styles.icon}>▼</span>
            </button>
            {isOpen && (
                <div className={styles.dropdown}>
                    <div className={styles.placeholder}>
                        Date Range Picker Component
                        <br />
                        Start: {formatDate(value?.startDate)}
                        <br />
                        End: {formatDate(value?.endDate)}
                    </div>
                </div>
            )}
        </div>
    );
};