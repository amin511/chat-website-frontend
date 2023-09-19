import React from 'react'
import Logo from "../../public/images/logo.svg"
const Header = ({ title }) => {
    return (
        <header className='flex flex-col items-center justify-center gap-5'>
            <img className='w-40 h-10 ' src={Logo} />
            <h1 className='text-[30px] font-Georgia font-bold text-[24px] text-primary-700 max-w-max mx-auto '>
                {title}
            </h1>
        </header>
    )
}

export default Header
