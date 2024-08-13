import express from "express"
import auth from "../middleware/auth.js";
import { FetchAllPostBySearch,createPost, deletePost, fetchAllPosts, fetchonePost, likePost, updatePost } from "../controllers/posts.js";

const router=express.Router();
router.get('/search',FetchAllPostBySearch)
router.get('/',fetchAllPosts);
router.post('/', auth, createPost);
router.get('/:id', fetchonePost);
router.patch('/:id',  auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost);


export default router