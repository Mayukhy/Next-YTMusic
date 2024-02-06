'use client';

import { createSlice } from '@reduxjs/toolkit'

const initialState = {

    activeMenue:'Profile',
}

export const userSlice = createSlice({
    //from react component by this name the states are called
  name: 'user',
  initialState,
  reducers: {

setActiveMenue: (state,action) => {
  state.activeMenue=action.payload
  },

  },
})

// Action creators are generated for each case reducer function
export const {setActiveMenue} = userSlice.actions

export default userSlice.reducer