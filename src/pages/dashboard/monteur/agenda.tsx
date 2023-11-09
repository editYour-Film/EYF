import { DashboardContainer } from "@/components/dashboard/shared/DashboardContainer";
import LayoutDashBoard from "@/components/layouts/LayoutDashBoard";
import Head from "next/head";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/context/authContext";
import { FooterDashboard } from "@/components/dashboard/shared/FooterDashBoard";
import { GradientCard } from "@/components/dashboard/shared/GradientCard";
import { TopBar } from "@/components/dashboard/shared/TopBar";
import { useMediaQuery } from "@uidotdev/usehooks";
import { DashBoardContext } from "@/components/dashboard/_context/DashBoardContext";
import { NotificationCenter } from "@/components/dashboard/shared/NotificationCenter";
import { Month } from "@/components/dashboard/editor/agenda/Month";
import { AgendaContextProvider } from "@/components/dashboard/editor/_context/AgendaContext";

export default function DashBoardContentSchedule() {
  return (
    <>
      <Head>
        <title>EditYour.Film Agenda</title>
        <meta name="description" content="" />
      </Head>

      <LayoutDashBoard>
          <Agenda />
      </LayoutDashBoard>
    </>
  )
}

const Agenda = () => {
  const dashboardContext = useContext(DashBoardContext)
  const isMobile = useMediaQuery('(max-width: 768px)');

  const monthNames = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Décembre']

  useEffect(() => {
    const panels = []

    for (let i = 0; i < 5; i++) {
      panels.push({
        title: monthNames[i],
        panel: <Month id={i} year={2024}/>
      })
    }

    dashboardContext.setPanels(panels)
  }, [])

  return (<>
    <TopBar></TopBar>

    <AgendaContextProvider>
      <div className="flex flex-col gap-dashboard-spacing-element-medium main_content mt-[50px] md:mt-0 md:col-[2_/_3] row-[2_/_4]">
        <div className="flex flex-col">
          <NotificationCenter className='relative z-0' />
          {/* {isMobile && <AgendaMobile />} */}
          {!isMobile && <DashboardContainer className='relative z-10' />}

          <GradientCard
            title="Merci à tous"
            content={<><p>C'est grâce à votre engagement sur la plateforme que nous pouvons travailler tous ensemble à créer l'outil le plus adapté à nos besoins. Nous travaillons constamment sur des nouveautés passionnantes, et nous vous tiendrons vite au courant des évolutions à venir.</p><br/><p>Merci à vous, 
            L'équipe d'editYour.film 📹</p></>}
          />
          
          <FooterDashboard />
        </div>
      </div>
    </AgendaContextProvider>
  </>)
}
