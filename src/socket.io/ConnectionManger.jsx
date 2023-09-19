import React, { useEffect } from 'react';
import { socket } from './socket';
import { useDispatch, useSelector } from 'react-redux';
import { updateUsersOnline } from '../app-redux/features/users/usersSlice';

export const connectSocket = async (userId) => {
    await socket.connect();
    await socket.emit("online", userId);
}

export const disconnect = async () => {
    await socket.disconnect();
}


export default function ConnectionManager() {
    const user = useSelector(store => store.user.user)
    const { usersOnline } = useSelector((store) => store.users);
    useEffect(() => {
        connectSocket();
        socket.on("dis", usersOnline => {
            console.log(usersOnline)
            dispatch(updateUsersOnline(usersOnline))
        });
        socket.on("usersOnline",
            (usersOnline) => {
                console.log(usersOnline)
                dispatch(updateUsersOnline(usersOnline))
            }
        )
    }, [])

    useEffect(() => {
        socket.on("usersOnline",
            (usersOnline) => {
                console.log(usersOnline)
                dispatch(updateUsersOnline(usersOnline))
            }
        )
    }, [])









    return (
        <>
            <button onClick={connect}>Connect</button>
            <button onClick={disconnect}>Disconnect</button>
            <div>
                {
                    usersOnline.map(user => <h1 key={Math.random() * 100} className='bg-red-400'>{user.userId}</h1>)
                }
            </div>
        </>
    );
}

