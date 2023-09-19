import React from 'react'
import { LogoIcon } from '../IconsSvg'
const Header = ({ title }) => {
    return (
        <header className='flex flex-col items-center justify-center gap-5'>
            <LogoIcon className={"w-40 h-10"} />
            <h1 className=' font-Georgia font-bold text-[24px] text-primary-700 max-w-max mx-auto '>
                {title}
            </h1>
        </header>
    )
}

export default Header
