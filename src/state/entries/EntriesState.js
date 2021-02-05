import React, { useReducer, createContext } from 'react';
import { useHistory } from 'react-router-dom';
import { env } from '../../config';
import { fetcher } from '../../utils';
import { EntriesReducer } from './EntriesReducer';

const initialState = {
  entries: [],
  currentEntry: {},
  resultsVisible: false
};
export const EntriesState = createContext(initialState);
export const EntriesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(EntriesReducer, initialState);

  const updateCurrentEntry = (entry, token) => {
    dispatch({
      type: 'COMPUTED_ENTRY',
      payload: entry,
    });
  };

  const showResults = () => {
    dispatch({
      type: 'SHOW_RESULTS',
    });
  };
  const hideResults = () => {
    dispatch({
      type: 'HIDE_RESULTS',
    });

  };
  const saveEntry = async (body) => {
    const tkn = localStorage.getItem('accessToken');
    const res = await fetcher(`${env.API_URL}/entries`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tkn}`
      },
      body: JSON.stringify(body)
    });
    if ([401, 403].indexOf(res.status) > -1) return { noAuth: true };
    if (res.status !== 201) return { error: res.error };
    return 0;
  };

  const getEntries = async (daily) => {
    const tkn = localStorage.getItem('accessToken');
    const res = await fetcher(`${env.API_URL}/entries${daily ? '?r=today' : ''}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${tkn}`
      }
    });
    if ([401, 403].indexOf(res.status) > -1) return { noAuth: true };
    if (res.status !== 200) return { error: res.error };
    return res;
  };
  return (
    <EntriesState.Provider
      value={{
        ...state,
        updateCurrentEntry,
        hideResults,
        showResults,
        saveEntry,
        getEntries
      }}
    >
      {children}
    </EntriesState.Provider>
  );
};
