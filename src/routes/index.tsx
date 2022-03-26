import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import App from 'containers/App';

const ApplicationRouter: FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
    </Routes>
  </BrowserRouter>
);

export default ApplicationRouter;
