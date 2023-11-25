import React from 'react'
import { useDispatch } from 'react-redux'
import { logOut } from '../../app-redux/features/user/userSlice'
import { useNavigate } from 'react-router-dom'
import { LogoutRounded } from '@mui/icons-material'

const Logout = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    return (
        <div className='cursor-pointer  max-w-max p-2 '
            onClick={() => {
                dispatch(logOut())
                navigate("/")
            }}>
            <span className='font-AnekLatin'>Logout</span> <LogoutRounded />
        </div>
    )
}

export default Logout
