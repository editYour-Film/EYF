import { MessageType } from '@/components/_shared/UI/InfoMessage'
import { createSlice } from '@reduxjs/toolkit'

// create a slice 
export const toastSlice = createSlice({ 
  name: "toast", 
  initialState: { toasts: [] as MessageType[] }, 
  reducers: { 
    addToast: (state, action) => { 
      state.toasts = [...state.toasts, action.payload] 
    },
    
    removeToast: (state, action) => { 
      state.toasts = state.toasts.filter((el) => el.id !== action.payload) 
    },

    hideToast: (state, action) => {
      state.toasts = state.toasts.map((el, i) => {        
        if(el.id === action.payload) {
          el.toHide = true 
        }
        return el
      })  
    }
  }
})

// export the action
export const {addToast, removeToast, hideToast} = toastSlice.actions