import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'

import {IParams} from '../../utils/TypeScript'
import {postAPI} from '../../utils/FetchData'
import {showErrMsg, showSuccessMsg} from '../../components/alert/Alert'


const Active = () => {
  const {slug}:IParams = useParams()
  console.log(slug);
  
  const [err, setErr] = useState('')
  const [success, setSuccess] = useState('')
 
  useEffect(() => {
    if(slug){
      postAPI('active', { active_token: slug }, null)
      .then(res => setSuccess(res.msg))
      .catch(err => setErr(err.msg))
    }
  },[slug])


  return (
    <div>
      { err && showErrMsg(err) }
      { success && showSuccessMsg(success) }
    </div>
  )
}

export default Active
