import { IslandButton } from "@/components/_shared/buttons/IslandButton"

import Bell from '@/icons/bell.svg'
import X from '@/icons/dashboard/x.svg'

import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store/store"
import { useContext, useEffect, useRef } from "react"
import { DashBoardContext } from "../_context/DashBoardContext"
import gsap from "gsap"
import { setNotificationRead } from "@/store/slices/NotificationsSlice"

type NotificationButtonProps = {
  onClick: () => void,
  onClose: () => void,
  className?: string
}

export const NotificationButton = ({onClick, onClose, className}:NotificationButtonProps) => {
  const dispatch = useDispatch()
  const context = useContext(DashBoardContext)
  
  const notifications = useSelector((state: RootState) => state.notification.notifications)
  const unReadNotifications = notifications.filter((notif) => notif.state === 'unread')

  const iconsWrapper = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let ctx = gsap.context(()=> {
      if(!context.notificationCenterAnimated) {
        const tl = gsap.timeline()

        if(context.notificationCenterOpen === true) {          
          tl.fromTo(iconsWrapper.current, {
            yPercent: 0,
            y: 0
          },{
            yPercent: -100,
            y: -10,
            duration: 0.8,
            ease: 'power2.out' 
          })
        }
        else {          
          tl.fromTo(iconsWrapper.current, {
            yPercent: -100,
            y: -10 
          },{
            yPercent: 0,
            y: 0,
            duration: 0.8,
            ease: 'power2.out'
          })
        }
      }
    })

    return () => {
      ctx.revert()
    }
  }, [context.notificationCenterOpen])

  const handleNotifClick = () => {
    unReadNotifications.length > 0 && unReadNotifications.forEach((notif) => {
      notif && dispatch(setNotificationRead(notif.id))
    })

    onClick && onClick()
  }
  return (
    <div className={`notification-button relative overflow-hidden ${className ?? ''}`}>
      <div className="relative">
        <div ref={iconsWrapper}>
          <div className="relative">
            <IslandButton
              type="small-secondary"
              Icon={Bell}
              label={unReadNotifications.length > 0 ? unReadNotifications.length.toString() : undefined}
              onClick={() => { handleNotifClick() }}
            />
          </div>

          <div className={`absolute top-full left-1/2 -translate-x-1/2 translate-y-[10px] ${context.notificationCenterOpen ? 'block' : 'hidden'}`}>
            <IslandButton
              type="small-secondary"
              Icon={X}
              onClick={() => {                 
                onClose && onClose() 
              }}
              iconColor="appleRed"
              
            />
          </div>
        </div>
      </div>
    </div>
  )
}