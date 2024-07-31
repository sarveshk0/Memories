// import axios from 'axios';


// const url='http://localhost:5000/posts';



// api.js
import axios from 'axios';

const url='https://memories-0jb9.onrender.com/posts' // Replace with your API URL
export const getPost=(id)=>axios.get(`${url}/${id}`)
export const fetchAllPosts = (page) =>axios.get(`${url}?page=${page}`);
export const fetchPostBySearch=(searchQuery)=>axios.get(`${url}/search?searchQuery=${searchQuery || 'none'} `);
export const createPost = (newPost) => axios.post(url, newPost);
export const updateCurrPost = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost);
export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);
export const deletePost = (id) => axios.delete(`${url}/${id}`);