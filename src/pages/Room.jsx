import React, { useEffect, useMemo, useRef, useState } from 'react'
import Message from '../component/chatRoom/Message'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { createMessage, getMessages } from '../app-redux/features/messages/messageSlice'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { messageCountSelector } from '../app-redux/features/user/userSlice'
import { addMessage } from '../app-redux/features/messages/messageSlice'

import { io } from 'socket.io-client';
import costumFetch from '../utils/axios'
import Users from './Users'
import { TextField, TextareaAutosize } from '@mui/material'
import { convertToBase64 } from '../utils/convertTobase64'

import Div100vh from 'react-div-100vh'
import Split from 'react-split'
import { Send } from '@mui/icons-material'

import { ENDPOINTS } from '../utils/axios'
// socket 
import { socket } from "../socket.io/socket";

import { BackIcon, SendIcon, SettingIcon } from '../IconsSvg'


const Room = () => {
    const { userRoomId } = useParams();
    const [userRoom, setUserRoom] = useState("");
    const sendMessageRef = useRef("");
    const containerMessagesRef = useRef("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userId = useSelector(store => store.user.user.userId);// user conected id

    // messages selector 
    const { messages, isLoadingMessages, isLoadingmesseageCreated } = useSelector((store) => store.message);

    // room name
    const sortedIds = [userRoomId, userId].sort();
    const roomName = `${sortedIds[0]}${sortedIds[1]}`

    // image 
    const [postImage, setPostImage] = useState({ myFile: "" })

    // room join 
    useEffect(() => {
        socket.emit('joinRoom', roomName);
        return () => {
            socket.emit('leaveRoom', roomName);
        };
    }, [userRoomId]); // Empty dependency array ensures this runs only once
    useEffect(() => {
        socket.on("messageReceived", (data) => {
            console.log(data, "message received");
            dispatch(addMessage(data));
        }
        )
        return () => socket.off("messageReceived");
    }, []);
    // add message by create it and emit it to the socket server 
    const addMess = async () => {
        const { value } = sendMessageRef.current;
        sendMessageRef.current.value = "";
        if (value) {
            try {
                const { payload } = await dispatch(createMessage({ userIdRoom: userRoomId, content: value }));
                socket.emit("addMessage", { roomName, payload: payload });
            } catch (error) {
                console.log(error);
            }
        }


    }
    // listen for new messages from the socket 



    useEffect(() => {
        const fetchUserRoom = async () => {
            const { data } = await costumFetch.get(`/users/${userRoomId}`);
            setUserRoom(data);
        }
        try {
            fetchUserRoom();
        } catch (error) {
            console.log(error)
        }
        return () => {
            setUserRoom("")
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

    return (
        <>
            <Split sizes={[25, 75]}

                expandToMin={false}
                gutterSize={10}
                gutterAlign="center"
                snapOffset={30}
                dragInterval={1}
                direction="horizontal"
                cursor="ew-resize"
                className='flex'>
                <div className='lg:block hidden '>
                    <Users />
                </div>

                <Div100vh className='grow flex flex-col relative   '>

                    {/* userRoom information */}
                    {userRoom ?
                        <header className='relative bg-white rounded-[32px] p-3 mt-[16px]  z-50 w-[100%] gap-3 flex items-center'>
                            <button onClick={() => navigate("../../users")}><BackIcon /></button>
                            <img className='w-12 h-12 rounded-full border border-2 border-primary-500 object-cover' src={`${userRoom.userImage}`} />
                            <h1 className='userName text-[20px]'>{userRoom.name}</h1>
                            <SettingIcon className={"absolute right-3 h-8 w-8"} />
                        </header>
                        :
                        <header className='w-[100%] gap-3  shadow-md  p-2 flex items-center'>
                            <div className='bg-slate-400 h-10 w-10 rounded-full animate-pulses animate-pulse'></div>
                            <h1 className='bg-slate-300 h-3 w-32 rounded-lg animate-pulse'></h1>
                        </header>
                    }


                    {/* userRoom information */}

                    {/* messages output*/}
                    {
                        isLoadingMessages ?
                            <section className='grow flex justify-center mt-10'>
                                <div className='h-10 w-10 rounded-full bg-slate-400 animate-bounce'></div>
                            </section>
                            :
                            <main ref={containerMessagesRef} className='scroll-smooth px-2  flex-grow  scroll-bt h-[100px] overflow-x-hidden overflow-y-scroll '>
                                <div className='w-[100%] gap-3  p-2 flex flex-col items-center'>
                                    {

                                        messages.map(message => {
                                            return (
                                                <Message key={message._id} {...message} />
                                            )
                                        }
                                        )
                                    }
                                </div>
                                <img src={postImage.myfile} />
                            </main>
                    }

                    {/* messages output*/}

                    {/* inputes  */}
                    <section className='relative flex items-center gap-2 p-2 w-full'>
                        {/* <TextField
                            ref={sendMessageRef}
                            multiline
                            maxRows={10}
                            className='grow max-h-max' /> */}
                        <textarea
                            rows={1}
                            wrap='soft'
                            placeholder='write message ...'
                            name="message"
                            ref={sendMessageRef}
                            className=' .textarea bg-inherit rounded-[24px] border border-1 border-primary-300 grow block resize-none py-[8px] px-[16px] outline-0 font-AnekLatin font-[300] ' >
                        </textarea>
                        <button disabled={isLoadingmesseageCreated} className='absolute right-3' onClick={addMess}>
                            <SendIcon className={""} />
                        </button>

                        {/* <input type='file' onChange={handleFileUpload} /> */}
                    </section>
                    {/* inputes  */}
                </Div100vh>
            </Split>
        </>
    )
}

export default Room









