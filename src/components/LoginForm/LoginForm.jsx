import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthState } from '../../state/auth/AuthState';
import { pusher } from '../../utils';
import Message from '../Message/Message';

const LoginForm = () => {
  const [state, setstate] = useState({ username: '', password: '', loading: false, error: '' });
  const [pwdShow, setpwdShow] = useState(false);
  const { login } = useContext(AuthState);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setstate({ ...state, error: '', loading: true });
    const { error, token } = await login({ username: state.username, password: state.password });
    setstate({ ...state, loading: false });
    if (error) {
      setstate({ ...state, loading: false, error: error });
      setTimeout(() => {
        setstate({ ...state, error: '' });
      }, 2000);
    } else {
      localStorage.setItem('accessToken', token);
      pusher(history, '/');
    }
  };
  return (
    <form id="logupForm" onSubmit={handleSubmit}>
      <h2 id="title">Log in</h2>
      <input
        type="text"
        placeholder="Username"
        name="username"
        id="username"
        value={state.username}
        onChange={(e) => setstate({ ...state, username: e.target.value })}
      />
      <input
        type={pwdShow ? 'text' : 'password'}
        placeholder="Password"
        name="password"
        id="password"
        value={state.password}
        onChange={(e) => setstate({ ...state, password: e.target.value })}
      />
      <button type="button" onClick={() => setpwdShow(!pwdShow)}>
        {pwdShow ? 'Hide password' : 'Show Password'}
      </button>
      <div id="actions">
        <button type="submit" id="submitbtn">
          {state.loading ? 'Wait...' : 'Login'}
        </button>
      </div>
      {state.error && <Message message={state.error} />}
    </form>
  );
};

export default LoginForm;
