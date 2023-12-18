import Link from "next/link"
import { ReactNode } from "react"

type MentionInteractionProps = {
  children: ReactNode,
  className?: string,
  onClick?: () => void,
  href?: string,
  block?: boolean
}
export const MentionInteraction = ({children, className, onClick, href, block}:MentionInteractionProps) => {
  let markup = <></>

  if (href) {
    markup = 
    <Link 
      className={`mention-interaction ${block ? 'block' : ''} cursor-pointer rounded-dashboard-mention-radius transition-color duration-200 text-dashboard-text-description-base-low py-dashboard-mention-padding-top-bottom px-dashboard-mention-padding-right-left group-hover:text-dashboard-text-title-white-high group-hover:bg-dashboard-button-white-default hover:text-dashboard-text-title-white-high hover:bg-dashboard-button-white-default focus:text-dashboard-text-title-white-high focus:bg-dashboard-button-white-default focus:border-2 focus:border-dashboard-button-focus-stroke ${className}`}
      href={href}
    >{children}</Link>
  } else 
  {
    markup = 
    <span 
      className={`mention-interaction ${block ? 'block' : ''} cursor-pointer rounded-dashboard-mention-radius transition-color duration-200 text-dashboard-text-description-base-low py-dashboard-mention-padding-top-bottom px-dashboard-mention-padding-right-left group-hover:text-dashboard-text-title-white-high group-hover:bg-dashboard-button-white-default hover:text-dashboard-text-title-white-high hover:bg-dashboard-button-white-default focus:text-dashboard-text-title-white-high focus:bg-dashboard-button-white-default focus:border-2 focus:border-dashboard-button-focus-stroke ${className}`}
      onClick={() => { onClick && onClick() }}
    >{children}</span>
  }

  return (
    markup
  )
}