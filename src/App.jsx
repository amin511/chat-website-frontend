import { useState } from 'react'

import SignIn from './component/Sign/SignIn'
import SignUp from './component/Sign/SignUp'
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Room from './component/chatRoom/Room'
import Users from './component/users/Users'
import { useSelector } from 'react-redux'
import Home from './component/Home'




function App() {
  const user = useSelector((store) => store.user.user)
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}>
        </Route>
        <Route path="/auth"  >
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
        </Route>
        {
          user && <Route>
            <Route path="/Room/:userRoomId" element={<Room />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path='/users' element={<Users />} />
            <Route path="*" element={<div>Route not found</div>} />
          </Route>
        }
      </Routes>
    </BrowserRouter>

  )
}

export default App



