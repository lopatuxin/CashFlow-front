import { FC } from 'react';
import styles from './Footer.module.scss';
import { FooterProps } from './Footer.types';

export const Footer: FC<FooterProps> = ({ version, systemStatus }) => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.section}>
                    <span className={styles.copyright}>
                        © {currentYear} CashFlow. Все права защищены.
                    </span>
                </div>

                <div className={styles.section}>
                    <nav className={styles.links}>
                        <a href="/privacy" className={styles.link}>
                            Политика конфиденциальности
                        </a>
                        <a href="/terms" className={styles.link}>
                            Условия использования
                        </a>
                        <a href="/docs" className={styles.link}>
                            Документация
                        </a>
                        <a href="/faq" className={styles.link}>
                            FAQ
                        </a>
                    </nav>
                </div>

                <div className={styles.section}>
                    <div className={styles.info}>
                        <span className={styles.version}>Версия: {version}</span>
                        {systemStatus && (
                            <span className={styles.status}>
                                Статус системы: {systemStatus}
                            </span>
                        )}
                    </div>
                    <div className={styles.support}>
                        Поддержка: support@cashflow.com
                    </div>
                </div>
            </div>
        </footer>
    );
};