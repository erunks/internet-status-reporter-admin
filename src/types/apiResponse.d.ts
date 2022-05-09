interface JsonApiResponseData {
  type: string;
  id: string;
  attributes: object;
}

export interface ModemEventResponseData extends JsonApiResponseData {
  attributes: {
    priority: number;
    description: string;
    maintenance: boolean;
    createdAt: string;
  };
}

interface OuttageLatencyInfo {
  [key: string]: {
    deviation: number;
    max: number;
    mean: number;
    min: number;
  };
}

interface OuttageManualTypedInfo {
  [key: string]: string;
}

export interface OuttageResponseData extends JsonApiResponseData {
  attributes: {
    downtime: string;
    createdAt: string;
    maintenance: boolean;
    info: OuttageLatencyInfo | OuttageManualTypedInfo | object;
    loss: number;
  };
}

export type ApiResponseData = ModemEventResponseData | OuttageResponseData;
export interface ApiResponseError {
  status: string;
  detail: string;
  source?: {
    pointer?: string;
    parameter?: string;
  };
}

export interface ApiResponseMeta {
  totalCount: number;
}

export interface ApiResponse {
  data?: ApiResponseData[];
  errors?: ApiResponseError[];
  meta?: ApiResponseMeta;
}
