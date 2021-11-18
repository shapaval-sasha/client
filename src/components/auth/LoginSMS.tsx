import React, {useState} from 'react'
import {FormSubmit} from '../../utils/TypeScript'
import { useDispatch } from 'react-redux'
import {loginSMS} from  '../../redux/actions/authAction'

const LoginSMS = () => {
const [phone, setPhone]= useState ('')
const dispatch = useDispatch()

const handleSubmit = (e:FormSubmit)=>{
  e.preventDefault()
  dispatch(loginSMS(phone))
}


  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group mb-3">
        <label htmlFor='phone' className="form-label mb-3">Phone number</label>
        <input type='text' className='form-control' id='phone' value={phone} onChange={e=>setPhone(e.target.value)} placeholder='+375 ( __ )___-__-__'/>
      </div>

      <button type='submit' className='btn btn-dark w-100 ' disabled={phone ? false : true}>Login</button>
    </form>
  )
}

export default LoginSMS
