import clsx from 'clsx';
import React, { useState } from 'react';
import styles from './SearchInput.module.scss';

export interface SearchInputProps {
    value?: string;
    onChange?: (value: string) => void;
    onSearch?: (value: string) => void;
    placeholder?: string;
    className?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({
    value = '',
    onChange,
    onSearch,
    placeholder = 'Поиск...',
    className,
}) => {
    const [inputValue, setInputValue] = useState(value);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setInputValue(newValue);
        onChange?.(newValue);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch?.(inputValue);
    };

    const handleClear = () => {
        setInputValue('');
        onChange?.('');
    };

    return (
        <form onSubmit={handleSubmit} className={clsx(styles.container, className)}>
            <div className={styles.inputWrapper}>
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleChange}
                    placeholder={placeholder}
                    className={styles.input}
                />
                {inputValue && (
                    <button
                        type="button"
                        onClick={handleClear}
                        className={styles.clearButton}
                        aria-label="Очистить поиск"
                    >
                        ×
                    </button>
                )}
                <button type="submit" className={styles.searchButton}>
                    🔍
                </button>
            </div>
        </form>
    );
};