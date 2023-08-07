import React from 'react'
import { useSelector } from 'react-redux'

const UserConnected = () => {
    const user = useSelector((store) => store.user.user)

    return (
        <div className='items-center text-white py-2 px-4 gap-2 max-w-max flex  bg-blue-400 rounded-2xl'>
            <img className='w-10 h-10 object-cover rounded-full' src={user.userImage} />
            <h1>{user.name}</h1>
        </div>
    )
}

export default UserConnected