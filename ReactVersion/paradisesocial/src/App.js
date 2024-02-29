import React from 'react';
import './index.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';


import { AuthContextProvider } from './context/AuthContext';
import Login from './pages/Login';
import Account from './pages/Account';
import Signup from './pages/Signup';

function App() {
  return (
    <>
    <AuthContextProvider>
    <Navbar />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/getstarted' element={<Signup />} />
      <Route path='/account' element={<ProtectedRoute><Account /></ProtectedRoute>} />
    </Routes>
    </AuthContextProvider>
    </>
  );
}

export default App;