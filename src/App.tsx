import React from 'react';
import Form from './pages/Form';
import { UserProfiles } from './pages/Print';
import HomeDash from './pages/HomeDash';
import { useRoutes } from 'react-router-dom';
import { routes } from './routes';

const App = () => {
  let router = useRoutes(routes);
  return router
};

export default App;
