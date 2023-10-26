import { createSlice } from '@reduxjs/toolkit'

export interface notificationType {
  type: 'default' | 'message' | 'document' | 'video',
  title: string,
  text: string,
}

// create a slice 
export const NotificationSlice = createSlice({ 
  name: "notifications", 
  initialState: { 
    notifications: [
      {
        type: 'default',
        title: 'Test Notification Title',
        text: 'test notification',
      },
      {
        type: 'message',
        title: 'Test Notification Title',
        text: 'test notification',
      },
      {
        type: 'document',
        title: 'Test Notification Title',
        text: 'test notification',
      },
      {
        type: 'video',
        title: 'Test Notification Title',
        text: 'test notification',
      }
    ] as notificationType[],
    unReadNotifications: [
      {
        type: 'default',
        title: 'Test Notification Title',
        text: 'test notification',
      }
    ] as notificationType[],
  }, 
  reducers: { 
    addNotification: () => {},
  } 
})

// export the action
export const {addNotification} = NotificationSlice.actions