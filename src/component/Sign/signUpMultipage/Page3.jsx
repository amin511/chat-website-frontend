import { Formik } from 'formik'
import React from 'react'
import { Form } from 'react-router-dom'
import FiledCustom from '../../FiledCustom'
import { Link } from 'react-router-dom'
import userImage from "/src/assets/images/UserPic.svg"
import { ArrowBack } from '@mui/icons-material'
import { useSelector, useDispatch } from 'react-redux'
import { register } from '../../../app-redux/features/user/userSlice'
import Header from '../../Header'
const Page3 = (props) => {
    const dispatch = useDispatch()
    const { userInformation } = useSelector((store) => store.user)
    console.log(props.userImage, "userImage")
    const handleSubmit = async (event) => {

        const data = new FormData();
        data.append('userImage', props.userImage);
        data.append('email', userInformation.email);
        data.append('password', userInformation.password);
        data.append('name', `${userInformation.firstName} ${userInformation.lastName}`);

        try {
            await dispatch(register(data));
        }
        catch (error) {
            console.error(error, "console.error();")
        }
    }
    return (
        <main className='mt-10 flex flex-col max-w-lg w-[80%] mx-auto gap-10'>
            <header className='flex'>
                <ArrowBack className='' onClick={() => props.setStepsSignUp((prev) => prev - 1)} />
                <div className='mx-auto'>
                    <Header title={"create Account"} />
                </div>
            </header>
            <img className=" mx-auto w-40 h-40 object-cover rounded-full border-Secondary-700 border border-4 " src={userInformation.userImage ? userInformation.userImage : userImage} />
            <h2 className='userInformationName font-bold text-4xl mx-auto' >{userInformation.name}</h2>
            <button className='btn-submit w-[200px] rounded-full' onClick={handleSubmit}>Create Account</button>
        </main>
    )
}

export default Page3