import React, { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
const SignIn = lazy(() => import("../component/Sign/SignIn"))
const SignUp = lazy(() => import("../component/Sign/SignUp"))

const PublicRoutes = () => {
    return (
        <Routes>
            <Route path="auth/">

                <Route path="signin" element={
                    <Suspense fallback={<>... loading</>}>
                        <SignIn />
                    </Suspense>
                } />

                <Route path="signup" element={
                    <Suspense fallback={<>... loading</>}>
                        <SignUp />
                    </Suspense>} />

            </Route>
        </Routes>
    )
}

export default PublicRoutes;
