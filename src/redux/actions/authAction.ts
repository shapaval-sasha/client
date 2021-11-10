import { Dispatch } from 'react';
import { IUserLogin, IUserRegister } from '../../utils/TypeScript';
import { postAPI, getAPI } from '../../utils/FetchData';
import { AUTH, IAuthType } from '../types/authType';
import { ALERT, IAlertType } from '../types/alertType';
import { validRegister, validPhone } from '../../utils/Valid';

export const login =
  (userLogin: IUserLogin) =>
  async (dispatch: Dispatch<IAuthType | IAlertType>) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      const res = await postAPI('login', userLogin, null);

      dispatch({
        type: AUTH,
        payload: res,
      });

      if (res.err)
        return dispatch({ type: ALERT, payload: { errors: res.err } });
      dispatch({ type: ALERT, payload: { success: res.msg } });
      localStorage.setItem('logged', 'true');
    } catch (err: any) {
      console.log(err);
    }
  };

export const register =
  (userRegister: IUserRegister) =>
  async (dispatch: Dispatch<IAuthType | IAlertType>) => {
    const check = validRegister(userRegister);
    if (check.errLength > 0)
      return dispatch({ type: ALERT, payload: { errors: check.errMsg } });
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      const res = await postAPI('register', userRegister, null);

      dispatch({ type: ALERT, payload: { success: res.msg } });
    } catch (err: any) {
      console.log(err);
    }
  };

export const refreshToken =
  () => async (dispatch: Dispatch<IAuthType | IAlertType>) => {
    const logged = localStorage.getItem('logged');
    if (logged !== 'true') return;
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      const res = await getAPI('refresh_token', null);
      dispatch({
        type: AUTH,
        payload: res,
      });

      dispatch({ type: ALERT, payload: {} });
    } catch (err: any) {
      console.log(err);
    }
  };

export const logout = () => async () => {
  try {
    localStorage.removeItem('logged');
    await getAPI('logout', null);
    window.location.href = '/';
  } catch (err: any) {
    console.log(err);
  }
};

export const googleLogin =
  (id_token: any) => async (dispatch: Dispatch<IAuthType | IAlertType>) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      const res = await postAPI('google_login', { id_token }, null);

      dispatch({
        type: AUTH,
        payload: res,
      });

      if (res.err)
        return dispatch({ type: ALERT, payload: { errors: res.err } });
      dispatch({ type: ALERT, payload: { success: res.msg } });
      localStorage.setItem('logged', 'true');
    } catch (err: any) {
      console.log(err);
    }
  };

export const facebokLogin =
  (accessToken: string, userID: string) =>
  async (dispatch: Dispatch<IAuthType | IAlertType>) => {
    try {
      // dispatch({ type: ALERT, payload: { loading: true } });
      // const res = await postAPI('facebook_login', {accessToken, userID}, null);

      // dispatch({
      //   type: AUTH,
      //   payload: res,
      // });

      // if (res.err)
      //   return dispatch({ type: ALERT, payload: { errors: res.err } });
      // dispatch({ type: ALERT, payload: { success: res.msg } });
      // localStorage.setItem('logged', 'true');

      dispatch({
        type: ALERT,
        payload: { errors: 'Do not work registration with facebook' },
      });
    } catch (err: any) {
      console.log(err);
    }
  };

export const loginSMS =
  (phone: string) => async (dispatch: Dispatch<IAuthType | IAlertType>) => {
    const check = validPhone(phone);
    if (!check)
      return dispatch({
        type: ALERT,
        payload: { errors: 'Your number phone incorrect' },
      });

    try {
      console.log('ok');
      dispatch({ type: ALERT, payload: { loading: true } });
      const res = await postAPI('login_sms', { phone }, null);
      if (!res.valid) verifySMS(phone, dispatch);
    } catch (err: any) {
      console.log(err);
    }
  };

const verifySMS = async (
  phone: string,
  dispatch: Dispatch<IAuthType | IAlertType>
) => {
  const code = prompt('Enter your code');
  if (!code) return;
  try {
    dispatch({ type: ALERT, payload: { loading: true } });
    const res = await postAPI('sms_verify', { phone, code }, null);

    dispatch({
      type: AUTH,
      payload: res,
    });

    if (!res.access_token) {
      dispatch({ type: ALERT, payload: { errors: res.msg } });

      setTimeout(() => {
        verifySMS(phone, dispatch);
      }, 100);
    } else {
      dispatch({ type: ALERT, payload: { success: res.msg } });
      localStorage.setItem('logged', 'true');
    }
  } catch (err) {
    console.log(err);
  }
};
