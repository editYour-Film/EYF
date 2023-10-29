import { createSlice } from '@reduxjs/toolkit'

export interface notificationType {
  id: number,
  type: 'default' | 'message' | 'document' | 'video',
  title: string,
  text: string,
  state: 'read' | 'unread'
}

export const NotificationSlice = createSlice({ 
  name: "notifications", 
  initialState: { 
    notifications: [] as notificationType[],
  },
  reducers: { 
    getNotifications: state => {
      // TODO: Intégration get the notifications
      state.notifications = [
        {
          id: 1,
          type: 'default',
          title: 'Test Notification Title',
          text: 'test notification',
          state: 'unread'
        },
        {
          id: 2,
          type: 'message',
          title: 'Test Notification Title',
          text: 'test notification',
          state: 'unread'
        },
        {
          id: 3,
          type: 'document',
          title: 'Test Notification Title',
          text: 'test notification',
          state: 'unread'
        },
        {
          id: 4,
          type: 'video',
          title: 'Test Notification Title',
          text: 'test notification',
          state: 'unread'
        }
      ]
    },
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
  } 
})

// export the action
export const {getNotifications, setNotificationRead} = NotificationSlice.actions