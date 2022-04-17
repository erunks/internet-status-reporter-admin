import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import MainLayout from 'layouts/MainLayout';
import App from 'containers/App';
import Outtage from 'routes/Outtage';

const ApplicationRouter: FC = () => (
  <BrowserRouter>
    <MainLayout>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/outtages" element={<Outtage />} />
      </Routes>
    </MainLayout>
  </BrowserRouter>
);

export default ApplicationRouter;
