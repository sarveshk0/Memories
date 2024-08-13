import React, { useEffect } from 'react'
import {Pagination,PaginationItem} from '@mui/material'
import {Link}  from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPosts } from '../../features/Posts/postsSlice.js'

const Paginate = ({page}) => {
const {posts,numberOfPages}=useSelector((state)=>state.posts)
const dispatch=useDispatch();



useEffect(() => {
  if(page){
    dispatch(fetchPosts(page))
     .then((originalPromiseResult) => {
      // handle result here
      console.log('Fetched posts:', originalPromiseResult);
    })
    .catch((error) => {
      // handle the error here
      console.error('Failed to fetch posts:', error);
    })
  }
;
}, [ dispatch,page]);


  return (
    <div style={{display:'flex', alignItems:'center' ,justifyContent:'center'}}>
   <Pagination
   
  page={Number(page)||1}
  count={numberOfPages}
  color='primary'
  variant='outlined'

  renderItem={(item) => (
    <PaginationItem
           {...item}  component={Link} to={`/posts/?page=${item.page}`}
    />
  )}
/>
    </div>

  )
}

export default Paginate;