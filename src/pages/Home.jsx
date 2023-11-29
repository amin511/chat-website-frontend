
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import Logout from '../component/Sign/Logout';

// images 
import HomeIlustraion from "/src/assets/images/HomeIlustation.svg"
import Header from '../component/Header';
import Div100vh from 'react-div-100vh';
import { LazyLoadComponent, LazyLoadImage } from 'react-lazy-load-image-component';
// images


const Home = () => {
    const user = useSelector((store) => store.user.user);
    let token = "";
    if (user) {
        const { token: newToken } = user;
        token = newToken;
    }
    return (
        <main className="flex mt-5 flex-col gap-4 max-w-lg w-[80%] mx-auto items-center">
            <Header title={"Start chat with your freinds"} />
            <LazyLoadImage

                width={"280px"} height={"300px"} src={HomeIlustraion}
            />
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
                    <div className='flex gap-2 flex-col items-center  '>
                        <Link to={"/auth/signup"}><button className='btn-submit'>Sign Up</button>
                        </Link>
                        <Link to={"/auth/signin"}><button className='btn-submit'>Sign In</button></Link>
                    </div>
            }
        </main>
    )
}

export default Home
