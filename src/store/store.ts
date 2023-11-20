import { configureStore } from '@reduxjs/toolkit'
import { cursorSlice } from "@/store/slices/cursorSlice"
import { joinBetaSlice } from '@/store/slices/joinBetaSlice'
import { transitionSlice } from '@/store/slices/transitionSlice'
import { NotificationSlice } from './slices/NotificationsSlice'
import { dashboardMenuSlice } from './slices/dashboardMenuSlice'

// config the store 
const store= configureStore({
  reducer: {
    cursor: cursorSlice.reducer,
    joinBeta: joinBetaSlice.reducer,
    transition: transitionSlice.reducer,
    notification: NotificationSlice.reducer,
    dashboardMenu: dashboardMenuSlice.reducer,
  }})

// export default the store 
export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch