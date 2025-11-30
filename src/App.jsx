import React from 'react';
// Import Routes instead of Switch
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import LoginPage from './component/sign/sign';
import Mains from './mains';


function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      {/* The /main/* path is crucial for enabling nested routes inside Mains */}
      <Route path="/main/*" element={<Mains />} />
    </Routes>
  );
}

export default App;