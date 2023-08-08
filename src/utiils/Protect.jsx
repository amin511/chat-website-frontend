import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'



const Protect = ({ children }) => {
    const user = useSelector((store) => store.user.user)

    if (!user) {
        return (<>
            <Link to={"/auth/signin"}><h1 className='bg-blue-500 p-3 w-[50%] mx-auto'>got to signin</h1></Link>
            <Link to={"/auth/signup"}>   <h1 className='bg-blue-500 p-3 w-[50%] mx-auto'>got to signUp</h1></Link>
        </>)
    }
    console.log(children)
    return (
        { children }
    )
}

export default Protect
