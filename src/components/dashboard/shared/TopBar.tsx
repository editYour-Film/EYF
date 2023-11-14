import { PropsWithChildren, useContext } from "react";
import { NotificationButton } from "./NotificationButton";
import { DashBoardContext } from "../_context/DashBoardContext";
import { IslandButton } from "@/components/_shared/buttons/IslandButton";
import { openDashboardMenu } from "@/store/slices/dashboardMenuSlice";
import { useDispatch } from "react-redux";
import Burger from '@/icons/burger.svg'
import { Toaster, resolveValue } from "react-hot-toast";
import { useMediaQuery } from "@uidotdev/usehooks";
import { InfoMessage } from "@/components/_shared/UI/InfoMessage";
import DefaultIcon from '@/icons/bell.svg'
type TopBarProps = {
  className?: string;
}

export const TopBar = ({children, className}:PropsWithChildren<TopBarProps>) => {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const context = useContext(DashBoardContext)
  const dispatch = useDispatch()
  return (
    <>
      {isMobile && 
        <div className="fixed top-0 left-0 w-full z-popup">
          <Toaster />
        </div>
      }
      <div className={`topBar md:col-[2_/_3] row-[1_/_2] sticky md:relative top-0 left-0 w-full z-panel flex justify-center md:items-stretch md:justify-end flex-row gap-padding-medium py-dashboard-button-separation-spacing md:py-0 h-max bg-dashboard-button-dark bg-opacity-80 mt-[50px] md:mt-0 ${className}`}>
        {!isMobile && 
          <div className="relative basis-full ml-0 mr-auto">
            <Toaster 
              containerClassName="toaster"
              containerStyle={{
                position: 'relative',
                inset: 0,
                height: '100%',
              }}
            >  
              {(t) => (
                <>
                  <InfoMessage
                    message={t.message as string}
                    Icon={t.icon ? t.icon : DefaultIcon}
                    className={`transition-opacity ${t.visible ? 'animate-[toast-in_0.4s_ease-out]' : 'animate-[toast-out_0.4s_ease-in_forwards]'}`}
                  />
                </>
              )}
            </Toaster>
          </div>
        }

        {children}

        <NotificationButton
          onClick={() => {
            (!context.notificationCenterAnimated) && context.openNotificationCenter()
          }}
          onClose={() => {
            (!context.notificationCenterAnimated) && context.toggleNotificationCenter()
          }}
          className='shrink-0 basis-max'
        />

        <IslandButton 
          type='small-secondary'
          className="md:hidden"
          Icon={Burger}
          onClick={() => {
            dispatch(openDashboardMenu())
          }}
        />
      </div>
    </>
  )
}