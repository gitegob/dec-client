
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

export const validateUser = ({ username, password }) => {
  if (/^[a-z]([a-zA-Z0-9_.]){3,20}$/.test(username)) {
    if (/^(?=.*[a-z])(?=.*[A-Z]).{6,128}$/.test(password)) {
      return { valid: true };
    }
    return { valid: false, error: 'Weak Password (atleast 6 characters with a capital letter)' };
  }
  return { valid: false, error: "Weak username (atleast 4 lowercase alpha characters and numeric characters" };
};