import { PropsWithChildren, useContext } from "react";
import { NotificationButton } from "./NotificationButton";
import { DashBoardContext } from "../_context/DashBoardContext";
import { IslandButton } from "@/components/_shared/buttons/IslandButton";
import { openDashboardMenu } from "@/store/slices/dashboardMenuSlice";
import { useDispatch } from "react-redux";
import Burger from '@/icons/burger.svg'

type TopBarProps = {
  className?: string;
}

export const TopBar = ({children, className}:PropsWithChildren<TopBarProps>) => {
  const context = useContext(DashBoardContext)
  const dispatch = useDispatch()

  return (
    <>
      <div className={`topBar md:col-[2_/_3] row-[1_/_2] sticky md:relative top-0 left-0 w-full z-panel flex justify-center md:items-stretch md:justify-end flex-row gap-padding-medium py-dashboard-button-separation-spacing md:py-0 h-max bg-dashboard-button-dark bg-opacity-80 mt-[50px] md:mt-0 ${className} z-header`}>
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