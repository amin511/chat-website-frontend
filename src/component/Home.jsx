
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import Logout from './Sign/Logout';

// images 
import HomeIlustraion from "../../public/images/HomeIlustation.svg"
import Logo from "../../public/images/Logo.svg"
import Header from './Header';
// images


const Home = () => {
    const user = useSelector((store) => store.user.user);
    let token = "";
    if (user) {
        const { token: newToken } = user;
        token = newToken;
    }
    return (
        <main className="flex mt-10  flex-col gap-7 max-w-lg w-[80%] mx-auto items-center">
            <Header title={"Start chat with your freinds"} />
            <img src={HomeIlustraion} className='w-[300px] ' />
            <p className='px-6 text-lg text-neutral-400 font-[300] text-center font-AnekLatin'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut in luctus elit. Maecenas non risus sapien. Phasellus ultrices libero vel erat laoreet, nec aliquam ex scelerisque.
            </p>
            {
                token ?
                    <div className='space-y-3'>
                        <h2 className='text-xl mx-auto max-w-max  font-AnekLatin'>{`Welcome  ${user.name} !`}</h2>
                        <Link to={"/users"}><div className='bg-blue-400 max-w-max p-4 px-8 rounded-md text-2xl font-serif mx-auto mt-10'>Chat app</div></Link>
                        <Logout />
                    </div>
                    :
                    <div className='flex flex-col items-center gap-2 '>
                        <Link to={"/auth/signup"}><button className='btn-submit'>Sign Up</button>
                        </Link>
                        <Link to={"/auth/signin"}><button className='btn-submit'>Sign In</button></Link>
                    </div>
            }
        </main>
    )
}

export default Home
