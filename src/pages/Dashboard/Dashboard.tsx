import React from 'react';
import styles from './Dashboard.module.scss';

export const Dashboard: React.FC = () => {
    return (
        <div className={styles.dashboard}>
            <h1>Дашборд</h1>
            <p>Главная страница аналитического дашборда</p>
        </div>
    );
};