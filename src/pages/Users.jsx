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
                        <header className='w-[100%] gap-3  shadow-md  p-2 flex items-center'>
                            <div className='bg-slate-400 h-10 w-10 rounded-full animate-pulses animate-pulse'></div>
                            <h1 className='bg-slate-300 h-3 w-32 rounded-lg animate-pulse'></h1>
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
