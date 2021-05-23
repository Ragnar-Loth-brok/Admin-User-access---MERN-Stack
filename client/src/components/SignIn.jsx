import axios from 'axios';
import React, { useContext, useEffect } from 'react'
import { InfoContext } from '../context/InfoContext';
import '../styles/signin.css';
import Content from './Content';
import Form from './Form';
import Cookies from 'js-cookie';

export default function SignIn() {

    const { state, dispatch } = useContext(InfoContext);

    const handleSubmit = async (email, password)  => {

        const res = await axios.post('https://domain/signin', { email, password });

        if (res.data.error) dispatch( { type: 'SET_ERROR', payload: res.data.error } )
        
        else if (res.data.success) {
            const { accessToken, refreshToken } = res.data.token;
            
            Cookies.set('access', accessToken);
            Cookies.set('refresh', refreshToken);

            dispatch({type: 'LOGIN', payload: { email: res.data.success.email, 
                user: res.data.success.user
            }})
        }
    }
    

    return (
        <div className="signin">
            <Content  />
            <Form endpoint='Sign In' submitFunc={handleSubmit} />
        </div>
    )
}
