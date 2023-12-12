import { notificationType } from "@/store/slices/NotificationsSlice";

import Video  from '@/icons/dashboard/notif/video.svg'
import Document from '@/icons/dashboard/notif/inbox.svg'
import Home from '@/icons/dashboard/notif/home.svg'
import Message from '@/icons/dashboard/notif/message-circle.svg'

export const Notification = ({type, title, text}:notificationType) => {
  let Icon
  switch (type) {
    case 'message':
      Icon = Message
      break;
    case 'document':
      Icon = Document
      break;
    case 'video':
      Icon = Video
      break;  
    default:
      Icon = Home
      break;
  }
  return (
    <button className="notification group w-full flex flex-row gap-4 items-center border p-dashboard-button-separation-spacing bg-dashboard-background-content-area hover:bg-dashboard-button-dark focus:bg-dashboard-button-dark focus:border-blueBerry first:rounded-t-dashboard-button-square-radius last:rounded-b-dashboard-button-square-radius transition-colors">
      <div>
        {<Icon className='opacity-20 group-hover:svg-color-blueBerry group-hover:opacity-100 group-focus:svg-color-blueBerry group-focus:opacity-100' />}
      </div>
      <div className="flex flex-col gap-1 text-left justify-start">
        <div className="text-base text-dashboard-text-description-base font-medium tracking-[-0.084px] leading-none">{title}</div>
        <div className="text-small text-dashboard-text-description-base-low font-medium">{text}</div>
      </div>
    </button>
  )
}