import { useContext } from "react"
import { DashBoardContext } from "../_context/DashBoardContext"

export const ButtonsWrapper = () => {
  const context = useContext(DashBoardContext)

  if(context.buttons) {
    return (
      <div className="buttons-wrapper md:hidden fixed z-buttons bottom-0 w-full flex flex-col justify-stretch items-center gap-dashboard-mention-padding-right-left py-dashboard-spacing-element-medium px-dashboard-specific-radius bg-dashboard-button-dark">
        {context.buttons}    
      </div>
    )
  } else {
    return <></>
  }
}