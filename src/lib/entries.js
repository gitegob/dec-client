import { API_URL } from '../env';
import { fetcher } from './utils';

export const handleGetEntries = async (token) => {
  const res = await fetcher(`${API_URL}/data`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};

export const handleCreateEntry = async (body, token) => {
  const res = await fetcher(`${API_URL}/data`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  return res;
};
