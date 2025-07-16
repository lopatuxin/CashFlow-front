import React from 'react';
import styles from './Header.module.scss';

interface LogoProps {
  className?: string;
  size?: 'small' | 'medium' | 'large';
}

export const Logo: React.FC<LogoProps> = ({
  className,
  size = 'medium'
}) => {
  return (
    <div className={`${styles.logo} ${styles[`logo--${size}`]} ${className || ''}`}>
      <div className={styles.logoIcon}>
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="32" height="32" rx="8" fill="#10B981" />
          <path
            d="M16 4L24 8V16L16 20L8 16V8L16 4Z"
            fill="white"
            fillOpacity="0.9"
          />
          <path
            d="M12 12L16 10L20 12V14L16 16L12 14V12Z"
            fill="white"
          />
          <circle cx="16" cy="16" r="2" fill="#10B981" />
          <path
            d="M14 18L16 16L18 18"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <span className={styles.logoText}>CashFlow</span>
    </div>
  );
};