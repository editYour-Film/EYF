import { DashboardContainer } from "@/components/dashboard/shared/DashboardContainer";
import { DashboardEditorHome } from "@/components/dashboard/editor/DashboardEditorHome";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { SideBar } from "@/components/dashboard/shared/SideBar";
import Footer from "@/components/_shared/Footer";
import LayoutDashBoard from "@/components/layouts/LayoutDashBoard";
import Head from "next/head";
import { PropsWithChildren, useContext, useEffect, useState } from "react";
import { DashBoardContext } from "@/components/dashboard/_context/DashBoardContext";
import { AddModel } from "@/components/dashboard/editor/AddModel";
import { IslandButton } from "@/components/_shared/buttons/IslandButton";
import { TopBar } from "@/components/dashboard/shared/TopBar";
import { NotificationCenter } from "@/components/dashboard/shared/NotificationCenter";
import { useUser } from "@/auth/authContext";
import { useMediaQuery } from "@uidotdev/usehooks";

export default function DashBoardContentHome() {
  return (
    <>
      <Head>
        <title>EditYour.Film</title>
        <meta name="description" content="" />
      </Head>

      <LayoutDashBoard>
        <DashBoardPageHome />
      </LayoutDashBoard>
    </>
  );
}

const DashBoardPageHome = ({children}:PropsWithChildren) => {
  const context = useContext(DashBoardContext)
  const [user] = useUser()
  const [hasAddModel, setHasAddModel] = useState(false)

  const isMobile = useMediaQuery('(max-width: 768px)')

  useEffect(() => {
    context.setPanels([{
      title: 'Accueil - Modèles',
      panel: DashboardEditorHome
    }])
  }, [])

  return (<>
    <TopBar
      className="md:col-[2_/_3] row-[1_/_2] sticky md:relative top-0 left-0 w-full z-popup flex justify-center py-dashboard-button-separation-spacing md:py-0 h-max md:justify-end bg-dashboard-button-dark bg-opacity-80 mt-[50px] md:mt-0"
    >
      <IslandButton
        type="small-secondary"
        label="Ajouter un modèle"
        disabled={hasAddModel}

        onClick={() => {
          if(!isMobile) {
            if(!context.panels?.find((p) => p.panel === AddModel)) {
              context.addPannel({
                title: 'Ajouter un modèle',
                panel: AddModel
              })
            }
          } else {
            context.setIsAddModelPannelOpen(true)
          }

          setHasAddModel(true)
        }}
      />
    </TopBar>

    <div className="main_content mt-[50px] md:mt-0 md:col-[2_/_3] row-[2_/_4] overflow-hidden">
      <div className="flex flex-col">
        <NotificationCenter className='relative z-0' />

        <DashboardContainer className='relative z-10' />
        
        {
          isMobile && 
          <>
            <div 
              data-lenis-prevent
              className={`fixed top-0 left-0 w-full bg-dashboard-button-dark z-popup overflow-hidden transition-transform duration-500  ${context.isAddModelPannelOpen ? 'ease-out translate-x-0' : 'translate-x-full pointer-events-none ease-in'}`}
            >
              <AddModel />
            </div>
          </>
        }  
      </div>

      <NewsletterSection />
      <Footer />
    </div>
  </>)
}
