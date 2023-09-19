

import { Formik, Form } from 'formik'
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
    const navigate = useNavigate()
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

                initialValues={{ firstName: "", lastName: "", email: "" }}
                onSubmit={(values) => {
                    const { firstName, lastName, email } = values
                    props.setStepsSignUp((prev) => prev + 1);
                    dispatch(addInfoPage1({ name: `${firstName} ${lastName}`, email }));
                }}
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
        </main>
    )
}

export default Page1
