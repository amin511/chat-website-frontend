import { useEffect, useState } from 'react'

import SignIn from './component/Sign/SignIn'
import SignUp from './component/Sign/SignUp'
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Room from './component/chatRoom/Room'
import Users from './component/users/Users'
import { useSelector } from 'react-redux'
import Home from './component/Home'

const ToogleDarkMode = ({ theme, setTheme }) => {

  const handleClick = () => {
    setTheme((theme) => {
      return theme === 'dark' ? setTheme("light") : "dark"
    })
  }

  return (
    <div className='flex fixed top-0 z-[9999] right-0 items-end justify-end mt-2 mr-2'>
      <div className={`w-14 h-7 flex dark:justify-end  dark:bg-primary-700 bg-slate-300 rounded-full transition duration-1000 `}
        onClick={handleClick}>
        <div className='w-7 h-7 transition  duration-1000 gradient-700  rounded-full'
        >
        </div>
      </div>
    </div>
  )
}


function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme"));

  useEffect(() => {
    const html = document.documentElement
    const body = document.body
    if (theme === "dark") {
      html.classList.add("dark");
      body.classList.add("dark")
    } else {
      html.classList.remove("dark");
      body.classList.remove("dark");

    }
  }, [theme])

  const user = useSelector((store) => store.user.user)
  return (
    <BrowserRouter>
      <ToogleDarkMode theme={theme} setTheme={setTheme} />
      <Routes>
        <Route path='/'>
          <Route index element={<Home />} />
          <Route path="auth/">
            <Route path="signin" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
          </Route>
          <Route path="Room/:userRoomId/" element={<Room />} />
          <Route path='users/' element={<Users />} />
          <Route path="*" element={<div>Route not found</div>} />
        </Route>
      </Routes>
    </BrowserRouter>

  )
}

export default App



