import { TabsContainer } from "@/components/_shared/UI/TabsContainer"
import { dashBoardPanelType } from "@/components/dashboard/_context/DashBoardContext"
import { useState } from "react"
import { InfoTab } from "./tabs/InfoTab"
import { PaiementTab } from "./tabs/PaiementTab"

export const InfosPaimentTabs = () => {
  const [activePanel, setActivePanel] = useState(0)
  const [paimentLocked, setPaimentLocked] = useState(true)

  const panels:dashBoardPanelType[] = [
    {
      title: 'Infos',
      panel: 
        <InfoTab 
          onConfirm={() => {
            setActivePanel(1)
            setPaimentLocked(false)
          }}
        />,
    },
    {
      title: 'Paiement',
      panel: <PaiementTab />,
      locked: paimentLocked
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