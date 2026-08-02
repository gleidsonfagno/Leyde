export type ApiResponse<T> = {
  data: T;
  meta?: {
    totalElements?: number;
    totalPages?: number;
    page?: number;
    size?: number;
  };
};

export type ApiError = {
  message: string;
  status?: number;
  details?: any;
};
