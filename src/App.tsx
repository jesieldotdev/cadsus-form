import React from 'react';
import Form from './pages/Form';
import { UserProfiles } from './pages/Print';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
     <UserProfiles/>
    </div>
  );
};

export default App;
