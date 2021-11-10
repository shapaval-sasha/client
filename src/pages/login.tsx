import React, { useState, useEffect } from 'react';
import LoginPass from '../components/auth/LoginPass';
import LoginSMS from '../components/auth/LoginSMS';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SocialLogin from '../components/auth/SocialLogin'



const Login = () => {
  const [sms, setSms] = useState(false);
  const history = useHistory()
  const {auth}= useSelector((state: any)=>state)


  useEffect(() => {
   if(auth.access_token) history.push('/')
;
  }, [auth.access_token, history])
 
  return (
    <div className="auth_page">
      <div className="auth_box">
        <h3 className="text-uppercase text-center mb-4">Login</h3>
<SocialLogin/>
       {sms ? <LoginSMS /> : <LoginPass /> }

        <small className="row my-2 text-primary" style={{ cursor: 'pointer' }}>
          <span className="col-6">
            <Link to="/forgot_password">Forgot password?</Link>
          </span>

          <span className="col-6 text-end" onClick={()=>{setSms(!sms)}}>
            {sms ? 'Sign in with password' : 'Sign in with SMS'}
          </span>
        </small>

        <p>
         {` You do not have account?`}
          <Link to='/register' style={{color:'red', padding:'10px'}}>
           Register now
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;
