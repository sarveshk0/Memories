import React from 'react'
import {Typography,Button} from '@mui/material'
import {Avatar} from '@mui/material'
import {Link} from 'react-router-dom'
import './style.css'
const Navbar= () => {
  const user=null;

  const logout=()=>{

  }
  return (
    <div className='appBar'position="static" color="inherit">
      <div className='brandContainer'>
        <Typography component={Link} to="/" className='heading' variant="h3" align="center">Memories</Typography>
        <img className="image" src='/images/memories.jpg'  width={50}  alt='memories' />
      </div>

      
      <div className='toolbar'>
        {user?.result ? (
          <div className='profile'>
            <Avatar className='purple' alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
            <Typography className='userName' variant="h6">{user?.result.name}</Typography>
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