import React, { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
const SignIn = lazy(() => import("../component/Sign/SignIn"))
const SignUp = lazy(() => import("../component/Sign/SignUp"))

const PublicRoutes = () => {
    return (
        <Routes>
            <Route path="signin" element={
                <Suspense >
                    <SignIn />
                </Suspense>
            } />

            <Route path="signup/" element={
                <Suspense >
                    <SignUp />
                </Suspense>} />


        </Routes >
    )
}

export default PublicRoutes;
