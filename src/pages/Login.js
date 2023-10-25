import React, { useContext } from 'react';
import { SessionContext } from '../context/SessionContext';
import * as api from '../services/api';
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  const [session, setSession] = useContext(SessionContext)

  const submit = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target).entries());
  
    try {
      await api.login(data)
      setSession(true);
      navigate('/home');
    } catch {
      setSession(false);
    }
  }

  return (
    <form onSubmit={submit}>
      <input name="username" type="text" />
      <input name="password" type="password" />
      <button>login</button>
    </form>
  );
};
