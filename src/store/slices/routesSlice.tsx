import { createSlice } from '@reduxjs/toolkit'

// create a slice 
export const routesSlice = createSlice({ 
  name: "routes", 
  initialState: { routeName: 'accueil' }, 
  reducers: { 
    setRouteName: (state, action) => { state.routeName = action.payload.name }
  } 
})

// export the action
export const {setRouteName} = routesSlice.actions