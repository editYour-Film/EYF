import { TabsContainer } from "@/components/_shared/UI/TabsContainer"
import { dashBoardPanelType } from "@/components/dashboard/_context/DashBoardContext"
import { useEffect, useState } from "react"
import { InfoTab } from "./tabs/InfoTab"
import { PaiementTab } from "./tabs/PaiementTab"
import { useLenis } from "@studio-freight/react-lenis"

export const InfosPaimentTabs = () => {
  const [activePanel, setActivePanel] = useState(0)
  const [paimentLocked, setPaimentLocked] = useState(false)
  const lenis = useLenis()
  // List of the tabs
  const panels:dashBoardPanelType[] = [
    {
      title: 'Infos',
      panel: 
        <InfoTab 
          onConfirm={() => {
            setActivePanel(1)
            setPaimentLocked(false)
            lenis.scrollTo(0);
          }}
          onErrors={() => {
            setPaimentLocked(true)
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