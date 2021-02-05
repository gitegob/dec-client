
export const pusher = (history, path) => {
  if (history.location.pathname === path) history.replace(path);
  else history.push(path);
};

export const fetcher = async (url, config) => {
  try {
    const data = await fetch(url, config);
    const res = data.json();
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};
