import { TabsContainer } from "@/components/_shared/UI/TabsContainer"
import { dashBoardPanelType } from "@/components/dashboard/_context/DashBoardContext"
import { useState } from "react"
import { InfoTab } from "./tabs/InfoTab"
import { PaiementTab } from "./tabs/PaiementTab"

export const InfosPaimentTabs = () => {
  const [activePanel, setActivePanel] = useState(0)
  const panels:dashBoardPanelType[] = [
    {
      title: 'Infos',
      panel: <InfoTab />,
    },
    {
      title: 'Paiement',
      panel: <PaiementTab />,
    }
  ]

  return (
    <div className="info-paiments-tabs">
      <TabsContainer 
        panels={panels}
        activePanel={activePanel}
        onActivePannelChange={(index) => {setActivePanel(index)}}
      />
    </div>
  )
}