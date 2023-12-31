import { Suspense, lazy, useEffect, useState } from 'react'

import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

const Home = lazy(() => import("./pages/Home"))

// socket import 
import { socket } from "./socket.io/socket"
import { disconnect, connectSocket } from './socket.io/ConnectionManger'
import { updateUsersOnline } from './app-redux/features/users/usersSlice'
import toast, { Toaster } from 'react-hot-toast';

//

import ToogleDarkMode from './component/ToogleDarkMode'
// routes
import PublicRoutes from './routes/publicRoutes'
import PrivateRoute from './routes/PrivateRoute'



function App() {

  const dispatch = useDispatch();
  const user = useSelector((store) => store.user.user);
  const usersOnline = useSelector(store => store.users.usersOnline);
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



  useEffect(() => {

    if (user) {
      const { token, userId, name } = user;
      if (token) {
        setTimeout(() => {
          socket.emit("online", name);
        }, 2000)
      }
    }


    socket.on("usersOnline",
      (usersOnline) => {
        dispatch(updateUsersOnline(usersOnline));
      })

    return (() => socket.disconnect());
  }, [])


  const handleOnline = () => {
    if (user) {
      const { token, userId, name } = user
      socket.emit("online", name);
    }

  }



  return (
    <BrowserRouter>
      {/* <ToogleDarkMode theme={theme} setTheme={setTheme} /> */}
      <Toaster />
      <Routes>
        <Route path='/'>
          <Route index element={
            <Suspense>
              <Home />
            </Suspense>} />
          <Route element={<PrivateRoute />} />
          <Route path='auth/*' element={<PublicRoutes />} />
          <Route path='/*' element={<PrivateRoute />} />
          <Route path="/*" element={<div>Route not found</div>} />
        </Route>
      </Routes>

    </BrowserRouter>

  )
}

export default App



