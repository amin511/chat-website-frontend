import React, { useEffect, useMemo, useRef, useState } from 'react'
import userImage from "../../../public/vite.svg"
import Message from './Message'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { createMessage, getMessages } from '../../app-redux/features/messages/messageSlice'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { messageCountSelector } from '../../app-redux/features/user/userSlice'
import { addMessage } from '../../app-redux/features/messages/messageSlice'

import { io } from 'socket.io-client';
import costumFetch from '../../utiils/axios'
import Users from '../users/Users'
import { TextField, TextareaAutosize } from '@mui/material'
import { convertToBase64 } from '../../utiils/convertTobase64'

const ENDPOINT = 'https://chat-website-xxiq.onrender.com';
// const ENDPOINT = "http://localhost:3001";
const Room = () => {
    const { userRoomId } = useParams();
    const [userRoom, setUserRoom] = useState({});
    const sendMessageRef = useRef("");
    const containerMessagesRef = useRef("");

    const dispatch = useDispatch();

    const userId = useSelector(store => store.user.user.userId);    // user conected id

    // const messages = useSelector(store => store.message.messages)
    const messages = useSelector((store) => store.message.messages);

    // room name
    const sortedIds = [userRoomId, userId].sort();
    const roomName = `${sortedIds[0]}${sortedIds[1]}`

    // image 
    const [postImage, setPostImage] = useState({ myFile: "" })
    // socket 
    const [socket, setSocket] = useState(null); // State to store the socket instance


    // connected to socket
    useEffect(() => {
        // Create the socket connection only once when the component mounts
        const newSocket = io.connect(ENDPOINT, {
            // Add any necessary options here
        });

        // Store the socket instance in state
        setSocket(newSocket);

        // Clean up the socket connection when the component unmounts
        return () => {
            newSocket.disconnect();
        };
    }, []);


    // join room socket 
    useEffect(() => {
        if (socket) {
            socket.emit('joinRoom', roomName);
            return () => {
                socket.emit('leaveRoom', roomName);
            };
        }
    }, [socket, userRoomId]); // Empty dependency array ensures this runs only once


    useEffect(() => {
        const fetchUsers = async () => {
            const { data } = await costumFetch.get(`/users/${userRoomId}`);
            setUserRoom(data);
        }
        try {
            fetchUsers();

        } catch (error) {
            console.log(error)
        }


    }, [userRoomId])

    // get all messages
    useEffect(() => {
        dispatch(getMessages({ userIdRoom: userRoomId }));
        console.count("get messages");
    }, [userRoomId])


    // scrooling 
    useEffect(() => {
        const container = containerMessagesRef.current;
        container.scrollTop = container.scrollHeight;
    }, [messages]);
    const addMess = async () => {
        const { value } = sendMessageRef.current;
        sendMessageRef.current.value = "";

        try {
            const actionResult = await dispatch(createMessage({ userIdRoom: userRoomId, content: value }));
            console.log(actionResult)
            if (createMessage.rejected.match(actionResult)) {
                const error = actionResult.error; // Get the rejected action's payload
                console.log("Error during message creation:", error);
                // Handle the error, such as showing an error message to the user
            } else {

                // Message created successfully
                if (socket) {
                    socket.emit("message", { roomName, payload: actionResult.payload });
                }
            }
        } catch (error) {
            console.log("Error:", error);
            // Handle other errors that may occur during dispatching the action
        }
    };




    useEffect(() => {
        if (socket) {
            socket.on("messageRecived", (data) => {
                console.log(data)
                dispatch(addMessage(data));
            }
            )
        }
    }, [socket])

    const handleFileUpload = async (e) => {
        const File = e.target.files[0];
        console.log(File)
        try {
            // const fileBase64 = await convertToBase64(File);

            // setPostImage({ myfile: fileBase64 })
        }
        catch (error) {
            console.log(error)
        }

    }
    console.log(userRoom)
    return (
        <>
            <main className='flex gap-2 '>
                <div className='hidden lg:block'>
                    <Users />
                </div>
                <section className=' grow flex flex-col relative h-[100vh]  bg-slate-100'>

                    {/* userRoom information */}
                    <header className='w-[100%] gap-3  shadow-md  p-2 flex items-center'>
                        <img className='w-10 h-10 rounded-full object-cover' src={userRoom.userImage || ""} />
                        <h1 className='font-semibold'>{userRoom.name}</h1>
                    </header>
                    {/* userRoom information */}

                    {/* messages output*/}
                    <main ref={containerMessagesRef} className='scroll-smooth px-2  flex-grow  scroll-bt h-[100px] overflow-x-hidden overflow-y-scroll '>
                        <div className='mt-10 space-y-2'>
                            {messages.map(message => <Message key={message._id} {...message} />)}
                        </div>
                        <img src={postImage.myfile} />
                    </main>
                    {/* messages output*/}

                    {/* inputes  */}
                    <section className='bg-white flex items-center justify-around p-2 w-full'>
                        {/* <TextField
                            ref={sendMessageRef}
                            multiline
                            maxRows={10}
                            className='grow max-h-max' /> */}
                        <textarea
                            rows="1"
                            wrap='soft'
                            placeholder='Aa'
                            name="message"
                            ref={sendMessageRef}
                            className='.textarea block resize-none bg-slate-200 w-[80%] p-2 rounded-xl  outline-0' />
                        <button className='bg-blue-500 max-h-max text-white rounded-sm h-fit p-1'
                            onClick={addMess}>send</button>
                        {/* <input type='file' onChange={handleFileUpload} /> */}
                    </section>

                    {/* inputes  */}

                </section>
            </main>
        </>
    )
}

export default Room









