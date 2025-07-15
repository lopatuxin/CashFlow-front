import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFound.module.scss';

export const NotFound: React.FC = () => {
    return (
        <div className={styles.notFound}>
            <h1>404</h1>
            <h2>Страница не найдена</h2>
            <p>Запрашиваемая страница не существует</p>
            <Link to="/dashboard" className={styles.link}>
                Вернуться на главную
            </Link>
        </div>
    );
};