import { createSlice } from '@reduxjs/toolkit'

// create a slice 
export const joinBetaSlice = createSlice({ 
  name: "joinBeta", 
  initialState: { isVisible: false }, 
  reducers: { 
    setJoinBetaVisible: state => { state.isVisible = true },
    setJoinBetaInvisible: state => { state.isVisible = false },
  } 
})

// export the action
export const {setJoinBetaVisible, setJoinBetaInvisible} = joinBetaSlice.actions