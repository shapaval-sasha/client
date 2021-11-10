import React from 'react';
import RegisterForm from '../components/auth/RegisterForm';

import { Link } from 'react-router-dom';

const Register = () => {
 

  return (
    <div className="auth_page">
      <div className="auth_box">
        <h3 className="text-uppercase text-center mb-4">Register</h3>

      <RegisterForm/>

        <p>
         {`Alredy have an account?`}
          <Link to='/login' style={{color:'red', padding:'10px'}}>
           Login Now
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Register;
