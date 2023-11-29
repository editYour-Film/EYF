import { createSlice } from '@reduxjs/toolkit'

// create a slice 
export const cursorSlice = createSlice({ 
  name: "cursor", 
  initialState: { 
    value: 'regular',
    lastState: ['regular'],
    enabled: false,
    locked: false,
    currentText: '',
  },
  reducers: { 
    toClick: state => { 
      state.value = 'click'
      state.lastState = ['click', state.lastState[0]]
    }, 
    toRegular: state => {
      state.value = 'regular' 
      state.lastState = ['regular', state.lastState[0]]
    },
    toSwipe: state => { 
      state.value = 'swipe'
      state.lastState = ['swipe', state.lastState[0]]
    },
    toWatch: state => { 
      state.value = 'watch' 
      state.lastState = ['watch', state.lastState[0]]
    },
    toPause: state => { 
      state.value = 'pause' 
      state.lastState = ['pause', state.lastState[0]]
    },
    toUnmute: state => {
      state.value = 'unmute'
      state.lastState = ['unmute', state.lastState[0]]
    },
    toMute: state => { 
      state.value = 'mute' 
      state.lastState = ['mute', state.lastState[0]]
    },
    toArrowLeft: state => { 
      state.value = 'arrowLeft' 
      state.lastState = ['mute', state.lastState[0]]
    },
    toArrowRight: state => { 
      state.value = 'arrowRight' 
      state.lastState = ['mute', state.lastState[0]]
    },
    toRead: state => { 
      state.value = 'read' 
      state.lastState = ['read', state.lastState[0]]
    },
    cursorText: (state, action) => {
      state.value = 'text'
      state.lastState = ['text', state.lastState[0]]
      state.currentText = action.payload
    },
    toLastState: (state, action) => {
      state.value = action.payload
      state.lastState = [action.payload, state.lastState[0]]
    },
    enableCustomCursor: state => {
      state.enabled = true
      state.value = 'regular'
      state.lastState = ['regular', state.lastState[0]]
    },
    disableCustomCursor: state => { state.enabled = false },
  } 
})

// export the action
export const {
  toClick,
  toRegular,
  toSwipe,
  toWatch,
  toPause,
  toUnmute,
  toMute,
  toArrowLeft,
  toArrowRight,
  toRead,
  cursorText,
  toLastState,
  enableCustomCursor,
  disableCustomCursor,
} = cursorSlice.actions