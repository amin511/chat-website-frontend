import { Formik } from 'formik'
import React from 'react'
import { Form } from 'react-router-dom'
import FiledCustom from '../../FiledCustom'
import { Link } from 'react-router-dom'
import Logo from "../../../../public/images/Logo.svg"
import ImageUser from "../../../../public/images/User pic.svg"
import { ArrowBack } from '@mui/icons-material'
import { useSelector, useDispatch } from 'react-redux'
import { register } from '../../../app-redux/features/user/userSlice'
const Page3 = (props) => {
    const dispatch = useDispatch()
    const user = useSelector((store) => store.user.user)

    const handleSubmit = async (event) => {
        const data = new FormData();
        data.append('userImage', user.userImage);
        data.append('email', user.email);
        data.append('password', user.password);
        data.append('name', user.name);

        try {
            await dispatch(register(data));
        }
        catch (error) {
            console.log(error)
        }
    }
    return (
        <main className='flex flex-col max-w-lg w-[80%] mx-auto gap-10'>
            <div className='flex items-center'>
                <ArrowBack onClick={() => props.setStepsSignUp((prev) => prev - 1)} />
                <img className='mx-auto' src={Logo} />
            </div>
            <h1 className='text-4xl font-Georgia font-bold text-[24px] text-primary-700 max-w-max mx-auto '>Here we go !</h1>
            <img src={ImageUser} className='mx-auto' />
            <h2 className='userName font-bold text-4xl mx-auto' >User Name</h2>
            <button className='btn-submit w-[200px] rounded-full' onClick={handleSubmit}>Create Account</button>
        </main>
    )
}

export default Page3