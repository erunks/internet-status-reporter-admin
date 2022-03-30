export const API_HOST: string =
  process.env.REACT_APP_BACKEND_HOST ?? 'http://localhost:3100';
export const IS_PRODUCTION: boolean = process.env.NODE_ENV === 'production';
