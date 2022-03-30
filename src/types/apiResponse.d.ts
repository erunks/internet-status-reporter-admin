interface JsonApiResponseData {
  type: string;
  id: string;
  attributes: object;
}

interface ModemEventResponseData extends JsonApiResponseData {
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

interface OuttageResponseData extends JsonApiResponseData {
  attributes: {
    downtime: string;
    createdAt: string;
    maintenance: boolean;
    info: OuttageLatencyInfo | OuttageManualTypedInfo | object;
    loss: number;
  };
}

export type ApiResponseData = ModemEventResponseData | OuttageResponseData;

export interface ApiResponse {
  data?: ApiResponseData[];
}
