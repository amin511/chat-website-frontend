import React from 'react'

const Layout = ({ children }) => {
    return (
        <main className=' relative flex flex-col gap-4  w-[80%] max-w-lg mx-auto mt-10'>

            {children}

        </main>
    )
}

export default Layout
