import React from 'react'
import { useSelector } from 'react-redux'
import { UserIcon } from '../../IconsSvg'

const Message = ({ _id, content, senderId, createdAt }) => {
    const userId = useSelector(store => store.user.user.userId)

    const isUser = senderId === userId ? true : false
    const style = !isUser ? "bg-Tertiary-100 text-black" : "bg-Tertiary-500"

    return (
        <div className={`w-full gap-2 items-center flex ${isUser ? "justify-end" : "justify-start"}`}>
            <p className={` font-AnekLatin font-[400] max-w-[70%] ${!isUser ? "text-neutral-800 rounded-tl-none" : "text-white rounded-tr-none"}  message break-words  whitespace-normal ${style} rounded-2xl  py-[6px] px-[12px] text-lg`}>{content}</p>
        </div>
    )
}

export default Message
