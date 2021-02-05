import React, { useReducer, createContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthReducer } from './AuthReducer';
import { fetcher, pusher } from '../../utils';
import { env } from '../../config';

const initialState = {
  userData: null,
  isAuthenticated: false,
};
export const AuthState = createContext(initialState);
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);
  const history = useHistory();

  const login = async (body) => {
    localStorage.clear();
    const res = await fetcher(`${env.API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    if (res.status !== 200) return ({ error: res.error });
    return ({ token: res.data.token });
  };

  const getUserData = async (token) => {
    if (!token) return logout();
    const res = await fetcher(`${env.API_URL}/auth/userdata`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if ([401, 403].indexOf(res.status) > -1) return logout();
    dispatch({
      type: 'SET_USER_DATA',
      payload: res.data
    });
  };

  const authenticate = async (token) => {
    const res = await fetcher(`${env.API_URL}/auth/validate`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status !== 200) return { auth: false };
    return { auth: true };
  };

  const logout = () => {
    dispatch({
      type: "LOG_OUT"
    });
    localStorage.clear();
    pusher(history, '/auth');
  };

  return (
    <AuthState.Provider
      value={{
        ...state,
        authenticate,
        login,
        logout,
        getUserData
      }}
    >
      {children}
    </AuthState.Provider>
  );
};
