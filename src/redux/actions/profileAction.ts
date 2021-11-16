import { Dispatch } from 'redux';
import { IAuth, IAuthType, AUTH } from '../types/authType';
import { IAlertType, ALERT } from '../types/alertType';
import { patchAPI } from '../../utils/FetchData';
import { checkImage, imageUpload } from '../../utils/imageUpload';
import { checkPassword } from '../../utils/Valid';

export const updateUser =
  (avatar: File, name: string, auth: IAuth) =>
  async (dispatch: Dispatch<IAlertType | IAuthType>) => {
    if (!auth.access_token || !auth.user) return;

    let url = '';
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      if (avatar) {
        const check = checkImage(avatar);
        if (check) return dispatch({ type: ALERT, payload: { errors: check } });

        const photo = await imageUpload(avatar);
        url = photo.url;
      }

      dispatch({
        type: AUTH,
        payload: {
          access_token: auth.access_token,
          user: {
            ...auth.user,
            avatar: url ? url : auth.user.avatar,
            name: name ? name : auth.user.name,
          },
        },
      });

      const res = await patchAPI(
        'user',
        {
          avatar: url ? url : auth.user.avatar,
          name: name ? name : auth.user.name,
        },
        auth.access_token
      );

      dispatch({ type: ALERT, payload: { success: res.msg } });
    } catch (err: any) {
      console.log(err);
    }
  };

export const resetPassword =
  (password: string, cf_password: string, token: string) =>
  async (dispatch: Dispatch<IAlertType>) => {
    const msg = checkPassword(password, cf_password);
    if (msg) return dispatch({ type: ALERT, payload: { errors: msg } });
    try {
      dispatch({ type: ALERT, payload: { loading: true } });

      const res = await patchAPI(
        'reset_password',
        {
          password,
        },
        token
      );

      dispatch({ type: ALERT, payload: { success: res.msg } });
    } catch (err: any) {
      console.log(err);
    }
  };
