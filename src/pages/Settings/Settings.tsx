import React from 'react';
import styles from './Settings.module.scss';

export const Settings: React.FC = () => {
    return (
        <div className={styles.settings}>
            <h1>Настройки</h1>
            <p>Страница настроек приложения</p>
        </div>
    );
};