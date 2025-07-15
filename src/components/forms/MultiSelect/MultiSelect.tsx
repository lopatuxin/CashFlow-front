import clsx from 'clsx';
import React, { useState } from 'react';
import styles from './MultiSelect.module.scss';

export interface MultiSelectOption {
    value: string;
    label: string;
}

export interface MultiSelectProps {
    options: MultiSelectOption[];
    value?: string[];
    onChange?: (value: string[]) => void;
    placeholder?: string;
    className?: string;
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
    options,
    value = [],
    onChange,
    placeholder = 'Выберите опции',
    className,
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const selectedLabels = options
        .filter(option => value.includes(option.value))
        .map(option => option.label)
        .join(', ');

    const displayValue = selectedLabels || placeholder;

    const handleOptionToggle = (optionValue: string) => {
        const newValue = value.includes(optionValue)
            ? value.filter(v => v !== optionValue)
            : [...value, optionValue];
        onChange?.(newValue);
    };

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
                    {options.map((option) => (
                        <label key={option.value} className={styles.option}>
                            <input
                                type="checkbox"
                                checked={value.includes(option.value)}
                                onChange={() => handleOptionToggle(option.value)}
                                className={styles.checkbox}
                            />
                            <span className={styles.optionLabel}>{option.label}</span>
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
};