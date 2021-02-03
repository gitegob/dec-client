import { pusher, fetcher } from './utils';

export const logUp = async (body, path) => {
  localStorage.clear();
  const res = await fetcher(path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  return res;
};

export const logOut = (history) => {
  localStorage.clear();
  pusher(history, '/login');
};

export const handleGetUserData = async (token) => {
  const res = await fetcher('/auth/userdata', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};
