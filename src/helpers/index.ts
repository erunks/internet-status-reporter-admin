import { generate } from '@ant-design/colors';
import { stringify } from 'qs';
import { ApiRequestConfigParams } from 'types/apiRequest';

export const axiosHeaders: Readonly<Record<string, string>> = {
  Accept: 'application/json',
  'Content-Type': 'application/json; charset=utf-8',
};

export const downtimeInSeconds = (downtime: string): number => {
  const floats = downtime.split(':').map(parseFloat);
  const multipliers = [1440.0, 60.0, 1.0];

  if (floats.length !== multipliers.length) {
    // eslint-disable-next-line no-console
    console.assert(floats.length === 3, {
      floats,
      error: 'downtime should be in format of "HH:MM:SS"',
    });
    throw new Error('Invalid downtime format');
  }

  return floats.reduce(
    (sum, value, index) => sum + value * (multipliers?.[index] ?? 1.0),
    0
  );
};

export const neutralDarkPalette = generate('#999', {
  theme: 'default',
}).reverse();

export const parameterSerializer = (
  paramsToSerialize: ApiRequestConfigParams
): string =>
  stringify(paramsToSerialize, {
    arrayFormat: 'brackets',
    encode: false,
  });

export default {
  axiosHeaders,
  downtimeInSeconds,
  neutralDarkPalette,
};
