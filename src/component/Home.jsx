
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import Logout from './Sign/Logout';

// images 
import HomeIlustraion from "../../public/images/HomeIlustation.svg"
import Logo from "../../public/images/Logo.svg"
// images


const Home = () => {
    const user = useSelector((store) => store.user.user);
    return (
        <main className="flex  flex-col gap-7 max-w-lg w-[80%] mx-auto items-center">
            <img src={Logo} />
            <h1 className='text-4xl font-Georgia font-bold text-[24px] text-primary-700 max-w-max mx-auto '>
                Start Chat With Friends
            </h1>
            <img src={HomeIlustraion} className='w-[300px] ' />
            <p className='px-6 text-lg text-neutral-400 font-[600] text-center font-AnekLatin '>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut in luctus elit. Maecenas non risus sapien. Phasellus ultrices libero vel erat laoreet, nec aliquam ex scelerisque.
            </p>
            {
                user ?
                    <div className='space-y-3'>
                        <h2 className='text-xl mx-auto max-w-max  font-AnekLatin'>{`Welcome  ${user.name} !`}</h2>
                        <Link to={"/users"}><div className='bg-blue-400 max-w-max p-4 px-8 rounded-md text-2xl font-serif mx-auto mt-10'>Chat app</div></Link>
                        < Logout />
                    </div>
                    :
                    <div className='flex flex-col items-center gap-2 '>
                        <Link to={"/auth/signup"}><button className='bg-primary-500 rounded-xl w-[150px] h-[50px] px-6  text-[18px] font-Georgia font-[200] mx-auto text-primary-100
                        border-2 border-Secondary-500 '>Sign Up</button>
                        </Link>
                        <Link to={"/auth/signin"}><button className='bg-primary-500 rounded-xl w-[150px] h-[50px] px-6  text-[18px] font-Georgia font-[200] mx-auto text-primary-100
                        border-2 border-Secondary-500 '>Sign In</button></Link>
                    </div>
            }
        </main >
    )
}

export default Home
