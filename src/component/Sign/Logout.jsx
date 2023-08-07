import React from 'react'
import { useDispatch } from 'react-redux'
import { logOut } from '../../app-redux/features/user/userSlice'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    return (
        <div className='cursor-pointer bg-red-700 max-w-max p-4 mx-auto rounded-md'
            onClick={() => {
                dispatch(logOut())
                navigate("/")
            }}>
            logout
        </div>
    )
}

export default Logout
