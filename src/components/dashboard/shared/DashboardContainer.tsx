import { PropsWithChildren, useEffect } from "react"

type DashboardContainerProps = {
  hasBg?: boolean
}

export const DashboardContainer = ({hasBg = true, children}:PropsWithChildren<DashboardContainerProps>) => {
  return (
    <div className={`dashboard_container ${hasBg ? 'px-4 lg:px-6 pt-6 pb-16 rounded-4xl border bg-background-card' : ''}`}>
      {children}
    </div>
  )
}