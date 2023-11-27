import { createSlice } from '@reduxjs/toolkit'

// create a slice 
export const menuSlice = createSlice({ 
  name: "menu", 
  initialState: { isOpen: false }, 
  reducers: { 
    openMenu: state => { state.isOpen = true },
    closeMenu: state => { state.isOpen = false },
    toggleMenu: state => { state.isOpen = !state.isOpen }
  } 
})

// export the action
export const {openMenu, closeMenu, toggleMenu} = menuSlice.actions