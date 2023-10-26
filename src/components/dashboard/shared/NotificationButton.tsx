import { IslandButton } from "@/components/_shared/buttons/IslandButton"

import Bell from '@/icons/bell.svg'
import X from '@/icons/dashboard/x.svg'

import { useSelector } from "react-redux"
import { RootState } from "@/store/store"
import { useContext, useEffect, useRef } from "react"
import { DashBoardContext } from "../_context/DashBoardContext"
import gsap from "gsap"

type NotificationButtonProps = {
  onClick: () => void,
  onClose: () => void
}

export const NotificationButton = ({onClick, onClose}:NotificationButtonProps) => {
  const context = useContext(DashBoardContext)
  const unReadNotifications = useSelector((state: RootState) => state.notification.unReadNotifications)

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

  return (
    <div className="notification-button relative overflow-hidden">
      <div className="relative">
        <div ref={iconsWrapper}>
          <div className="relative">
            <IslandButton
              type="small"
              Icon={Bell}
              label={unReadNotifications.length > 0 ? unReadNotifications.length.toString() : undefined}
              onClick={() => { onClick && onClick() }}
            />
          </div>

          <div className="absolute top-full left-1/2 -translate-x-1/2 translate-y-[10px]">
            <IslandButton
              type="small"
              Icon={X}
              onClick={() => { 
                console.log('click');
                
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