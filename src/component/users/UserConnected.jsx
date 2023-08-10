import React from 'react'
import { useSelector } from 'react-redux'

const UserConnected = () => {
    const user = useSelector((store) => store.user.user)

    return (
        <div className='mx-auto bg-slate-800 mt-3 p-3 rounded-lg max-w-lg  shadow-slate-600  text-white  flex items-center'>
            <img className='w-10 h-10 object-cover rounded-full' src={user.userImage} />
            <h1>{user.name}</h1>
        </div>
    )
}

export default UserConnected