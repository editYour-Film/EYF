import { useState } from "react"

export interface StepBubbleProps {
  onClick?: () => void,
  selected: boolean
}

export const StepBubble = ({onClick, selected = false}:StepBubbleProps) => {
  const [isSelected, setIsSelected] = useState<boolean>(selected)

  return (
    <div
      className={`w-[7px] h-[7px] rounded-full transition-color ${selected ? 'bg-dashboard-button-island-BlueBerry-default' : 'bg-dashboard-button-island-disabled'}`}
      onClick={() => {
        if(!isSelected) {
          setIsSelected(true)
          onClick && onClick()
        }
      }}
    ></div>
  )
}