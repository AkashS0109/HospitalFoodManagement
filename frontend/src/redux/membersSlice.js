 import { createSlice } from "@reduxjs/toolkit";

 const membersSlice=createSlice({
    name:'member',
    initialState:{
        members:[],
        loading:false,

    },
     reducers:{
        setMembers:(state,action)=>{
            state.members=action.payload;
        },
        setLoading:(state,action)=>{
            state.loading=action.payload;
     },
    }

     
    
 });

 export const {setMembers,setLoading} = membersSlice.actions;
 export default membersSlice.reducer