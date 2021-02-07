import React, { useContext, useState } from 'react';
// import './AddUser.css';
import { AuthState } from '../../state/auth/AuthState';
import { validator } from '../../utils';
import Message from '../Message/Message';

const AddUser = ({ manager, employee }) => {
  const [state, setstate] = useState({ username: '', password: '', loading: false, error: '' });
  const [pwdShow, setpwdShow] = useState(false);
  const { addEmployee, addManager, logout } = useContext(AuthState);
  let adduserWrapper = addEmployee;

  if (employee) adduserWrapper = addEmployee;
  if (manager) adduserWrapper = addManager;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setstate({ ...state, error: '', success: '', loading: true });
    const userError = validator({ username: state.username, password: state.password }, 'addUserSchema');
    if (!userError) {
      const { error, noAuth, success } = await adduserWrapper(
        { username: state.username, password: state.password },
        localStorage.getItem('accessToken'),
      );
      setstate({ ...state, loading: false });
      if (error) {
        setstate({ ...state, loading: false, error });
        setTimeout(() => {
          setstate({ ...state, error: '', success: '' });
        }, 2000);
      } else if (noAuth) logout();
      else {
        setstate({ ...state, loading: false, success });
        setTimeout(() => {
          setstate({ ...state, error: '', success: '' });
        }, 2000);
      }
    } else {
      setstate({ ...state, loading: false, error: userError });
      setTimeout(() => {
        setstate({ ...state, error: '', success: '' });
      }, 2000);
    }
  };
  return (
    <form id="logupForm" onSubmit={handleSubmit}>
      <h2 id="title">{employee ? 'Add Employee' : 'Add Manager'}</h2>
      <div className="input-wrapper">
        <input
          type="text"
          placeholder="Username"
          name="username"
          id="username"
          value={state.username}
          onChange={(e) => setstate({ ...state, username: e.target.value })}
        />
      </div>
      <div className="input-wrapper">
        <input
          type={pwdShow ? 'text' : 'password'}
          placeholder="Password"
          id="password"
          name="password"
          value={state.password}
          onChange={(e) => setstate({ ...state, password: e.target.value })}
        />
        <button type="button" id="showhide" onClick={() => setpwdShow(!pwdShow)}>
          {pwdShow ? 'HIDE' : 'SHOW'}
        </button>
      </div>
      <div id="actions">
        <button type="submit" id="submitbtn" disabled={state.loading}>
          {state.loading ? 'Wait...' : 'Add'}
        </button>
      </div>
      {state.error && <Message message={state.error} error={true} />}
      {state.success && <Message message={state.success} error={false} />}
    </form>
  );
};

export default AddUser;
