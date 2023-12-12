import { ReactElement, useRef } from "react"

interface ComponentWithClassName  {
  className?: string
}

export interface MessageType {
  Icon?: any,
  type?: 'regular' | 'danger',
  message? : string | ReactElement,
  id?: number,
  wFull?: boolean,
  small?: boolean,
  bg?: 'black' | undefined,
  onClick?: () => void,
  className?: string
}

export const InfoMessage = ({Icon, type, message, wFull, small, bg, onClick, className}:MessageType) => {
  const messageEl = useRef(null)
  const sizeClass = small ? 'py-dashboard-mention-padding-top-bottom px-dashboard-button-separation-spacing' : 'py-dashboard-mention-padding-right-left px-dashboard-button-separation-spacing'
  
  return (
    <div 
      ref={messageEl}
      onClick={() => {
        onClick && onClick()
      }}
      className={`flex items-center no-wrap gap-[10px] ${wFull ? 'w-full' : 'w-max'} max-w-[calc(100vw-32px)] ${bg === 'black' ? 'bg-dashboard-button-dark' : 'bg-[#333435]'} rounded-dashboard-button-square-radius ${sizeClass} ${className}`}>
      <div className="w-[24px] h-[24px]">{Icon && <Icon className={`w-[24px] h-[24px] ${type === 'danger' ? 'svg-color-appleRed' : ''}`} />}</div>
      <div className="text-dashboard-text-description-base">{message}</div>
    </div>
  );
};
