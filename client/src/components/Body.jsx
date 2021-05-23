import React from 'react'
import { Link } from 'react-router-dom'


export default function Body() {
    return (
        <div className='body'>
            <div className='content'>
                <h2>With Passion To Web Developer</h2>
                <p>Web Designing is a way of feeling, of touching, of loving. This working project is to differentiate between functionality of an Admin user and a Client user</p>
                <Link to='/register' >Register</Link>
            </div>
            <div className='banner'></div>
        </div>
    )
}
