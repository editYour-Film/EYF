import { ReactNode } from "react"

type SimpleCardProps = {
  children?: ReactNode,
  paddingMobileSmall?: boolean,
  className?: string
}

export const SimpleCard = ({children, paddingMobileSmall, className}:SimpleCardProps) => {
  return (
    <div className={`card-simple ${paddingMobileSmall ? 'px-dashboard-specific-radius sm:px-dashboard-spacing-element-medium py-dashboard-spacing-element-medium' : 'p-dashboard-spacing-element-medium'} border bg-dashboard-button-dark shadow-large rounded-dashboard-button-square-radius ${className}`}>
      {children}
    </div>
  )
}