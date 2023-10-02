import { PropsWithChildren } from "react"

type DashboardContainerProps = {
  
}

export const DashboardContainer = ({children}:PropsWithChildren<DashboardContainerProps>) => {
  return (
    <div className="dashboard_container px-4 lg:px-6 pt-6 pb-16 rounded-4xl border bg-background-card">
      {children}
    </div>
  )
}