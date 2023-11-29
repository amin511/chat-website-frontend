import React, { useEffect, useState } from 'react'
import User from '../component/users/User'
import costumFetch from '../utils/axios';
import axios from 'axios';
import Logout from '../component/Sign/Logout';
import { useDispatch, useSelector } from 'react-redux';
import UserConnected from '../component/users/UserConnected';
import { getAllUsers, selectAllUsers } from '../app-redux/features/users/usersSlice';
import Tab from '../component/users/Tab';
const Users = React.memo(() => {

    // hooks util
    const dispatch = useDispatch();
    //

    const user = useSelector((store) => store.user.user)
    const users = useSelector((store) => selectAllUsers(store));
    const usersSearch = useSelector((store) => store.users.usersSearch);
    const isLoading = useSelector(store => store.users.isLoading);
    useEffect(() => {
        dispatch(getAllUsers());
    }, [])

    return (

        <div className='h-[100vh] overflow-scroll'>
            <Tab />
            <section  >

                {
                    isLoading ?
                        <header className='p-3  flex flex-col gap-1 w-full max-w-[800px] mx-auto  '>
                            <div className='flex gap-3 items-center'>
                                <div className='w-12 h-12 rounded-full object-cover bg-slate-300  border border-2 border-primary-500 animate-pulses animate-pulse'></div>
                                <div className='space-y-1'>
                                    <h1 className='bg-slate-300 h-3 w-32 rounded-lg animate-pulse'></h1>
                                    <h1 className='bg-slate-300 h-2 w-20 rounded-lg animate-pulse'></h1>
                                </div>
                            </div>
                            <div className='flex gap-3 items-center'>
                                <div className='w-12 h-12 rounded-full object-cover bg-slate-300  border border-2 border-primary-500 animate-pulses animate-pulse'></div>
                                <div className='space-y-1'>
                                    <h1 className='bg-slate-300 h-3 w-32 rounded-lg animate-pulse'></h1>
                                    <h1 className='bg-slate-300 h-2 w-20 rounded-lg animate-pulse'></h1>
                                </div>
                            </div>  <div className='flex gap-3 items-center'>
                                <div className='w-12 h-12 rounded-full object-cover bg-slate-300  border border-2 border-primary-500 animate-pulses animate-pulse'></div>
                                <div className='space-y-1'>
                                    <h1 className='bg-slate-300 h-3 w-32 rounded-lg animate-pulse'></h1>
                                    <h1 className='bg-slate-300 h-2 w-20 rounded-lg animate-pulse'></h1>
                                </div>
                            </div>  <div className='flex gap-3 items-center'>
                                <div className='w-12 h-12 rounded-full object-cover bg-slate-300  border border-2 border-primary-500 animate-pulses animate-pulse'></div>
                                <div className='space-y-1'>
                                    <h1 className='bg-slate-300 h-3 w-32 rounded-lg animate-pulse'></h1>
                                    <h1 className='bg-slate-300 h-2 w-20 rounded-lg animate-pulse'></h1>
                                </div>
                            </div>
                        </header>
                        :
                        <div className='p-3 flex flex-col gap-1 w-full max-w-[800px] mx-auto  '>
                            {
                                usersSearch.map((user) => {
                                    return (<User key={user._id} {...user} />)
                                })
                            }
                            <Logout />
                        </div>
                }
                <footer>

                </footer>
            </section>
        </div>
    )
})

export default Users
