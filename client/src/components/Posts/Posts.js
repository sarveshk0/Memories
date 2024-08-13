import React from 'react';
import { Grid, CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';
// import { fetchPosts } from '../../features/Posts/postsSlice';
import Post from './Post/Post';
import  './styles.css';


const Posts = ({ setCurrentId }) => {
const {posts , isLoading } = useSelector((state) => state.posts);
  //  console.log('data',posts);
  const data=posts.data || posts
  // console.log(isLoading);
  if (!data && !isLoading) return 'No data';
  

  return (
    

    
     data.length<1 ? (<CircularProgress />) : (
     <Grid className='container' container alignItems="stretch" spacing={3}>
       {data.map((post) => (
      <Grid key={post._id} item xs={12} sm={6} md={6} lg={3}>
        <Post post={post} setCurrentId={setCurrentId} />
      </Grid> 
       ))}
     </Grid>)
    
     
    

    )
  
};

export default Posts;