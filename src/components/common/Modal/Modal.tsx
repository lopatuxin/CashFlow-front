import clsx from 'clsx';
import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.scss';

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    closeOnOverlayClick?: boolean;
    closeOnEscape?: boolean;
    className?: string;
}

export const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    title,
    children,
    size = 'md',
    closeOnOverlayClick = true,
    closeOnEscape = true,
    className,
}) => {
    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && closeOnEscape) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose, closeOnEscape]);

    const handleOverlayClick = (event: React.MouseEvent) => {
        if (event.target === event.currentTarget && closeOnOverlayClick) {
            onClose();
        }
    };

    if (!isOpen) return null;

    return createPortal(
        <div className={styles.overlay} onClick={handleOverlayClick}>
            <div
                className={clsx(
                    styles.modal,
                    styles[`modal--${size}`],
                    className
                )}
                role="dialog"
                aria-modal="true"
                aria-labelledby={title ? 'modal-title' : undefined}
            >
                {(title || closeOnOverlayClick) && (
                    <div className={styles.header}>
                        {title && (
                            <h2 id="modal-title" className={styles.title}>
                                {title}
                            </h2>
                        )}
                        <button
                            className={styles.closeButton}
                            onClick={onClose}
                            aria-label="Закрыть модальное окно"
                        >
                            ×
                        </button>
                    </div>
                )}
                <div className={styles.content}>{children}</div>
            </div>
        </div>,
        document.body
    );
};