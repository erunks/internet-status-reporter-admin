import { useEffect, useState } from 'react';
import { ApiResponse, ApiResponseData } from 'types/apiResponse';
import { ApiRequestConfig } from 'types/apiRequest';
import axios from 'axios';
import { axiosHeaders } from 'helpers';
import { API_HOST } from 'helpers/constants';

export interface OuttagesResponse {
  data: ApiResponseData[];
  loading: boolean;
  error: string | unknown;
}

const useOuttages = ({
  headers,
  params,
}: ApiRequestConfig): OuttagesResponse => {
  const [data, setData] = useState<ApiResponseData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const { data: response, status } = await axios.get<
        ApiResponse | string
        >(`${API_HOST}/outtages`, {
          headers: { ...headers, ...axiosHeaders },
          params: { ...params },
        });

        if (status === 200 && typeof response !== 'string') {
          setData(response?.data ?? []);
        } else if (typeof response === 'string') {
          setError(response);
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

  return { data, loading, error };
};

export default useOuttages;
