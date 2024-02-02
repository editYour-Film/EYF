import { IslandButton } from "@/components/_shared/buttons/IslandButton"
import { InfosPaimentTabs } from "./InfosPaiementTabs"
import { QuoteInfos } from "../QuoteInfos"

import BackArrow from "@/icons/arrow-left.svg"
import { useContext } from "react"
import { QuoteContext } from "../../_context/QuoteContext"

export const Recap = () => {
  const quoteContext = useContext(QuoteContext)
  return (
    <div className="quote-recap w-full flex flex-row items-start justify-center gap-dashboard-spacing-element-medium min-h-screen px-[80px] py-[100px]">
      <div className="flex flex-col gap-14 basis-[70%] max-w-[900px]">
        <div className="flex flex-row gap-dashboard-spacing-element-medium items-center">
          <IslandButton
            type='tertiary'
            Icon={BackArrow}
            onClick={() => {
              quoteContext.setCurrentStep(2)
            }}
          />
          <div className="text-large text-dashboard-text-title-white-high shadow-text">Informations et paiement</div>
        </div>
        <InfosPaimentTabs />
      </div>
      <div 
        data-lenis-prevent
        className="sticky top-navbar-h pb-[100px] basis-[30%] w-[20%] max-h-screen overflow-scroll no-scroll-bar">
        <QuoteInfos />
      </div>
    </div>
  )
}