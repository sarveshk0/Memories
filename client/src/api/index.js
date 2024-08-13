 import axios from 'axios';

  const API= axios.create({baseURL:'https://memories-0jb9.onrender.com'})
 //const API= axios.create({baseURL:'http://localhost:5000'})

// const url='https://memories-0jb9.onrender.com/posts' // Replace with your API URL

API.interceptors.request.use((req)=>{
    if(localStorage.getItem('user')){
        req.headers.Authorization=`Bearer ${JSON.parse(localStorage.getItem('user')).token}`
    }
    return req
})



export const getPost=(id)=>API.get(`/posts/${id}`)
export const fetchAllPosts = (page) =>API.get(`/posts?page=${page}`);
export const fetchPostBySearch=(searchQuery)=>API.get(`/posts/search?searchQuery=${searchQuery || 'none'} `);
export const createPost = (newPost) => API.post('/posts', newPost);
export const updateCurrPost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const deletePost = (id) => API.delete(`/posts/${id}`);

export const signIn=(formData)=>API.post('/user/signin',formData)
export const signUp=(formData)=>API.post('/user/signup',formData)
