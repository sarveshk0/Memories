
import express from 'express';
import mongoose from 'mongoose';
import PostMessage from "../models/postMessage.js";

  const router=express.Router();

export const fetchAllPosts = async(req,res)=>{

      const { page } = req.query;
    
    try {
        const LIMIT = 8;
        const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page
    
        const total = await PostMessage.countDocuments({});
        const posts = await PostMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

        res.json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)});
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}


export const fetchonePost = async (req, res) => { 
  const { id } = req.params;

  try {
      const post = await PostMessage.findById(id);
      
      res.status(200).json(post);
  } catch (error) {
      res.status(404).json({ message: error.message });
  }
}



export const createPost= async(req,res)=>{
  const post=req.body;
    try{

      const newPostMessage = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() })
     const newPost= await newPostMessage.save();
     res.status(201).json(newPost);
    }
    catch(error){
      res.status(500).json({message:error.message})

    }

  }


    export const updatePost = async (req, res) => {
      const { id}  = req.params;
      const { title, message, creator, selectedFile, tags } = req.body;
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
        const updatedPost = { creator, title, message, tags, selectedFile, _id: id };
        try{
             await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });
             res.status(200).json(updatedPost);
       }catch (error){
        res.status(409).json({ message: error.message });
      }
       
  }

  export const deletePost = async (req, res) => {
    const { id } = req.params;
     if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
      await PostMessage.findByIdAndDelete(id);
    
     res.json({ message: "Post deleted successfully." });
}

export const likePost = async (req, res) => {
  const { id } = req.params;

  if(!req.userId) return res.json({message:"unauthenticated"})
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
  
  const post = await PostMessage.findById(id);

  const index= post.likes.findIndex((id)=> id===String(req.userId))
  if(index===-1){
    //like the post
    post.likes.push(req.userId)
  } else {
    //dislike post
    post.likes=post.likes.filter((id)=>id != String(req.userId))
  }
  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
  
  res.json(updatedPost);
}

export const FetchAllPostBySearch=async(req,res)=>{
  const query = req.query.searchQuery ? String(req.query.searchQuery) :'none';
  console.log("query",query);
  try{
     const posts= await PostMessage.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { message: { $regex: query, $options: 'i' } },
        { creator: { $regex: query, $options: 'i' } },
        { tags: { $regex: query, $options: 'i' } },
      ],
     });
     res.json(posts);
     console.log('posts',posts);
  }
  catch(err){
    res.status(409).json({ message: err.message });
  }
}





export default router;