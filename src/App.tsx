import React, { useEffect } from 'react';
import Form from './pages/Form';
import { UserProfiles } from './pages/Print';
import HomeDash from './pages/HomeDash';
import { useRoutes } from 'react-router-dom';
import { routes } from './routes';
import useStore from './hooks/useStore';

const App = () => {
  const [, actions, select] = useStore();

  const {
      domicile: {
          // getDomiciles
      }
  } = actions



  useEffect(()=> {
    // getDomiciles()
  },[])

  let router = useRoutes(routes);
  return router
};

export default App;
