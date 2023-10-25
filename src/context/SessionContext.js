import React, { createContext, useEffect, useState } from 'react';
import * as api from '../services/api';
import { useNavigate } from 'react-router-dom';

// Creamos el contexto
const SessionContext = createContext();

// El proveedor del contexto
const SessionProvider = ({ children }) => {
  // Estado para la variable de sesión
  const [session, setSession] = useState(null);
  const navigate = useNavigate();

  const checkSession = async () => {
    try {
      await api.checkSession()
      setSession(true);
    } catch (error) {
      if (error.message === '401') {
        setSession(false);
        navigate('/login')
      }
    }
  }

  // useEffect vacío
  useEffect(() => {
    checkSession();
  }, []);

  return (
    <SessionContext.Provider value={[session, setSession]}>
      {children}
    </SessionContext.Provider>
  );
};

export { SessionContext, SessionProvider };

