import { ReactElement } from 'react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { render, RenderResult, RenderOptions } from '@testing-library/react';

interface StubbedRenderOptions extends RenderOptions {
  route?: string;
}
export const stubbedRender = (
  Component: ReactElement,
  options?: StubbedRenderOptions
): RenderResult => {
  window.history.pushState({}, '', options?.route ?? '/');

  return render(Component, {
    wrapper: BrowserRouter,
    ...options,
  });
};

export * from '@testing-library/react';
export { userEvent as fireEvent };
export { stubbedRender as render };
