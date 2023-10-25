import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import React from 'react';

import { Login } from './pages/Login';
import { Home } from './pages/Home';
import { SessionProvider } from './context/SessionContext';
import { AuthGuard } from './routes/AuthGuard';

export default function App() {
  return (
      <BrowserRouter>
        <SessionProvider>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/home" element={<AuthGuard><Home /></AuthGuard>} />
              <Route path="/pagina2" element={<AuthGuard>Pagina 2</AuthGuard>} />
              <Route path="/pagina3" element={<AuthGuard>Pagina 3</AuthGuard>} />
              <Route path="*" element={<Navigate to="/home" replace />} />
            </Routes>
        </SessionProvider>
      </BrowserRouter>
  );
}
