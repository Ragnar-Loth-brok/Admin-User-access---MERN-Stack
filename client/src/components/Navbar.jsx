import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { InfoContext } from '../context/InfoContext'
import Cookies from 'js-cookie';


export default function Navbar() {
    
    const { state, dispatch } = useContext(InfoContext);


    const userLogout = () => {
        dispatch({type: 'LOGOUT'})
        Cookies.remove('access');
        Cookies.remove('refresh');
    }

    const portal = state.user === 'user' ? '/user' : '/admin' 

    const userMenu = () => {
        if(state.login) {
            return (
                <>  
                    <NavLink onClick={userLogout} className='link' exact to='/' >Logout</NavLink>
                    <NavLink activeClassName='active' className='link' to={portal} >Profile</NavLink>
                </>
            )
        } else {
            return (
                <>
                    <NavLink activeClassName='active' className='link' to='/signin'>Sign In</NavLink>
                    <NavLink activeClassName='active' className='link' to='/register'>Register</NavLink>
                </>
            )
        }
    }
    
    return (
        <div className='navbar'>
            <h6 className='logo'><span>R</span>agnar</h6>
            <div className='menu' >
                <NavLink activeClassName='active' className='link' exact to='/' >Home</NavLink>
                {userMenu()}
            </div>
        </div>
    )
}
