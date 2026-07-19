import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import { useThemeStore } from './store/themeStore';

import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';


export default function App() {
  const hydrate = useAuthStore((s) => s.hydrate);

  const initTheme = useThemeStore((s) => s.initTheme);
  useEffect(() => { initTheme(); }, [initTheme]);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />


        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}