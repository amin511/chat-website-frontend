import React from 'react'
import { useSelector } from 'react-redux'
import { ENDPOINTS } from '../../utils/axios'

const UserConnected = () => {
    const user = useSelector((store) => store.user.user)
    // const base64String = btoa(
    //     String.fromCharCode(new Uint8Array((user.userImage.data.data)))
    // )
    // console.log(base64String)
    return (
        <div className='mx-auto bg-slate-800 mt-3 p-3 rounded-lg max-w-lg  shadow-slate-600  text-white  flex items-center'>
            <img className='w-10 h-10 object-cover rounded-full' src={`${ENDPOINTS}/${user.userImage}`} alt="userImage" />
            <h1>{user.name}</h1>
        </div>
    )
}

export default UserConnected