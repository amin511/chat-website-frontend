import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { ENDPOINTS } from '../../utils/axios'
import userIcon from "../../../public/images/User pic.svg"
import { BookOnlineOutlined, OfflineBolt, OnlinePrediction, OnlinePredictionTwoTone } from '@mui/icons-material'
const User = ({ name, _id, userImage }) => {
    const [isOnline, setIsOnline] = useState(false);
    const usersOnline = useSelector((store) => store.users.usersOnline);
    useEffect(() => {
        for (let i = 0; i < usersOnline.length; i++) {
            if (name === usersOnline[i].userId) {
                setIsOnline(true);
                return;
            }
        }
        setIsOnline(false);
    }, [usersOnline]);

    return (
        <Link to={`/room/${_id}`}>
            <div className='flex items-center hover:bg-slate-200 transition duration-200 rounded-lg w-[100%] gap-3   p-2  '>
                <div className={`${isOnline ? "bg-green-600 " : "bg-red-600"} w-4 h-4 rounded-full`}></div>
                <img className='w-12 h-12 rounded-full object-cover border border-2 border-gray-500' src={`${ENDPOINTS}/${userImage}` || userIcon} />
                <div>
                    <h1 className=' text-neutral-900 font-[600] font-Georgia'>{name}</h1>
                    <p className='font-AnekLatin font-300'>last message</p>
                </div>
            </div>
        </Link>
    )
}

export default User
