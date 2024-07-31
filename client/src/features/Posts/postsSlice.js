import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import * as api from '../../api/index.js'
import { jwtDecode } from "jwt-decode";

export const fetchPosts=createAsyncThunk('fetchAllPost',async(page)=>{
   const response=await api.fetchAllPosts(page);
    console.log('fetchpost',response.data);
   return response.data;
})

export const fetchonePost=createAsyncThunk('posts/fetchonePost',async(id)=>{
  const response=await api.getPost(id);
   console.log('fetchpost',response.data);
  return response.data;
})



export const createPost = createAsyncThunk('posts/createPost', async (post,thunkAPI) => {
    const response = await api.createPost(post);
    console.log('createpost',response.data);
    return response.data;
  });

export const deletePost=createAsyncThunk('posts/deletePost',async(_id)=>{
    await api.deletePost(_id);
    return _id;
});

export const updatePost=createAsyncThunk('/posts/updatePosts',async({id,post})=>{
   
  const response=await api.updateCurrPost(`${id}`,post)
     console.log('updatepost',response.data);
    return response.data;
})

export const likePost=createAsyncThunk('/posts/likePost',async(id)=>{
    const response=await api.likePost(id)
   console.log('likepost',response);
    return response.data;
})

export const getPostsbysearch=createAsyncThunk('/search', async( search,page)=>{
  
const response=await api.fetchPostBySearch(search,page)
   console.log( 'getpostbysearch',response.data);
   return response.data;
})



const initialState = {
    posts: [ ],
    post:'',
    status: "idle", // "pending" or "failed" during fetching
    error: null,
    isLoading:false,
    user:null,
    token:null,
    currentPage:1,
    numberOfPages:1,
  };
const postsSlice=createSlice({
    name:'posts',
    initialState,
     reducers:{
      setCredentials:(state,action)=>{
        const {token}=action.payload;
        state.token=token;
        state.user=jwtDecode(token);
      },
      logout:(state)=>{
        state.token=null;
        state.user=null;

      }
     },
     extraReducers:(builder)=>{
        builder
        .addCase(fetchPosts.pending, (state) => {
            state.status = "pending";
            state.error = null;
          })
          .addCase(fetchPosts.fulfilled, (state, action) => {
            state.status = "idle";
            state.posts = action.payload.data;
            state.numberOfPages=action.payload.numberOfPages;
          })
          .addCase(fetchPosts.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
          })
          .addCase(fetchonePost.fulfilled, (state, action) => {
             state.post=action.payload;
          })
          
        .addCase(createPost.fulfilled, (state, action) => {
         state.posts.push(action.payload);
        })
        .addCase(updatePost.fulfilled, (state, action) => {
            const index = state.posts.findIndex(post => post._id === action.payload._id);
            state.posts[index] = action.payload;
        })
        .addCase(deletePost.fulfilled, (state, action) => {
            state.posts= state.posts.filter(post => post._id !== action.payload);
        })
        .addCase(likePost.fulfilled, (state, action) => {
             state.posts= state.posts.map((post) => (post._id === action.payload._id ? action.payload : post));
        })
       
        .addCase(getPostsbysearch.fulfilled,(state,action)=>{
            state.posts=action.payload
        })

    },
       
    
});

export const{setCredentials,logout} =postsSlice.actions;

export default postsSlice.reducer;