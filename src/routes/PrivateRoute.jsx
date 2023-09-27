import React, { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom';

const Room = lazy(() => import('../component/chatRoom/Room'));
const Users = lazy(() => import('../component/users/Users'));

const PrivateRoute = () => {
    return (
        <Routes>

            <Route path="Room/:userRoomId/" element={
                <Suspense >
                    <Room />
                </Suspense>
            } />
            <Route path='users/' element={
                <Suspense >
                    <Users />
                </Suspense>}
            />

        </Routes>
    )
}

export default PrivateRoute
