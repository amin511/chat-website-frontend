

import { Formik, Form } from 'formik'
import React, { useState } from 'react'
import FiledCustom from '../../FiledCustom'
import { ArrowBack } from '@mui/icons-material'
import SignUp from '../SignUp'

import uploadPicture from "/src/assets/images/UserUploadPics.svg"
import { useDispatch } from 'react-redux'
import { addInfoPage2 } from '../../../app-redux/features/user/userSlice'
import Header from '../../Header'
import * as yup from "yup"

const Page2 = ({ setStepsSignUp, userImage, setUserImage }) => {

    const dispatch = useDispatch()

    const signUpPage1ValidationSchema = yup.object({
        password: yup.string().required('Password is required').min(6, 'Must be 7 characters or more'),
        confirmPassword: yup.string().
            required("Please re-type your password").
            oneOf([yup.ref("password")], "Password does not match"),
    });

    return (

        <main className='mt-10 flex flex-col max-w-lg gap-7 w-[80%] mx-auto  '>
            <header className='flex'>
                <ArrowBack className='' onClick={() => setStepsSignUp((prev) => prev - 1)} />
                <div className='mx-auto'>
                    <Header title={"Fill Your information"} />
                </div>
            </header>

            <Formik
                initialValues={{
                    password: "", userImage: '', confirmPassword: ''
                }}
                onSubmit={(values) => {
                    const { password, userImage } = values
                    setUserImage(userImage);
                    dispatch(addInfoPage2({ password, userImage: URL.createObjectURL(userImage) }));
                    setStepsSignUp(3)
                }}
                validationSchema={signUpPage1ValidationSchema}

            >
                {(props) =>
                    <Form className='flex flex-col gap-6'>
                        <FiledCustom type="password" name="password" placeholder="Your Password" labelText="Password" />
                        <FiledCustom type="password" name="confirmPassword" placeholder="Confirm Your Password" labelText="Password Confirm" />
                        <label htmlFor='userImage' className='mx-auto'>
                            <img src={uploadPicture} />
                        </label>
                        <input
                            onChange={(e) => {
                                props.setFieldValue('userImage', e.currentTarget.files[0])
                            }}
                            type='file' name='userImage' id='userImage' className='hidden'
                            accept='image/*'>
                        </input>
                        <button type='submit'
                            className='btn-submit'>
                            Next
                        </button>
                    </Form>
                }
            </Formik>


        </main>
    )
}

export default Page2
