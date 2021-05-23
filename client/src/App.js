import React, { useContext, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Cookies from 'js-cookie'

import Navbar from './components/Navbar';
import SignIn from './components/SignIn'
import Body from './components/Body';
import Register from './components/Register';
import PostForm from './components/form/PostForm';
import Admin from './components/admin/Admin';
import { InfoContext } from './context/InfoContext';
import axios from 'axios';

function App() {
  const { state, dispatch } = useContext(InfoContext);

  const getUser = () => {
    let accessToken = Cookies.get('access');
    let refreshToken = Cookies.get('refresh')
    
    if(!accessToken || !refreshToken) dispatch({type: 'LOGOUT'})
    else checkUser(accessToken, refreshToken);

  }

  const refresh = async refreshToken => {
    const res = await axios.post('https:localhost:8000/refresh', {token: refreshToken});
    if(res.data.success) return res.data.accessToken;
    else return false;

  }

  const checkUser = async (accessToken, refreshToken) => {
    const res = await axios.post('https:localhost:8000/protected', {}, { headers : { "authorization" : `Bearer ${accessToken}` }})
    if(res.data.success) dispatch({ type: 'LOGIN', payload: { login: true, email : res.data.email, user: res.data.admin ? 'admin' : 'user' } })
    else if(res.data.error === 'Access Token expired') {
      const accessToken = await refresh(refreshToken);
      if (accessToken) return await checkUser(accessToken, refreshToken);
      else {
        Cookies.remove('access');
        Cookies.remove('refresh')
        dispatch({type: 'LOGOUT'})
      }
    }
  }

  useEffect(() => {
    getUser();
  }, [])

  useEffect(() => {
    console.log(state);
  }, [state])

  return (
    <Router>
      <div className="App">
      <Navbar />
      <Switch>
          <Route exact path='/'>
              <Body />
          </Route>
          <Route exact path='/signin'>
            {!state.login ? <SignIn /> : state.user ==='user' ? <Redirect to='/user' /> : <Redirect to='admin' /> }
          </Route>
          <Route exact path='/register'>
            {!state.login ? <Register /> : state.user ==='user' ? <Redirect to='/user' /> : <Redirect to='admin' /> }
          </Route>
          <Route exact path='/user' >
            {!state.login ? <Redirect to='/' /> : state.user ==='user' ? <PostForm /> : <Redirect to='/' /> }
          </Route>
          <Route exact path='/admin' >
              {!state.login ? <Redirect to='/' /> : state.user ==='admin' ? <Admin /> : <Redirect to='/' /> }
          </Route>
      </Switch>
      </div>
    </Router>
  );
}

export default App;
