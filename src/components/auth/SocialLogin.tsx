import React from 'react';
import { useDispatch } from 'react-redux';
import { GoogleLogin, GoogleLoginResponse } from 'react-google-login-lite';
import { googleLogin, facebokLogin } from '../../redux/actions/authAction';
import { FacebookLogin, FacebookLoginAuthResponse } from 'react-facebook-login-lite';

const SocialLogin = () => {
  const dispatch = useDispatch();

  const onSuccess = (googleUser: GoogleLoginResponse) => {
    const id_token = googleUser.getAuthResponse().id_token;
    dispatch(googleLogin(id_token));
  };

  const onFBSuccess = (response: FacebookLoginAuthResponse) => {
    const { accessToken, userID } = response.authResponse
    dispatch(facebokLogin(accessToken, userID))
  }

  return (
    <>
    Social Login
    <div className = 'py-2'>
      
      <GoogleLogin
        client_id="91672405714-s4ug5s88j642q6u6tltoq37nkovp509f.apps.googleusercontent.com"
        cookiepolicy="single_host_origin"
        onSuccess={onSuccess}
      />
    </div>

    <div className = 'py-2'>
    <FacebookLogin 
      appId="869802030349720"
      onSuccess={onFBSuccess}
        />
    </div>
    </>
  );
};

export default SocialLogin;
