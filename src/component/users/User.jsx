import React from 'react'
import { Link } from 'react-router-dom'

const User = ({ name, _id, userImage }) => {

    return (
        <Link to={`/room/${_id}`}>
            <div className='flex hover:bg-slate-200 transition duration-200 rounded-lg p-2 px-3 items-center gap-2'>
                <img className='w-10 h-10 rounded-full object-cover' src={userImage || ""} />
                <h1 className='text-black '>{name}</h1>
            </div>
        </Link>
    )
}

export default User
