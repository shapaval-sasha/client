import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootStore, InputChange, FormSubmit, IUserInfo } from '../../utils/TypeScript';
import NotFound from '../global/NotFound';
import {updateUser, resetPassword} from '../../redux/actions/profileAction'


const UserInfo = () => {
  const initSatate = {
    name: '',
    account: '',
    password: '',
    cf_password: '',
    avatar: '',
  };

  const { auth } = useSelector((state: RootStore) => state);
  const dispatch = useDispatch();

  const [user, setUser] = useState<IUserInfo>(initSatate);
  const [typePass, setTypePass] = useState(false);
  const [typeCfPass, setTypeCfPass] = useState(false);

  const { name, avatar, password, cf_password } = user;

  const handleChangeInput = (e: InputChange) => {
    const { value, name } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleChangeFile = (e:InputChange)=>{
    const target = e.target as HTMLInputElement 
    const files = target.files
    
    if(files){
      const file = files[0]
      setUser({...user, avatar:file})
    }
     }

  
  const handleSubmit = (e:FormSubmit) =>{
    e.preventDefault()
    if(avatar || name)
  dispatch(updateUser((avatar as File), name, auth));

  if(password && auth.access_token)
  dispatch (resetPassword(password, cf_password, auth.access_token))
    
  }

 
  if (!auth.user) return <NotFound />;

  return (
    <form className="profile_info" onSubmit={handleSubmit}>
      <div className="info_avatar">
        <img
          src={avatar ? URL.createObjectURL(avatar) : auth.user?.avatar}
          alt=""
        />
        <span>
          <i className="fas fa-camera" />
          <p>Change</p>
          <input type="file" accept="image/*" name="file" id="file_up" 
          onChange={handleChangeFile}/>
        </span>
      </div>


      <div className="form-group ">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          className="form-control"
          name="name"
          id="name"
          defaultValue={auth.user.name}
          onChange={handleChangeInput}
          
        />
      </div>

      <div className="form-group">
        <label htmlFor="account">Account</label>
        <input
          type="text"
          className="form-control"
          name="account"
          id="account"
          defaultValue={auth.user?.account}
          onChange={handleChangeInput}
          disabled={true}
        />
      </div>
      {
                auth.user.type !== 'register' &&
                <small className='text-danger'>
                  * Quick login account with {auth.user.type} can not use this function. *
                </small>

              }
      <div className="form-group">
        <label htmlFor="password">Password</label>
        
        <div className="pass">
          <input
            type={typePass ? 'text' : 'password'}
            className="form-control"
            name="password"
            id="password"
            value={password}
            onChange={handleChangeInput}
            disabled = {auth.user.type !=='register'}
           />
           <small onClick={()=>setTypePass(!typePass)}>
             {
               typePass ? 'Hide' : 'Show'
             }
           </small>
        </div>
      </div>
             
      <div className="form-group">
        <label htmlFor="cf_password">Confirm Password</label>
        <div className="pass">
          <input
            type={typeCfPass ? 'text' : 'password'}
            className="form-control"
            name="cf_password"
            id="cf_password"
            value={cf_password}
            onChange={handleChangeInput}
            disabled = {auth.user.type !=='register'}
           />
           <small onClick={()=>setTypeCfPass(!typeCfPass)}>
             {
               typeCfPass ? 'Hide' : 'Show'
             }
           </small>
        </div>
      </div>

      <button className='btn btn-dark w-100' type='submit'>Update</button>
    </form>
  );
};

export default UserInfo;
