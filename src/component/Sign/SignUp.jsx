import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useState } from 'react';
import { Cases, Password } from '@mui/icons-material';

import { redirect, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { register } from '../../app-redux/features/user/userSlice';
import { Input } from '@mui/material';
import { convertToBase64 } from '../../utils/convertTobase64';

import toast, { Toaster } from 'react-hot-toast';

import Page1 from './signUpMultipage/Page1';
import Page2 from './signUpMultipage/Page2';
import Page3 from './signUpMultipage/Page3';
import Header from '../Header';


// TODO remove, this demo shouldn't need to reset the theme.


export default function SignUp() {
    const [stepsSingUp, setStepsSignUp] = useState(0);
    const [userImage, setUserImage] = useState("");
    const { user, errorMsg, isLoading } = useSelector((store) => store.user)

    const navigate = useNavigate();
    const dispatch = useDispatch();
    React.useEffect(() => {
        if (user) {
            const { token } = user
            if (token) {
                setTimeout(() => {
                    navigate('/users');
                }, 0);
            }
        }
    });
    if (isLoading) {
        return (
            <div className='w-[80%] mx-auto mt-20 ' >
                <Header />

                <div className='mx-auto w-20 h-20 mt-10 bg-primary-500 rounded-full animate-bounce'></div>
                <h1 className='mt-10 animate-pulse font-Georgia font-bold text-[24px] text-primary-700 max-w-max mx-auto '>
                    Loading...
                </h1>

            </div>)
    }

    switch (stepsSingUp) {
        case 2:
            return (<Page2 userImage={userImage} setUserImage={setUserImage} setStepsSignUp={setStepsSignUp} />)

        case 3:
            return (<Page3 userImage={userImage} setStepsSignUp={setStepsSignUp} />)
        default:
            return (
                <>
                    <Page1 setStepsSignUp={setStepsSignUp} />
                </>
            )

    }

}