import { PropsWithChildren, ReactNode } from "react"

type SimpleCardProps = {
  children?: ReactNode,
  className?: string
}

export const SimpleCard = ({children, className}:SimpleCardProps) => {
  return (
    <div className={`card-simple p-dashboard-spacing-element-medium border bg-dashboard-button-dark shadow-large rounded-dashboard-button-square-radius ${className}`}>
      {children}
    </div>
  )
}