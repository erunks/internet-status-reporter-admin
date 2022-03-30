import { renderHook } from '@testing-library/react-hooks';
import { ApiRequestConfig } from 'types/apiRequest';
import { ApiResponse } from 'types/apiResponse';
import axios from 'axios';
import { axiosHeaders } from 'helpers';
import { API_HOST } from 'helpers/constants';
import * as OuttageResponse from 'fixtures/outtages_response.json';
import useOuttages from '.';

const getSpy = jest.spyOn(axios, 'get');

describe('useOuttages', () => {
  it('returns an OuttageResponse object', () => {
    const { result } = renderHook(() => useOuttages({}));
    expect(Object.keys(result.current)).toEqual(['data', 'loading', 'error']);
  });

  describe('the request', () => {
    const params = {
      page: { size: 2 },
    };
    const expectedRequestOptions: ApiRequestConfig = {
      headers: { ...axiosHeaders },
      params,
    };

    it('is made to the correct endpoint', () => {
      renderHook(() => useOuttages({ params }));

      expect(getSpy).toHaveBeenCalledWith(
        `${API_HOST}/outtages`,
        expectedRequestOptions
      );
    });

    describe('when the request is successful', () => {
      const { data } = OuttageResponse as ApiResponse;

      it('sets the data', async () => {
        getSpy.mockResolvedValue({
          status: 200,
          data: { data },
        });

        const { result, waitForNextUpdate } = renderHook(() => useOuttages({}));

        await waitForNextUpdate();

        expect(result.current.data).toEqual(data);
      });
    });

    describe('when the server responds with failed status', () => {
      it('sets the error state', async () => {
        getSpy.mockResolvedValue({
          status: 500,
          data: 'Internal Server Error',
        });

        const { result, waitForNextUpdate } = renderHook(() => useOuttages({}));

        await waitForNextUpdate();

        expect(result.current.error).toEqual('Internal Server Error');
      });
    });
  });
});
