
import React, { useState,useEffect } from 'react'
import { TextField,Button,Typography,Paper } from '@mui/material'
import FileBase from 'react-file-base64';
import "./styles.css";
import { useDispatch, useSelector } from 'react-redux';
import {createPost, updatePost} from '../../features/Posts/postsSlice';



const Form = ({currentId,setCurrentId}) => {
 const [postData,setPostData]=useState({ creator:' ', title:' ', message:' ', tags:[], selectedFile:' ' })

 const post = useSelector((state) => (currentId ? state.posts.posts.find((post) => post._id === currentId) : null));
 const dispatch=useDispatch();

 useEffect(() => {
  if (post) setPostData(post);
}, [post]);


const clear = () => {
  setCurrentId(null);
  setPostData({ creator: '', title: '', message: '', tags:[], selectedFile: '' });
};

 const handleSubmit= async (e)=>{
  e.preventDefault();
  if(currentId){
   dispatch(updatePost({id:currentId,post:postData}));
   } else{
   dispatch(createPost(postData));
    }
    clear()
  };

 
  


  

  return (
    <Paper className='paper' elevation={6}>
     <form autoComplete='off' noValidate className='form' onSubmit={handleSubmit}>
     <Typography variant='h6'>{currentId ? `Editing:- "${post.title}"` : 'Creating a Memory'}</Typography>
    <TextField  name=' creator' varient='outlined' label=' Creator' fullWidth value={postData. creator} onChange={(e)=>setPostData({...postData,   creator:e.target.value})} />
    <TextField name='title' varient='outlined' label='Title' fullWidth value={postData.title} onChange={(e)=>setPostData({...postData,  title:e.target.value})} />
    <TextField name='message' varient='outlined' label='Message' fullWidth value={postData.message} onChange={(e)=>setPostData({...postData,  message:e.target.value})} />
    <TextField name='tags' varient='outlined' label='Tags (coma separted)' fullWidth value={postData.tags} onChange={(e)=>setPostData({...postData,  tags:e.target.value.split(',')})} />
       <div className='fileInput'>
        <FileBase
           type='file'
           multiple={false}
           onDone={({base64})=>setPostData({...postData, selectedFile:base64})}
        />
        <div className="buttonSubmit">
        <Button   variant='contained' color='primary' size='large' type='submit' onClick={handleSubmit} fullWidth> Submit</Button>
        </div>
        
        <Button  variant='contained' color='secondary' size='small' onClick={clear} fullWidth> Clear</Button>


      
       </div>
     </form>

    </Paper>
  )
}

export default Form
