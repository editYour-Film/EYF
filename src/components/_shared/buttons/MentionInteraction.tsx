import { ReactNode } from "react"

type MentionInteractionProps = {
  children: ReactNode,
  className?: string,
  onClick?: () => void,
  block?: boolean
}
export const MentionInteraction = ({children, className, onClick, block}:MentionInteractionProps) => {
  return (
    <span 
      className={`mention-interaction ${block ? 'block' : ''} cursor-pointer rounded-dashboard-mention-radius transition-color duration-200 text-dashboard-text-description-base-low py-dashboard-mention-padding-top-bottom px-dashboard-mention-padding-right-left group-hover:text-dashboard-text-title-white-high group-hover:bg-dashboard-button-white-default hover:text-dashboard-text-title-white-high hover:bg-dashboard-button-white-default focus:text-dashboard-text-title-white-high focus:bg-dashboard-button-white-default focus:border-2 focus:border-dashboard-button-focus-stroke ${className}`}
      onClick={() => { onClick && onClick() }}
    >{children}</span>
  )
}