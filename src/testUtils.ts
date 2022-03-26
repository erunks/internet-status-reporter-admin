import { ReactElement } from 'react';
import userEvent from '@testing-library/user-event';
import { render, RenderResult, RenderOptions } from '@testing-library/react';

export const stubbedRender = (
  Component: ReactElement,
  options?: RenderOptions
): RenderResult =>
  render(Component, {
    ...options,
  });

export * from '@testing-library/react';
export { userEvent as fireEvent };
export { stubbedRender as render };
