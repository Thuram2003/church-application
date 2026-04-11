
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface ApiErrorResponse {
  success: false;
  error: string;
  message?: string;
  statusCode?: number;
  errorCode?: string;
  details?: {
    statusCode?: number;
    details?: any;
  };
}

export * from "./form";
