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
    <div className={`topBar flex flex-row justify-end gap-padding-medium ${className}`}>
      {children}
      <NotificationButton
        onClick={() => {
          (!context.notificationCenterAnimated) && context.openNotificationCenter()
        }}
        onClose={() => {
          (!context.notificationCenterAnimated) && context.toggleNotificationCenter()
        }}
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
  )
}