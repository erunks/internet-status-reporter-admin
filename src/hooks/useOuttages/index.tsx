import { useEffect, useState } from 'react';
import {
  ApiResponse,
  ApiResponseData,
  ApiResponseMeta,
} from 'types/apiResponse';
import { ApiRequestConfig } from 'types/apiRequest';
import axios from 'axios';
import { axiosHeaders, parameterSerializer } from 'helpers';
import { API_HOST } from 'helpers/constants';

export interface OuttagesResponse {
  data: ApiResponseData[];
  loading: boolean;
  error: string | unknown;
  meta: ApiResponseMeta;
}

const useOuttages = ({
  headers,
  params,
}: ApiRequestConfig): OuttagesResponse => {
  const [data, setData] = useState<ApiResponseData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [meta, setMeta] = useState<ApiResponseMeta>({ totalCount: 0 });

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const { data: response, status } = await axios.get<ApiResponse>(
          `${API_HOST}/outtages`,
          {
            headers: { ...headers, ...axiosHeaders },
            params: { ...params },
            paramsSerializer: parameterSerializer,
          }
        );

        if (status >= 200 && status < 300) {
          setData(response?.data ?? []);
        } else if (status > 499) {
          setError(response?.errors?.[0]?.detail ?? 'Unknown error');
        }

        if (response?.meta) {
          setMeta(response.meta);
        }

        setLoading(false);
      } catch (err: unknown | string) {
        if (axios.isAxiosError(err)) {
          setError(err?.message ?? err);
        } else if (typeof err === 'string') {
          setError(err);
        }
      }
    };
    fetchData(); // eslint-disable-line @typescript-eslint/no-floating-promises
  }, [headers, params]);

  return { data, loading, error, meta };
};

export default useOuttages;
