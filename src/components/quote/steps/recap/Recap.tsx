import { IslandButton } from "@/components/_shared/buttons/IslandButton"
import { InfosPaimentTabs } from "./InfosPaiementTabs"
import { QuoteInfos } from "../QuoteInfos"

import BackArrow from "@/icons/arrow-left.svg"

export const Recap = () => {
  return (
    <div className="quote-recap w-full flex flex-row items-start justify-stretch gap-dashboard-spacing-element-medium min-h-screen px-[80px] py-[100px]">
      <div className="flex flex-col gap-14 basis-full">
        <div className="flex flex-row gap-dashboard-spacing-element-medium items-center">
          <IslandButton
            type='tertiary'
            Icon={BackArrow}
            onClick={() => {}}
          />
          <div className="text-large text-dashboard-text-title-white-high shadow-text">Informations et paiement</div>
        </div>
        <InfosPaimentTabs />
      </div>
      <div className="basis-[20%]">
        <QuoteInfos />
      </div>
    </div>
  )
}