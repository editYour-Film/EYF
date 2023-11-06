import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { useContext } from "react";
import useStrapi from "@/hooks/useStrapi"
import { AuthContext } from "@/context/authContext";

export interface notificationType {
  // id: number,
  type: 'everyone' | 'all-editor' | 'all-client' | 'message' | 'mission',
  title: string,
  text: string,
  state: 'read' | 'unread',
  // date: Date
}

export const getNotificationsAsync = createAsyncThunk(
  'notifications/getNotificationsAsync',
  async (data: any) => {
    
    const notifications = data.details.notifications.map((notification:any) => {
      return {
        type: notification.type,
        title: notification.title,
        text: notification.description,
        state: 'unread',
      }
    })

    return notifications;
  }
);

const initialState: { notifications: notificationType[] } = {
  notifications: []
};

export const NotificationSlice = createSlice({ 
  name: "notifications", 
  initialState,
  reducers: {
    setNotificationRead: (state, action) => {
      // TODO: Intégration set the notification with the id action.payload read or delete it from database
      
      state.notifications = state.notifications.map((notif) => {
        if (notif.id === action.payload) {
          const newNotif = {...notif}
          newNotif.state = 'read'
          
          return newNotif
        } else {
          return notif
        }
      })
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getNotificationsAsync.fulfilled, (state, action) => {
      state.notifications = action.payload;
    });
  },
})

// export the action
export const { setNotificationRead } = NotificationSlice.actions;

export default NotificationSlice.reducer;