// Общие типы для всех stores

export interface BaseState {
    isLoading: boolean;
    error: string | null;
}

export interface PaginationState {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface FilterState {
    dateRange: {
        start: string;
        end: string;
    };
    categories: string[];
    tags: string[];
    search: string;
}

export interface ApiError {
    message: string;
    code: string;
    details?: any;
}

export interface ApiResponse<T> {
    data: T;
    message?: string;
    success: boolean;
}

export interface PaginatedResponse<T> {
    data: T[];
    pagination: PaginationState;
}