import express from "express"
import { FetchAllPostBySearch,createPost, deletePost, fetchAllPosts, fetchonePost, likePost, updatePost } from "../controllers/posts.js";

const router=express.Router();
router.get('/search',FetchAllPostBySearch)
router.get('/',fetchAllPosts);
router.post('/', createPost);
router.get('/:id', fetchonePost);
router.patch('/:id', updatePost);
router.delete('/:id', deletePost);
router.patch('/:id/likePost', likePost);


export default router