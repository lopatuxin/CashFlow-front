export interface MetricData {
  id: string;
  name: string;
  value: number;
  change: number;
  trend: 'up' | 'down' | 'stable';
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string;
    borderColor?: string;
  }[];
}

export interface FilterOptions {
  dateRange: {
    start: Date;
    end: Date;
  };
  categories: string[];
  metrics: string[];
}

// Дополнительные типы для аналитической системы
export interface DashboardWidget {
  id: string;
  type: 'metric' | 'chart' | 'table' | 'text';
  title: string;
  data: MetricData | ChartData | TableData | string;
  position: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export interface TableData {
  headers: string[];
  rows: (string | number)[][];
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'viewer';
}
