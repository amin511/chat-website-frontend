import React, { useEffect, useState } from 'react'
import User from './User'
import costumFetch from '../../utiils/axios';
import axios from 'axios';
import Logout from '../Sign/Logout';
import { useDispatch, useSelector } from 'react-redux';
import UserConnected from './UserConnected';
import { getAllUsers, selectAllUsers } from '../../app-redux/features/users/usersSlice';
const Users = React.memo(() => {
    // hooks util
    const dispatch = useDispatch();
    //

    const user = useSelector((store) => store.user.user)
    const users = useSelector((store) => selectAllUsers(store));
    const isLoading = useSelector(store => store.users.isLoading);
    console.log(users)
    useEffect(() => {
        dispatch(getAllUsers());
    }, [])
    return (
        <section className='h-[100vh] bg-white overflow-y-scroll '>
            <div className='w-[80%] mx-auto'><UserConnected /></div>
            {
                isLoading ?
                    <div className='max-w-max p-3 flex flex-col gap-1'>
                        <header className='w-[100%] gap-3  shadow-md  p-2 flex items-center'>
                            <div className='bg-slate-400 h-10 w-10 rounded-full animate-pulses animate-pulse'></div>
                            <h1 className='bg-slate-300 h-3 w-32 rounded-lg animate-pulse'></h1>
                        </header>
                        <header className='w-[100%] gap-3  shadow-md  p-2 flex items-center'>
                            <div className='bg-slate-400 h-10 w-10 rounded-full animate-pulses animate-pulse'></div>
                            <h1 className='bg-slate-300 h-3 w-32 rounded-lg animate-pulse'></h1>
                        </header>
                        <header className='w-[100%] gap-3  shadow-md  p-2 flex items-center'>
                            <div className='bg-slate-400 h-10 w-10 rounded-full animate-pulses animate-pulse'></div>
                            <h1 className='bg-slate-300 h-3 w-32 rounded-lg animate-pulse'></h1>
                        </header>
                        <header className='w-[100%] gap-3  shadow-md  p-2 flex items-center'>
                            <div className='bg-slate-400 h-10 w-10 rounded-full animate-pulses animate-pulse'></div>
                            <h1 className='bg-slate-300 h-3 w-32 rounded-lg animate-pulse'></h1>
                        </header>
                        <header className='w-[100%] gap-3  shadow-md  p-2 flex items-center'>
                            <div className='bg-slate-400 h-10 w-10 rounded-full animate-pulses animate-pulse'></div>
                            <h1 className='bg-slate-300 h-3 w-32 rounded-lg animate-pulse'></h1>
                        </header>
                    </div>
                    :
                    <div className='max-w-max p-3 flex flex-col gap-1'>
                        {
                            users.map((user) => {
                                return (<User key={user._id} {...user} />)
                            })
                        }
                    </div>
            }

            <footer className='bottom-0 absolute'>
                <Logout />
            </footer>
        </section>

    )
})

export default Users
