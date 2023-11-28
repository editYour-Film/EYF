import { PropsWithChildren } from "react"
import { ReactElement } from "react-markdown/lib/react-markdown";

type CardsContainerProps = {
  headingComp: ReactElement
}

export const CardsContainer = ({headingComp, children}: PropsWithChildren<CardsContainerProps>) => {  
  return (
    <div className="flex flex-col gap-dashboard-spacing-element-medium w-full shadow-large bg-dashboard-background-content-area md:p-dashboard-spacing-element-medium rounded-dashboard-button-square-radius border-03">
      <div>{headingComp}</div>
      <div className="grid md:grid-cols-2 gap-dashboard-spacing-element-medium">{children}</div>
    </div>
  )
}