import clsx from 'clsx';
import React, { forwardRef } from 'react';
import styles from './Input.module.scss';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'filled' | 'outlined';
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    (
        {
            label,
            error,
            helperText,
            leftIcon,
            rightIcon,
            size = 'md',
            variant = 'default',
            className,
            disabled,
            ...props
        },
        ref
    ) => {
        const inputId = props.id || `input-${Math.random().toString(36).substr(2, 9)}`;

        return (
            <div className={styles.container}>
                {label && (
                    <label htmlFor={inputId} className={styles.label}>
                        {label}
                    </label>
                )}
                <div className={styles.inputWrapper}>
                    {leftIcon && <span className={styles.leftIcon}>{leftIcon}</span>}
                    <input
                        ref={ref}
                        id={inputId}
                        className={clsx(
                            styles.input,
                            styles[`input--${size}`],
                            styles[`input--${variant}`],
                            { [styles['input--error']]: error },
                            { [styles['input--disabled']]: disabled },
                            { [styles['input--with-left-icon']]: leftIcon },
                            { [styles['input--with-right-icon']]: rightIcon },
                            className
                        )}
                        disabled={disabled}
                        {...props}
                    />
                    {rightIcon && <span className={styles.rightIcon}>{rightIcon}</span>}
                </div>
                {(error || helperText) && (
                    <div className={clsx(styles.helperText, { [styles.error]: error })}>
                        {error || helperText}
                    </div>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';