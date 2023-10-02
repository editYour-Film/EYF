import { createSlice } from '@reduxjs/toolkit'

// create a slice 
export const transitionSlice = createSlice({ 
  name: "transition", 
  initialState: { enabled: true }, 
  reducers: { 
    enableTransition: state => { state.enabled = true },
    disableTransition: state => { state.enabled = false },
  } 
})

// export the action
export const {enableTransition, disableTransition} = transitionSlice.actions