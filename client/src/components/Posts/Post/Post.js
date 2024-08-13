import React from 'react';
import {  Card, CardActions, CardContent, CardMedia, Button, Typography } from '@mui/material';
 import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
 import ThumbUpAltOutlined from '@mui/icons-material/ThumbUpAltOutlined';
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
  const user = JSON.parse(localStorage.getItem('user'));

  // console.log('user',user);
//  console.log('post',post);



const openPost=(e)=>{
  navigate(`/posts/${post._id}`)
}



const Likes = () => {
  if (post?.likes?.length > 0) {
    return post.likes.find((like) => like === (user?.user?.sub || user?.result?._id))
      ? (
        <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` }</>
      ) : (
        <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
      );
  }

  return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
};


  return (
      
    <Card   className='card' elevation={6}>
      
       <div  onClick={openPost}>
       <CardMedia className='media' image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title} />
      <div className='overlay'>
      <Typography variant="h6">{post.name}</Typography>
      <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
    </div>
    {/* <div className='overlay2'>
      <Button style={{ color: 'white' }} size="small" onClick={() => setCurrentId(post._id)}><MoreHorizIcon fontSize="default" /></Button>s
      
    </div> */}
    <div className='details'>
      <Typography variant="body2" color="textSecondary" component="h2">{ post && post?.tags?.map((tag) => `#${tag} `)}</Typography>
    </div>
    <Typography className='title' gutterBottom variant="h5" component="h2">{post.title}</Typography> 
    <CardContent>
      <Typography variant="body2" color="textSecondary" component="p">{post && post?.message.split(' ').slice(0,10).join(' ')}...<span style={{cursor:'pointer'}} onClick={openPost}>ReadMore</span></Typography>
    </CardContent>
    
       </div>

    <CardActions className='cardActions'>
    <Button size="small" color="primary" disabled={!user} onClick={() => dispatch(likePost(post._id))}>
          <Likes />
       </Button>
      {
        (user?.user?.sub === post?.creator || user?.result?._id === post?.creator) &&(
             <Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id))}><DeleteIcon fontSize="small" /> Delete</Button>
        )
      }
    
     {
      (user?.user?.sub === post?.creator || user?.result?._id === post?.creator) &&(
        <Button  size="small" color="primary" onClick={() => setCurrentId(post._id)}><Edit fontSize='small'/>Edit</Button>
         )
     }
      
    </CardActions>
  </Card>
      
  
  );
};

export default Post;