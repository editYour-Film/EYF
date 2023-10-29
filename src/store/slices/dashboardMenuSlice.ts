import { createSlice } from '@reduxjs/toolkit'

// create a slice 
export const dashboardMenuSlice = createSlice({ 
  name: "dashboardMenu", 
  initialState: { isOpen: false }, 
  reducers: { 
    openDashboardMenu: state => { state.isOpen = true },
    closeDashboardMenu: state => { state.isOpen = false },
    toggleDashboardMenu: state => { state.isOpen = !state.isOpen }
  } 
})

// export the action
export const {openDashboardMenu, closeDashboardMenu, toggleDashboardMenu} = dashboardMenuSlice.actions