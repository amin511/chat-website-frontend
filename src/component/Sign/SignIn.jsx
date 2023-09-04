import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../app-redux/features/user/userSlice';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as yup from "yup"

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

// import images
import HomeIlustraion from "../../../public/images/HomeIlustation.svg"
import Logo from "../../../public/images/Logo.svg"
import FiledCustom from '../FiledCustom';

export default function SignIn() {
    const { user, errorMsg, isLoading } = useSelector((store) => store.user)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    React.useEffect(() => {
        if (user) {
            setTimeout(() => {
                navigate('/users');
            }, 0);
        }
    });

    if (isLoading) {
        return (
            <div className='w-10 h-10 bg-blue-600 mx-auto mt-10 animate-bounce'>
            </div>
        )
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(login({}))
    };

    const signInValidationSchema = yup.object({
        email: yup.string().email("Invalid email").required('Email is required'),
        password: yup.string().required('Password is required').min(6, 'Must be 7 characters or more')
    })

    return (
        <main className="flex  flex-col gap-7 max-w-lg w-[80%] mx-auto items-center dark:gradient-500">
            <img src={Logo} />
            <h1 className='text-4xl font-Georgia font-bold text-[24px] text-primary-700 max-w-max mx-auto '>
                Start Chat With Friends
            </h1>
            <img src={HomeIlustraion} className='w-[300px] ' />

            <Formik
                initialValues={{ email: "", password: "" }}
                onSubmit={(values) => {
                    alert(JSON.stringify(values))
                }}
                validationSchema={signInValidationSchema}
            >


                {
                    (props) =>
                        <Form
                            className="flex flex-col gap-4 w-[70%] mx-auto" onSubmit={props.handleSubmit}>

                            <FiledCustom
                                name="email"
                                placeHolder="Your address email"
                                labelText="Email Address"
                            />

                            <FiledCustom
                                name="password"
                                placeholder="Your password"
                                labelText="Your password" />

                            <button type='submit' disabled={props.isSubmitting}>
                                Submit
                            </button>
                            <p>Don't Have an Account ?   <Link to={"/auth/signup"}><span className='text-Secondary-900'>Sign Up</span></Link> </p>

                        </Form>

                }
            </Formik>

        </main>
    )


}