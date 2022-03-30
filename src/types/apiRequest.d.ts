interface ApiRequestConfigParams {
  date?: {
    start?: string;
    end?: string;
    method?: string;
  };
  filter?: {
    maintenance?: boolean;
    downtime?: string;
    loss?: number;
    description?: string;
    priority?: number;
  };
  page?: {
    offset?: number;
    size?: number;
  };
}

export interface ApiRequestConfig {
  headers?: Readonly<Record<string, string>>;
  params?: Readonly<ApiRequestConfigParams>;
}
