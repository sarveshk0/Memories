
import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import * as api from '../../api/index.js'
import { act } from 'react';


export const signup=createAsyncThunk('/user/signup',async(formData)=>{
    
     try {
        const response=await api.signUp(formData)
        console.log('response',response);
        
        return response.data;
     } catch(err){
        console.log(err);

     }
      
   
})


export const signin=createAsyncThunk('/user/signin',async(formData)=>{
 try{
    const response=await api.signIn(formData);
    console.log( 'signin',response);
    return response.data;
 }catch(err){
    console.log(err);
 }
   
}
)



const authSlice = createSlice({
   name: "auth",
  initialState:{
    user:null,
    token:null,
    status:'idle',
    error:null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.token=action.payload.token;
      const userData = {
        user: action.payload,
        token: action.payload.token
      };
      localStorage.setItem("user", JSON.stringify(userData));
      
    },
    removeUser: (state) => {
      state.user = null;
      state.token=null;
      localStorage.removeItem("user");
    },
  },
  extraReducers:(builder)=>{
    builder
    .addCase(signup.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.result;
        state.token = action.payload.token;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(signup.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(signin.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.status = 'succeeded';
        console.log(action.payload);
        state.user = action.payload.result;
        state.token = action.payload.token;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(signin.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }



});

export const { setUser, removeUser } = authSlice.actions;
export default authSlice.reducer;
