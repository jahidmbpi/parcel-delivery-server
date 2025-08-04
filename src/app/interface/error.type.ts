export interface TResponse {
  path: string;
  message: string;
}

export interface Tgenaric {
  statusCode: number;
  message: string;
  errorSources: TResponse[];
}
