import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import ApplicationRouter from 'routes';
import './styles/index.scss';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <StrictMode>
    <ApplicationRouter />
  </StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
