import { ReactNode, forwardRef } from "react"

type SimpleCardProps = {
  children?: ReactNode,
  noPadding?: boolean,
  paddingMobileSmall?: boolean,
  className?: string
}

export const SimpleCard = forwardRef<HTMLDivElement, SimpleCardProps>(function SimpleCard({children, noPadding, paddingMobileSmall, className}, ref) {
  let padding
  if(noPadding) {
    padding = ''
  } else {
    padding = paddingMobileSmall ? 'px-dashboard-specific-radius sm:px-dashboard-spacing-element-medium py-dashboard-spacing-element-medium' : 'p-dashboard-spacing-element-medium'
  }

  return (
    <div 
      ref={ref}
      className={`card-simple ${padding} border-03 bg-dashboard-button-dark shadow-large rounded-dashboard-button-square-radius ${className}`}
    >
      {children}
    </div>
  )
})