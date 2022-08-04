import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/login/Login';
import Create from './pages/create/Create';
import './App.css';
import Layout from './components/Layout';
import Profile from './pages/profile/Profile';
import Filter from './pages/filter/Filter';
import NotFound from './components/NotFound';
import UserContext from './context/UserContext';

function App() {
  const [user, setUser] = useState(null);
  return (
    <div className="App">
      <BrowserRouter>
        <UserContext.Provider value={{ user, setUser }}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/" element={<Layout />}>
              <Route path="create" element={<Create />} />
              <Route path="filter" element={<Filter />} />
              <Route path="profile" element={<Profile />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
