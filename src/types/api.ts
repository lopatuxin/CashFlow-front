export interface ApiEndpoints {
  readonly METRICS: '/api/metrics';
  readonly CHARTS: '/api/charts';
  readonly FILTERS: '/api/filters';
  readonly DASHBOARD: '/api/dashboard';
}

export interface RequestConfig {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: unknown;
  signal?: AbortSignal;
}

export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
