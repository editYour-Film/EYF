import { createSlice } from '@reduxjs/toolkit'

// create a slice 
export const cursorSlice = createSlice({ 
  name: "cursor", 
  initialState: { value: 'regular' }, 
  reducers: { 
    toClick: state => { state.value = 'click' }, 
    toRegular: state => { state.value = 'regular' },
    toSwipe: state => { state.value = 'swipe' },
    toWatch: state => { state.value = 'watch' },
    toPause: state => { state.value = 'pause' },
    toUnmute: state => { state.value = 'unmute' },
    toMute: state => { state.value = 'mute' },
  } 
})

// export the action
export const {toClick, toRegular, toSwipe, toWatch, toPause, toUnmute, toMute} = cursorSlice.actions