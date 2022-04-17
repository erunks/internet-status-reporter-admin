import { generate } from '@ant-design/colors';

export const axiosHeaders: Readonly<Record<string, string>> = {
  Accept: 'application/json',
  'Content-Type': 'application/json; charset=utf-8',
};

export const neutralDarkPalette = generate('#ccc', { theme: 'dark' });

export default {
  axiosHeaders,
  neutralDarkPalette,
};
