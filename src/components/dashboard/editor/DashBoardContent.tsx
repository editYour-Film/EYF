import { DashboardContainer } from "@/components/dashboard/shared/DashboardContainer";
import { DashboardEditorHome } from "@/components/dashboard/editor/DashboardEditorHome";
import { DashboardEditorSchedule } from "@/components/dashboard/editor/DashboardEditorSchedule";
import { DashboardEditorMissions } from "@/components/dashboard/editor/DashboardEditorMissions";
import { DashboardEditorHistory } from "@/components/dashboard/editor/DashboardEditorHistory";
import { DashboardEditorProfil } from "@/components/dashboard/shared/DashboardProfil";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { SideBar } from "@/components/dashboard/shared/SideBar";
import Footer from "@/components/_shared/Footer";

type DashboardContentProps = {
  type: 'editor' | 'client',
  panel: string | string[] | undefined
}

export const DashBoardContent = ({type, panel}: DashboardContentProps) => {

  return (
    <div className="dashboard-content flex flex-col lg:flex-row justify-between gap-14">
      <SideBar className='lg:basis-2/12 lg:w-2/12' type={type} />
      <div className="lg:basis-9/12 main_content">
        <DashboardContainer>
          {panel === 'accueil' && <DashboardEditorHome />}
          {panel === 'agenda' && <DashboardEditorSchedule />}
          {panel === 'missions' && <DashboardEditorMissions />}
          {panel === 'historique' && <DashboardEditorHistory />}
          {panel === 'profil' && <DashboardEditorProfil />}
        </DashboardContainer>
        <NewsletterSection />
        <Footer />
      </div>
    </div>
  )
}