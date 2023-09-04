

import { Formik, Form } from 'formik'
import React from 'react'
import FiledCustom from '../../FiledCustom'
import { ArrowBack } from '@mui/icons-material'
import SignUp from '../SignUp'

import uploadPicture from "../../../../public/images/UserUploadPics.svg"
import Logo from "../../../../public/images/logo.svg"
import { useDispatch } from 'react-redux'
import { addInfoPage2 } from '../../../app-redux/features/user/userSlice'
const Page2 = ({ setStepsSignUp }) => {
    const dispatch = useDispatch()
    return (
        <main className='flex flex-col max-w-lg gap-7 w-[80%] mx-auto  '>
            <div className='flex item center'>
                <ArrowBack onClick={() => props.setStepsSignUp((prev) => prev - 1)} />
                <img className='mx-auto' src={Logo} />
            </div>
            <div className='flex items-center '>
                <h1 className='text-4xl font-Georgia font-bold text-[24px] text-primary-700 max-w-max mx-auto '>
                    Upload Your Picture
                </h1>
            </div>
            <Formik

                initialValues={{
                    password: "", userImage: ''
                }}
                onSubmit={(values) => {
                    const { password, userImage } = values
                    dispatch(addInfoPage2({ password, userImage }));
                    setStepsSignUp(3)
                }}
            >
                {(props) =>
                    <Form className='flex flex-col gap-6'>
                        <FiledCustom name="password" placeholder="Your Password" labelText="Password" />
                        <FiledCustom name="passwordConfirm" placeholder="Confirm Your Password" labelText="Password Confirm" />
                        <label htmlFor='userImage' className='mx-auto'>
                            <img src={uploadPicture} />
                        </label>
                        <input
                            onChange={(e) => props.setFieldValue('userImage', e.currentTarget.files[0])}
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
