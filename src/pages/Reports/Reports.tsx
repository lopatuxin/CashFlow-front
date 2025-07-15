import React from 'react';
import styles from './Reports.module.scss';

export const Reports: React.FC = () => {
    return (
        <div className={styles.reports}>
            <h1>Отчеты</h1>
            <p>Страница генерации и просмотра отчетов</p>
        </div>
    );
};