import { DashboardContainer } from "@/components/dashboard/shared/DashboardContainer";
import LayoutDashBoard from "@/components/layouts/LayoutDashBoard";
import Head from "next/head";
import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "@/context/authContext";
import { FooterDashboard } from "@/components/dashboard/shared/FooterDashBoard";
import { GradientCard } from "@/components/dashboard/shared/GradientCard";
import { TopBar } from "@/components/dashboard/shared/TopBar";
import useMediaQuery from "@/hooks/useMediaQuery";
import { DashBoardContext } from "@/components/dashboard/_context/DashBoardContext";
import { NotificationCenter } from "@/components/dashboard/shared/NotificationCenter";
import { Month } from "@/components/dashboard/editor/agenda/Month";
import { AgendaContext, AgendaContextProvider } from "@/components/dashboard/editor/_context/AgendaContext";
import { monthNames } from "@/components/dashboard/editor/data/labels";
import { AgendaMobile } from "@/components/dashboard/editor/agenda/AgendaMobile";
import { ReactElement } from "react-markdown/lib/react-markdown";

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
  const agendaContext = useContext(AgendaContext)

  const isMobile = useMediaQuery('(max-width: 768px)');

  const panels = useRef<{title: string, panel: ReactElement, month: Date, year: number}[]>([])

  useEffect(() => {
    const today = new Date()

    for (let i = 0; i < 4; i++) {
      const month = new Date()
      month.setMonth(today.getMonth() + i)
      
      panels.current.push({
        month,
        title: monthNames[month.getMonth()],
        panel: <Month key={i} id={month.getMonth()} year={month.getFullYear()}/>,
        year: month.getFullYear()
      })
    }

    dashboardContext.setPanels(panels.current)
  }, [])

  return (<>
    <TopBar></TopBar>

    <AgendaContextProvider>
      <div className="flex flex-col gap-dashboard-spacing-element-medium main_content mt-[50px] md:mt-0 md:col-[2_/_3] row-[2_/_4]">
        <div className="flex flex-col ">
          <NotificationCenter className='relative z-0' />
          {isMobile && <AgendaMobile panels={panels.current} />}

          {!isMobile && <DashboardContainer className='relative z-10' />}

          <div className="flex flex-col mt-[60px] gap-dashboard-spacing-element-medium">
            <GradientCard
              title="Merci à tous"
              content={<><p>C'est grâce à votre engagement sur la plateforme que nous pouvons travailler tous ensemble à créer l'outil le plus adapté à nos besoins. Nous travaillons constamment sur des nouveautés passionnantes, et nous vous tiendrons vite au courant des évolutions à venir.</p><br/><p>Merci à vous, 
              L'équipe d'editYour.film 📹</p></>}
            />
            
            <FooterDashboard />
          </div>
        </div>
      </div>
    </AgendaContextProvider>
  </>)
}
