

import { Formik, Form } from 'formik'
import * as yup from "yup";
import React from 'react'
import FiledCustom from '../../FiledCustom'
import { ArrowBack } from '@mui/icons-material'
import SignUp from '../SignUp'
import { useDispatch, useSelector } from 'react-redux';
import { addInfoPage1 } from '../../../app-redux/features/user/userSlice'
import Header from '../../Header'
import { useNavigate } from 'react-router-dom'
const Page1 = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { firstName, lastName, email } = useSelector((store) => store.user.userInformation);
    return (
        <main className=' relative flex flex-col gap-4 w-[80%] max-w-lg mx-auto mt-10'>
            <header className='flex '>
                <ArrowBack className='' onClick={() => navigate("../../")} />
                <div className='mx-auto' >
                    <Header title={"Fill Your information"} />
                </div>
            </header>

            {/* <div className='flex items-center '>
                <h1 className='text-4xl font-Georgia font-bold text-[24px] text-primary-700 max-w-max mx-auto '>
                    Fill Your Information
                </h1>
            </div> */}
            <Formik

                initialValues={{ firstName: firstName, lastName: lastName, email: email }}
                onSubmit={(values) => {

                    dispatch(addInfoPage1(values));
                    props.setStepsSignUp(2);

                }}
                validationSchema={yup.object({
                    firstName: yup.string().required("firstName is required"),
                    lastName: yup.string().required("lastName is required"),
                    email: yup.string().email("invalid email").required("email is required")
                })}
            >
                {(props) =>
                    <Form className='flex flex-col gap-6'>
                        <FiledCustom type="text" name="firstName" placeholder="Your FirstName" labelText="FirstName" />
                        <FiledCustom type="text" name="lastName" placeholder="Your LastName" labelText="LastName" />
                        <FiledCustom type="email" name="email" placeholder="Your Email address" labelText="Email address" />
                        <button type='submit'
                            className='btn-submit'
                        >
                            Next
                        </button>
                    </Form>
                }
            </Formik>
        </main >
    )
}

export default Page1
