import React,{useEffect, useState} from 'react'
import {Typography,Button} from '@mui/material'
import {Avatar} from '@mui/material'
import {Link} from 'react-router-dom'
import './style.css'
import { removeUser,setUser } from '../../features/Posts/authslice'
import { useNavigate,useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { jwtDecode } from 'jwt-decode'

const Navbar= () => {
const location=useLocation()
const navigate=useNavigate()
const dispatch=useDispatch()
 const [newuser, setnewuser] = useState(JSON.parse(localStorage.getItem('user')));

 console.log('newuser',newuser);


  const logout = () => {
    dispatch(removeUser);
    navigate('/auth');
    setnewuser(localStorage.removeItem('user'))
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setnewuser(storedUser);
  }, [location]); 



  useEffect(() => {
    const token = newuser?.user?.token || newuser?.token;
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        logout();
      }
    }
  }, [newuser]); 

  // useEffect(()=>{
  //   const token = newuser?.user?.token || newuser?.token;
  //   if (token) {
  //   const decodedToken = jwtDecode(token);
  //  if (decodedToken.exp * 1000 < new Date().getTime()) logout();
  //   }
  //  setnewuser(JSON.parse(localStorage.getItem('user')))
  // },[location,newuser])

  return (
    <div className='appBar'  position="static" color="inherit">
      <div className='brandContainer'>
        <Typography component={Link} to="/" className='heading' variant="h3" align="center">Memories</Typography>
        
      
      
      
      </div>

      
      <div className='toolbar'>
        { newuser? (
          <div className='profile'>
            <Avatar style={{backgroundColor:['#673ab7']}} alt={newuser?.user?.name || newuser?.result?.name} src={newuser?.user?.picture }> {newuser?.result?.name?.charAt(0)}</Avatar>
            <Typography className='userName' variant="h6">{newuser?.user?.name || newuser?.result?.name}</Typography>
            <Button variant="contained" className='logout' color="secondary" onClick={logout}>Logout</Button>
          </div>
        ) : (
          <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
        )}
      
        
         </div>
     
      
     
    </div>
  )
}

export default Navbar