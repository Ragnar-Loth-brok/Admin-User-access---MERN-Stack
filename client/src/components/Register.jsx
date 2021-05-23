import axios from 'axios';
import React, { useContext } from 'react'
import { InfoContext } from '../context/InfoContext';
import '../styles/signin.css';
import Content from './Content';
import Form from './Form';


export default function Register() {

    const {state, dispatch} = useContext(InfoContext);

    const handleSubmit = async (email, password) => {
        
        const res = await axios.post('https://domain/register', { email, password });
            
        if(await res.data.error) dispatch({ type: 'SET_ERROR', payload : res.data.error })            
        
        else if (res.data.success) dispatch({ type: 'LOGIN' ,
            payload :{
                email: res.data.success.email,
                user: res.data.success.user
        }
    })

    }
    
    return (
        <div className="signin">
            <Content />
            <Form endpoint='Register' submitFunc={handleSubmit} />
        </div>
    )
}
