import { ReactNode, forwardRef } from "react"

type SimpleCardProps = {
  children?: ReactNode,
  paddingMobileSmall?: boolean,
  className?: string
}

export const SimpleCard = forwardRef<HTMLDivElement, SimpleCardProps>(function SimpleCard({children, paddingMobileSmall, className}, ref) {
  return (
    <div 
      ref={ref}
      className={`card-simple ${paddingMobileSmall ? 'px-dashboard-specific-radius sm:px-dashboard-spacing-element-medium py-dashboard-spacing-element-medium' : 'p-dashboard-spacing-element-medium'} border-03 bg-dashboard-button-dark shadow-large rounded-dashboard-button-square-radius ${className}`}
    >
      {children}
    </div>
  )
})