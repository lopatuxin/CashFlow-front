import {
    ENV,
    formatDate,
    formatNumber,
    formatPercent,
    formatPhoneNumber,
    languageSettings,
    storage,
    themeSettings,
    validateEmail,
    validatePhone,
} from '@/utils';
import React, { useState } from 'react';

export const UtilsTest: React.FC = () => {
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [number, setNumber] = useState('125000');
    const [date, setDate] = useState('2024-01-15');
    const [testData, setTestData] = useState('');

    const emailValidation = validateEmail(email);
    const phoneValidation = validatePhone(phone);

    const handleSaveData = () => {
        storage.set('test_data', testData);
        alert('Данные сохранены!');
    };

    const handleLoadData = () => {
        const data = storage.get<string>('test_data');
        setTestData(data || '');
    };

    const handleToggleTheme = () => {
        const newTheme = themeSettings.toggle();
        alert(`Тема изменена на: ${newTheme}`);
    };

    const handleToggleLanguage = () => {
        const current = languageSettings.get();
        const newLang = current === 'ru' ? 'en' : 'ru';
        languageSettings.set(newLang);
        alert(`Язык изменен на: ${newLang}`);
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h2>Тест Утилит</h2>

            <div style={{ marginBottom: '20px' }}>
                <h3>Переменные окружения</h3>
                <p>API URL: {ENV.API_BASE_URL}</p>
                <p>Название приложения: {ENV.APP_NAME}</p>
                <p>Версия: {ENV.APP_VERSION}</p>
                <p>Окружение: {ENV.APP_ENVIRONMENT}</p>
                <p>DevTools включены: {ENV.ENABLE_DEVTOOLS ? 'Да' : 'Нет'}</p>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <h3>Форматирование дат</h3>
                <p>Короткий формат: {formatDate(date, 'dd.MM.yyyy')}</p>
                <p>Средний формат: {formatDate(date, 'dd MMM yyyy')}</p>
                <p>Длинный формат: {formatDate(date, 'dd MMMM yyyy')}</p>
                <p>Относительное время: {formatDate(new Date(), 'relative')}</p>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <h3>Форматирование чисел</h3>
                <p>Обычное число: {formatNumber(parseFloat(number))}</p>
                <p>С валютой: {formatNumber(parseFloat(number), { currency: 'RUB' })}</p>
                <p>Компактное: {formatNumber(parseFloat(number), { compact: true })}</p>
                <p>Процент: {formatPercent(12.5)}</p>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <h3>Форматирование телефона</h3>
                <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Введите номер телефона"
                    style={{ marginRight: '10px' }}
                />
                <p>Отформатированный: {formatPhoneNumber(phone)}</p>
                <p>Валидность: {phoneValidation.isValid ? '✅ Валидный' : '❌ Невалидный'}</p>
                {!phoneValidation.isValid && (
                    <p style={{ color: 'red' }}>Ошибки: {phoneValidation.errors.join(', ')}</p>
                )}
            </div>

            <div style={{ marginBottom: '20px' }}>
                <h3>Валидация email</h3>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Введите email"
                    style={{ marginRight: '10px' }}
                />
                <p>Валидность: {emailValidation.isValid ? '✅ Валидный' : '❌ Невалидный'}</p>
                {!emailValidation.isValid && (
                    <p style={{ color: 'red' }}>Ошибки: {emailValidation.errors.join(', ')}</p>
                )}
            </div>

            <div style={{ marginBottom: '20px' }}>
                <h3>localStorage</h3>
                <input
                    type="text"
                    value={testData}
                    onChange={(e) => setTestData(e.target.value)}
                    placeholder="Данные для сохранения"
                    style={{ marginRight: '10px' }}
                />
                <button onClick={handleSaveData} style={{ marginRight: '10px' }}>
                    Сохранить
                </button>
                <button onClick={handleLoadData}>Загрузить</button>
                <p>Размер данных: {storage.size()} байт</p>
                <p>Ключи: {storage.keys().join(', ')}</p>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <h3>Настройки</h3>
                <button onClick={handleToggleTheme} style={{ marginRight: '10px' }}>
                    Сменить тему
                </button>
                <button onClick={handleToggleLanguage}>
                    Сменить язык
                </button>
                <p>Текущая тема: {themeSettings.get()}</p>
                <p>Текущий язык: {languageSettings.get()}</p>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <h3>Тестовые данные</h3>
                <p>Дата: {date}</p>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
                <p>Число: {number}</p>
                <input
                    type="number"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                />
            </div>
        </div>
    );
};