import gsap from "gsap"
import { ReactElement, forwardRef, useEffect, useRef } from "react"

interface ComponentWithClassName  {
  className?: string
}

export interface MessageType {
  Icon?: React.FC<ComponentWithClassName>,
  type?: 'regular' | 'danger',
  message?: string,
}

interface InfoMessageProps extends MessageType {
  Icon?: React.FC<ComponentWithClassName>,
  type?: 'regular' | 'danger',
  message?: string,
  wFull?: boolean,
  small?: boolean,
}

export const InfoMessage = ({Icon, type, message, wFull, small}:InfoMessageProps) => {
  const sizeClass = small ? 'py-dashboard-mention-padding-top-bottom px-dashboard-button-separation-spacing' : 'py-dashboard-mention-padding-right-left px-dashboard-button-separation-spacing'
  return (
    <div 
      className={`flex no-wrap gap-[10px] ${wFull ? 'w-full' : 'w-max'} max-w-[calc(100vw-32px)] bg-soyMilk-100 rounded-dashboard-button-square-radius ${sizeClass}`}>
      <div className="w-[24px] h-[24px]">{Icon && <Icon className={`w-[24px] h-[24px] ${type === 'danger' ? 'svg-color-appleRed' : ''}`} />}</div>
      <div>{message}</div>
    </div>
  )
}