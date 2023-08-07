import React from 'react'
import { useSelector } from 'react-redux'

const Message = ({ _id, content, senderId, createdAt }) => {
    const userId = useSelector(store => store.user.user.userId)

    const isUser = senderId === userId ? true : false
    const style = isUser ? "bg-blue-500" : "bg-slate-400"

    return (
        <div className={`w-full  flex ${isUser ? "justify-end" : "justify-start"}`}>
            <p className={`max-w-[70%] message break-words  whitespace-normal ${style} rounded-lg py-1 px-2 text-white text-lg`}>{content}</p>
        </div>

    )
}

export default Message
