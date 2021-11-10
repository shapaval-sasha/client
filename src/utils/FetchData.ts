//import axios from 'axios'



// export const postAPI2 = async(url:string, post:object, token?: any )=>
// {
//   const res = await axios.post(`/api/${url}`, post, {
//     headers: {Authorization : token}
//   })

//   return res
// }


export const postAPI = async (url:string, post:object, token: any ) => {
  const res = await fetch(`/api/${url}`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': token
      },
      body: JSON.stringify(post)
  })

  const data = await res.json()
  return data
}

export const getAPI = async (url:string, token: any) => {
  const res = await fetch(`/api/${url}`, {
      method: 'GET',
      headers: {
          'Authorization': token,
          'Content-Type': 'application/json'
      }
  })

  const data = await res.json()
  return data
}
