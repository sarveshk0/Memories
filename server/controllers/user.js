import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import User from '../models/user.js'

export const signin= async(req,res)=>{
    const {email,password} =req.body;
    
    try{
  const existingUser=await User.findOne({email});

   if(!existingUser) return res.status(404).json({message:"User does't exist"});
   const isPasswordCorrect=await bcrypt.compare(password,existingUser.password);
   if(!isPasswordCorrect) return res.status(400).json({message:"Inavalid credentials"});
   const token=jwt.sign({email:existingUser.email,id:existingUser._id},'test',{expiresIn:'1h'});
     res.status(200).json({result:existingUser,token});

    } catch (err){
       res.status(500).json({message:"Somethig went Wrong"});
       console.log(err);
    }
};


export const signup=async(req,res)=>{
    const {email,password,confirmPassword,firstName,lastName}=req.body;
    //  console.log(email,password,firstName,lastName); 
    try { 
    const existingUser=await User.findOne({email});

    if (existingUser) return  res.status(400).json({message:"User already exists"})

    if(password!=confirmPassword) return res.status(400).json({message:"Password Mismatched"});

     const hashedPassword= await bcrypt.hash(password,12);
    const result=await User.create({email,password:hashedPassword,name:`${firstName} ${lastName}`})
    const token=jwt.sign({email:result.email, id:result._id}, 'test' , {expiresIn:"1h"});
    res.status(201).json({result,token})
     } catch(err){
        res.status(500).json({message:"Something went wrong"})
        console.log(err);
    }

}