import React from 'react'
import  { useEffect } from 'react';
import { Paper, Typography, CircularProgress, Divider } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, useNavigate} from 'react-router-dom';
import { fetchonePost, } from '../../features/Posts/postsSlice';
import './styles.css'


const PostDetails = () => {
const { posts, isLoading } = useSelector((state) => state);
console.log('state',posts);
  const post=posts.post;
  


    const dispatch = useDispatch();
    // const navigate=useNavigate()

    const { id } = useParams();
  

    useEffect(() => {
        dispatch(fetchonePost(id));
      }, [dispatch,id]);

        
      
   
      if (!post) return null;
    
    // const openPost = (_id) => navigate(`/posts/${_id}`);
    
      if (isLoading) {
        return (
          <Paper elevation={6} className='loadingPaper'>
            <CircularProgress size="7em" />
          </Paper>
        );
      }
    


  return (
    <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
    <div className='card' >
      <div className='section'>
        <Typography variant="h3" component="h2">{post.title}</Typography>
        <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post && post.tags.map((tag) => `#${tag} `)}</Typography>
        <Typography gutterBottom variant="body1" component="p">{post.message}</Typography>
        <Typography variant="h6">Created by: {post.name}</Typography>
        <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
        <Divider style={{ margin: '20px 0' }} />
        <Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography>
        <Divider style={{ margin: '20px 0' }} />
        <Typography variant="body1"><strong>Comments - coming soon!</strong></Typography>
        <Divider style={{ margin: '20px 0' }} />
      </div>
      <div className='imageSection' elevation={6}>
        <img style={{borderRadius:'20px'}} width={600}  src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
      </div>
    </div>
    


    
  
  </Paper>
  )
}

export default PostDetails