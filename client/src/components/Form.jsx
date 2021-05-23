import React, { useContext, useState } from 'react'
import { InfoContext } from '../context/InfoContext';

export default function Form({endpoint, submitFunc}) {

    const { state } = useContext(InfoContext);


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className='form'>
            <h1>{endpoint}</h1>

            { state.error ? (<div className='error'>{state.error}</div>): null }
            
            <form onSubmit={ event => {
                event.preventDefault();
                    submitFunc(email, password)
                }}>
                <input type="text" placeholder='Email' value={email} onChange={event => setEmail(event.target.value)}/>
                <input type="password" placeholder='Password' value={password} onChange={event => setPassword(event.target.value)}/>
                <br/>
                <button type="submit">{endpoint}</button>
            </form>
        </div>
    )
}
