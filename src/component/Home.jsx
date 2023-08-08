
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import Logout from './Sign/Logout';
const Home = () => {
    const user = useSelector((store) => store.user.user);
    return (
        <main>
            <h1 className='text-4xl max-w-max mx-auto mt-10'>Home </h1>
            {user ?
                <div className='space-y-3'>
                    <h2 className='text-2xl mx-auto max-w-max mt-10 font-mono'>{`Welcome  ${user.name} !`}</h2>
                    <Link to={"/users"}><div className='bg-blue-400 max-w-max p-4 px-8 rounded-md text-2xl font-serif mx-auto mt-10'>Chat app</div></Link>
                    <Logout />
                </div>
                :
                <div>
                    <Link to={"/auth/signin"}><div className='bg-blue-400 max-w-max p-4 px-8 rounded-md text-2xl font-serif mx-auto mt-10'>SignIn</div></Link>
                    <Link to={"/auth/signup"}><div className='bg-blue-400 max-w-max p-4 px-8 rounded-md text-2xl font-serif mx-auto mt-10'>SignUp</div></Link>
                </div>
            }

        </main>
    )
}

export default Home
