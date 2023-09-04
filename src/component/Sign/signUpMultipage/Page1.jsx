

import { Formik, Form } from 'formik'
import React from 'react'
import FiledCustom from '../../FiledCustom'
import { ArrowBack } from '@mui/icons-material'
import SignUp from '../SignUp'
import Logo from "../../../../public/images/Logo.svg"
import { useDispatch, useSelector } from 'react-redux';
import { addInfoPage1 } from '../../../app-redux/features/user/userSlice'
const Page1 = (props) => {
    const dispatch = useDispatch();

    return (
        <main className='flex flex-col gap-4 w-[80%] max-w-lg mx-auto'>
            <div className='flex items-center'>
                <ArrowBack onClick={() => props.setStepsSignUp((prev) => prev - 1)} />
                <img className='mx-auto' src={Logo} />
            </div>
            <div className='flex items-center '>
                <h1 className='text-4xl font-Georgia font-bold text-[24px] text-primary-700 max-w-max mx-auto '>
                    Fill Your Information
                </h1>
            </div>
            <Formik

                initialValues={{ firstName: "", lastName: "", email: "" }}
                onSubmit={(values) => {
                    const { firstName, lastName, email } = values
                    dispatch(addInfoPage1({ name: `${firstName} ${lastName}`, email }));
                    props.setStepsSignUp((prev) => prev + 1);
                }}
            >
                {(props) =>
                    <Form className='flex flex-col gap-6'>
                        <FiledCustom name="firstName" placeholder="Your FirstName" labelText="FirstName" />
                        <FiledCustom name="lastName" placeholder="Your LastName" labelText="LastName" />
                        <FiledCustom name="email" placeholder="Your Email address" labelText="Email address" />
                        <button type='submit'
                            className='btn-submit'
                        >
                            Next
                        </button>
                    </Form>
                }
            </Formik>
        </main>
    )
}

export default Page1
