import { createSlice } from "@reduxjs/toolkit";

 export const ThemeSlice=createSlice({
    name:'theme',
    initialState:true,
   reducers:{
     ThemeToogler:(state)=>{
     state=!state
     return state;
    },
   }
 })

export const { ThemeToogler } = ThemeSlice.actions;
export default ThemeSlice.reducer