import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@mui/material';
// import { useHistory } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { googleLogout } from '@react-oauth/google';
import { useGoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import './style.css'
import Icon from './icon';
import { useSelector } from 'react-redux';
// import { signin, signup } from '../../actions/auth';
// import { AUTH } from '../../constants/actionTypes';

import Input from './Input';
import { setCredentials ,logout} from '../../features/Posts/postsSlice';
const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const Auth= () => {
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  // const history = useHistory();
 const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => setShowPassword(!showPassword);
  const posts=useSelector((state)=>state)
  console.log('state',posts);
  const switchMode = () => {
    setForm(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const handleSubmit = (e) => {
    // e.preventDefault();

    // if (isSignup) {
    //   dispatch(signup(form, history));
    // } else {
    //   dispatch(signin(form, history));
    // }
  };

  const handleLoginSuccess = (response) => {
    const token = response.credential;
    dispatch(setCredentials({ token }));
  };

  const handleLoginFailure = (error) => {
    console.error('Google login failed:', error);
  };


  const handleLogout = () => {
    googleLogout();
    dispatch(logout());
  
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    // try {
    //   dispatch({ type: AUTH, data: { result, token } });

    //   history.push('/');
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const googleError = () => alert('Google Sign In was unsuccessful. Try again later');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <Container component="main" maxWidth="xs">
      <Paper className='paper' elevation={3}>
        <Avatar className='avatar'>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">{ isSignup ? 'Sign up' : 'Sign in' }</Typography>
        <form className='form' onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            { isSignup && (
            <>
              <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
              <Input name="lastName" label="Last Name" handleChange={handleChange} half />
            </>
            )}
            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
            { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className='submit'>
            { isSignup ? 'Sign Up' : 'Sign In' }
          </Button>
          <GoogleLogin
            // clientId="564033717568-e5p23rhvcs4i6kffgsbci1d64r8hp6fn.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                Google Sign In
              </Button>
            )}
            onSuccess={handleLoginSuccess}
            onFailure={handleLoginFailure}
            cookiePolicy="single_host_origin"
            useOneTap
           
          />
        
             

          
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
      <button onClick={handleLogout}>logut</button>
    </Container>
    
  );
};

export default Auth;