import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import MainLayout from 'layouts/MainLayout';
import App from 'containers/App';

const ApplicationRouter: FC = () => (
  <BrowserRouter>
    <MainLayout>
      <Routes>
        <Route path="/" element={<App />} />
      </Routes>
    </MainLayout>
  </BrowserRouter>
);

export default ApplicationRouter;
