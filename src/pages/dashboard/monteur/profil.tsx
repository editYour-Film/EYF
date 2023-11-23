import { DashboardContainer } from "@/components/dashboard/shared/DashboardContainer";
import Footer from "@/components/_shared/Footer";
import LayoutDashBoard from "@/components/layouts/LayoutDashBoard";
import { DashboardEditorProfil } from "@/components/dashboard/shared/DashboardProfil";
import { DashboardEditorProfilExperiences } from "@/components/dashboard/shared/DashboardProfilExperiences";
import Head from "next/head";
import { AuthContext } from "@/context/authContext";
import { TopBar } from "@/components/dashboard/shared/TopBar";
import useMediaQuery from "@/hooks/useMediaQuery";
import { NotificationCenter } from "@/components/dashboard/shared/NotificationCenter";
import { useContext, useEffect } from "react";
import { DashBoardContext } from "@/components/dashboard/_context/DashBoardContext";
import { ProfilMobile } from "@/components/dashboard/shared/ProfilMobile";
import { EditorProfilContextProvider } from "@/components/dashboard/_context/ProfilContext";
import { FooterDashboard } from "@/components/dashboard/shared/FooterDashBoard";

export default function DashBoardContentProfile() {
  const authContext = useContext(AuthContext);

  return (
    <>
      <Head>
        <title>EditYour.Film</title>
        <meta name="description" content="" />
      </Head>

      <LayoutDashBoard>
        {authContext.user.user.role && <DashBoardPageProfil />}
      </LayoutDashBoard>
    </>
  );
}

const DashBoardPageProfil = () => {
  const dashboardContext = useContext(DashBoardContext);
  const authContext = useContext(AuthContext);

  const isMobile = useMediaQuery("(max-width:768px)");

  useEffect(() => {
    dashboardContext.setPanels([
      {
        title: "Informations - personnelles",
        panel: <DashboardEditorProfil />,
      },
      {
        title: "Expériences",
        panel: <DashboardEditorProfilExperiences />,
      },
    ]);
  }, []);

  return (
    <>
      <TopBar></TopBar>

      <EditorProfilContextProvider>
        <div className="flex flex-col gap-dashboard-spacing-element-medium main_content mt-[50px] md:mt-0 md:col-[2_/_3] row-[2_/_4]">
          <div className="flex flex-col">
            <NotificationCenter className="relative z-0" />
            {authContext.isLoading ? (
              <>Chargement...</>
            ) : (
              <>
                {isMobile && <ProfilMobile />}
                {!isMobile && <DashboardContainer className="relative z-10" />}
              </>
            )}
          </div>

          <FooterDashboard />
        </div>
      </EditorProfilContextProvider>
    </>
  );
};
