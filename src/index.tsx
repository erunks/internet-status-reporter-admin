import { StrictMode } from 'react';
import { createRoot, Root } from 'react-dom/client';
import ApplicationRouter from 'routes';
import './styles/index.scss';
import reportWebVitals from './reportWebVitals';

const root = (): Root => {
  let container = document.getElementById('root');
  if (container === null) {
    container = document.createElement('div');
    container.id = 'root';
    document.body.appendChild(container);
  }
  return createRoot(container);
};

root().render(
  <StrictMode>
    <ApplicationRouter />
  </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
