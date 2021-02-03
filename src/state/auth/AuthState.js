import React, { useReducer, createContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthReducer } from './AuthReducer';
import { handleGetUserData, logOut } from '../../lib/auth';

const initialState = {
  userData: {},
  currentProfile: {},
};
export const AuthState = createContext(initialState);
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);
  const history = useHistory();

  const getUserData = (token) => {
    if (!token) return logOut(history);
    return handleGetUserData(token)
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: 'SET_USER_DATA',
            payload: res.data.userData,
          });
        } else if ([401, 403].indexOf(res.status) > -1) logOut(history);
        return res;
      }).catch((err) => err);
  };

  return (
    <AuthState.Provider
      value={{
        ...state,
        getUserData
      }}
    >
      {children}
    </AuthState.Provider>
  );
};
