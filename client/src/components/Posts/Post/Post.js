import React, { useEffect } from 'react';
import {  Card, CardActions, CardContent, CardMedia, Button, Typography,ButtonBase } from '@mui/material';
 import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import Edit from '@mui/icons-material/Edit';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import moment from 'moment';
import { useDispatch,} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deletePost,likePost,  } from '../../../features/Posts/postsSlice';
import './styles.css'



const Post =  ({ post,setCurrentId}) => {
const navigate=useNavigate();
  const dispatch =  useDispatch();
//  console.log('post',post);



const openPost=(e)=>{
  navigate(`/posts/${post._id}`)
}

  return (
      
    <Card   className='card' elevation={6}>
      
       <div onClick={openPost}>
       <CardMedia className='media' image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title} />
    <div className='overlay'>
      <Typography variant="h6">{post.creator}</Typography>
      <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
    </div>
    <div className='overlay2'>
      <Button style={{ color: 'white' }} size="small" onClick={() => setCurrentId(post._id)}><MoreHorizIcon fontSize="default" /></Button>s
      
    </div>
    <div className='details'>
      <Typography variant="body2" color="textSecondary" component="h2">{ post && post.tags.map((tag) =>  `#${tag} `)}</Typography>
    </div>
    <Typography className='title' gutterBottom variant="h5" component="h2">{post.title}</Typography> 
    <CardContent>
      <Typography variant="body2" color="textSecondary" component="p">{post.message.split(' ').slice(0,15).join(' ')}...<span style={{cursor:'pointer'}} onClick={openPost}>ReadMore</span></Typography>
   
    </CardContent>
    
       </div>

    <CardActions className='cardActions'>
      <Button size="small" color="primary" onClick={() => dispatch(likePost(post._id))}><ThumbUpAltIcon fontSize="small" /> Like {post.likeCount} </Button>
      <Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id))}><DeleteIcon fontSize="small" /> Delete</Button>
      <Button  size="small" color="primary" onClick={() => setCurrentId(post._id)}><Edit fontSize='small'/>Edit</Button>
    </CardActions>
  </Card>
      
  
  );
};

export default Post;