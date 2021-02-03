import React, { useState } from 'react'
import './Auth.css';
import LoginForm from '../../components/LoginForm/LoginForm';
import SignupForm from '../../components/SignupForm/SignupForm';

const Auth = () => {

  const [authoption, setauthoption] = useState("login")
  return (
    <> 
    <h2 id="title">WELCOME TO DATA ENTRY CALCULATOR</h2>
    <div id="auth-options">
      <div className="option text-center" id="login-option" onClick={()=>setauthoption("login")}>LOG IN</div>
      <div className="option text-center" id="signup-option" onClick={()=>setauthoption("signup")}>SIGN UP</div>
    </div>
    {(authoption==="login")&&<LoginForm/>}
      {(authoption==="signup")&&<SignupForm/>}
    </>
  )
}

export default Auth
