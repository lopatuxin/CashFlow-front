import clsx from 'clsx';
import React from 'react';
import styles from './DataTable.module.scss';

export interface DataTableColumn<T> {
    key: keyof T;
    title: string;
    render?: (value: T[keyof T], row: T) => React.ReactNode;
}

export interface DataTableProps<T> {
    data: T[];
    columns: DataTableColumn<T>[];
    title?: string;
    className?: string;
}

export function DataTable<T>({
    data,
    columns,
    title,
    className,
}: DataTableProps<T>) {
    return (
        <div className={clsx(styles.container, className)}>
            {title && <h3 className={styles.title}>{title}</h3>}
            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            {columns.map((column) => (
                                <th key={String(column.key)} className={styles.header}>
                                    {column.title}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, index) => (
                            <tr key={index} className={styles.row}>
                                {columns.map((column) => (
                                    <td key={String(column.key)} className={styles.cell}>
                                        {column.render
                                            ? column.render(row[column.key], row)
                                            : String(row[column.key])}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}