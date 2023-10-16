import { forwardRef } from "react"

type cardProps = {
  className?: string,
  bg: string,
  borderRadius?: number,
  borderWidth?: number,
  children: React.ReactNode
}

export const Card = forwardRef<HTMLDivElement, cardProps>(function Card ({className, bg, borderRadius, borderWidth, children}, ref) {
  return (
    <div 
      ref={ref}
      className={`card border-linear ${className ?? ''}`}
      style={{
        borderRadius: borderRadius + 'px',
        padding: borderWidth ? borderWidth + 'px' : '1px'
      }}
    >
      <div 
        className={`bg-${bg} w-full h-full overflow-hidden`}
        style={{
          borderRadius: borderRadius ? borderRadius - 1 : 0,
        }}
      >
        {children}
      </div>
    </div>
  )
})