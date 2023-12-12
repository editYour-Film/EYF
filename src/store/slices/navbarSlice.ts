import { createSlice } from '@reduxjs/toolkit'

// create a slice 
export const navbarSlice = createSlice({ 
  name: "navbar", 
  initialState: { isOpen: true }, 
  reducers: { 
    openNavbar: state => { state.isOpen = true },
    closeNavbar: state => { state.isOpen = false },
    toggleNavbar: state => { state.isOpen = !state.isOpen }
  } 
})

// export the action
export const {openNavbar, closeNavbar, toggleNavbar} = navbarSlice.actions