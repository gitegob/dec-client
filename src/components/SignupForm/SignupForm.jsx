import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { API_URL } from '../../env';
import { logUp } from '../../lib/auth';
import { pusher } from '../../lib/utils';

const SignupForm = () => {
  const history=useHistory();
  const [state, setstate] = useState({username:'',password:'',loading:"false",error:""})

  const handleSubmit=(e)=>{
    e.preventDefault();
    setstate({ ...state, error: '', loading: true });
      logUp(state, `${API_URL}/auth/signup`)
        .then((res) => {
          if (res.status !== 201) {
            setstate({ ...state, error: res.error, loading: false });
            setTimeout(() => { setstate({ ...state, error: '' }); }, 3000);
          } else {
            localStorage.setItem('accessToken', res.data.token);
            setstate({ ...state, loading: false });
            pusher(history, '/');
          }
        }).catch((err) => {
          console.log(err);
          setstate({ ...state, error: 'Error connecting to server, please try again.', loading: false });
        setTimeout(() => { setstate({ ...state, error: '' }); }, 3000);
        });
  }
  return (
    <div>
      <form id="form" onSubmit={handleSubmit}>
      <h2 id="title">Sign up</h2>
      <input type="text" placeholder="Username" name="username" id="username" 
        value={state.username}
        onChange={(e)=>setstate({...state,username:e.target.value})}/>
        <input type="password" placeholder="Password" name="password" id="password"
        value={state.password}
        onChange={(e)=>setstate({...state,password:e.target.value})}/>
      <div id="actions">
        <button type="button" id="submitbtn">Signup</button>
      </div>
    </form>
    </div>
  )
}

export default SignupForm
