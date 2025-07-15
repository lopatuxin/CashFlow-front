export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
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

export interface ApiError {
  message: string;
  code: string;
  details?: any;
}

export interface ApiRequestConfig {
  headers?: Record<string, string>;
  params?: Record<string, any>;
  timeout?: number;
  responseType?: 'json' | 'blob' | 'text';
}

export interface ApiClientConfig {
  baseURL: string;
  timeout: number;
  headers: Record<string, string>;
}

// Типы для различных HTTP методов
export interface GetRequestConfig extends ApiRequestConfig { }
export interface PostRequestConfig extends ApiRequestConfig {
  data?: any;
}
export interface PutRequestConfig extends ApiRequestConfig {
  data?: any;
}
export interface DeleteRequestConfig extends ApiRequestConfig { }

// Типы для аутентификации
export interface AuthToken {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse extends ApiResponse<AuthToken> { }

export interface RefreshTokenRequest {
  refresh_token: string;
}

export interface RefreshTokenResponse extends ApiResponse<AuthToken> { }

// Типы для загрузки файлов
export interface FileUploadRequest {
  file: File;
  type: 'image' | 'document' | 'csv' | 'excel';
  metadata?: Record<string, any>;
}

export interface FileUploadResponse extends ApiResponse<{
  id: string;
  filename: string;
  url: string;
  size: number;
  type: string;
}> { }

// Типы для экспорта данных
export interface ExportRequest {
  format: 'csv' | 'excel' | 'pdf';
  filters?: Record<string, any>;
  columns?: string[];
}

export interface ExportResponse extends ApiResponse<{
  download_url: string;
  expires_at: string;
}> { }

// Типы для уведомлений
export interface NotificationRequest {
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  recipient_id?: string;
  channel: 'email' | 'push' | 'in_app';
}

export interface NotificationResponse extends ApiResponse<{
  id: string;
  status: 'sent' | 'pending' | 'failed';
}> { }

// Типы для логирования
export interface LogEntry {
  level: 'debug' | 'info' | 'warn' | 'error';
  message: string;
  timestamp: string;
  context?: Record<string, any>;
  user_id?: string;
}

export interface LogRequest {
  entries: LogEntry[];
}

export interface LogResponse extends ApiResponse<{
  logged_count: number;
}> { }

// Типы для метрик производительности
export interface PerformanceMetric {
  name: string;
  value: number;
  unit: string;
  timestamp: string;
  tags?: Record<string, string>;
}

export interface PerformanceRequest {
  metrics: PerformanceMetric[];
}

export interface PerformanceResponse extends ApiResponse<{
  processed_count: number;
}> { }
