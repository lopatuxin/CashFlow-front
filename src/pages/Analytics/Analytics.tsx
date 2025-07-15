import React from 'react';
import styles from './Analytics.module.scss';

export const Analytics: React.FC = () => {
    return (
        <div className={styles.analytics}>
            <h1>Аналитика</h1>
            <p>Страница детальной аналитики</p>
        </div>
    );
};