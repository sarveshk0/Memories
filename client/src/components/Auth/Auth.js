import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@mui/material';
// import { useHistory } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';


 import { jwtDecode } from "jwt-decode";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import './style.css'
import Icon from './icon';
import { useSelector } from 'react-redux';
import {signup, signin} from '../../features/Posts/authslice.js'
import { useNavigate } from 'react-router-dom';
import Input from './Input';
import { setUser} from '../../features/Posts/authslice.js';





const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const Auth= () => {
  const navigate=useNavigate()
  const [formData, setFormData] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  // const history = useHistory();
 const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => setShowPassword(!showPassword);
  const posts=useSelector((state)=>state)
  console.log('state',posts);


  const switchMode = () => {
    setFormData(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
   if (isSignup) {
      dispatch(signup(formData));
    } else {
      dispatch(signin(formData));
    }
    navigate('/posts')
  };

  // const handleLoginSuccess = (response) => {
  //   const token = response.credential;
  //   dispatch(setCredentials({ token }));
  // };

  // const handleLoginFailure = (error) => {
  //   console.error('Google login failed:', error);
  // };




  const googleSuccess = async (res) => {
     try {
      const token = res.credential;
      const decoded_data = jwtDecode(token);
      console.log('decoded',decoded_data,token);
      dispatch(setUser( {...decoded_data,token}));
      navigate('/');
    } catch (error) {
      console.log( 'error',error);
    }
  };

  const googleError = () => alert('Google Sign In was unsuccessful. Try again later');

  const handleChange = (e) => 
    setFormData({ ...formData, [e.target.name]: e.target.value });

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
           clientId="564033717568-e5p23rhvcs4i6kffgsbci1d64r8hp6fn.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button 
              className='googleButton' 
              color="primary" fullWidth 
              onClick={renderProps.onClick} 
              disabled={renderProps.disabled} 
              startIcon={<Icon />} 
              variant="contained">
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleError}
            // onSuccess={handleLoginSuccess}
            // onFailure={handleLoginFailure}
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

    </Container>
    
  );
};

export default Auth;