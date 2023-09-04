import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { ENDPOINTS } from '../../utils/axios'

const User = ({ name, _id, userImage }) => {

    return (
        <Link to={`/room/${_id}`}>
            <div className='flex items-center hover:bg-slate-200 transition duration-200 rounded-lg w-[100%] gap-3  shadow-md  p-2  '>
                <img className=' h-10 w-10 rounded-full animate-pulses ' src={`${ENDPOINTS}/${userImage}`} />
                {/* <img className='w-10 h-10 rounded-full object-cover' src={userImage || ""} /> */}
                <h1 className='text-black '>{name}</h1>
            </div>
        </Link>
    )
}

export default User
