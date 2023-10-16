import { DashboardContainer } from "@/components/dashboard/shared/DashboardContainer";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { SideBar } from "@/components/dashboard/shared/SideBar";
import Footer from "@/components/_shared/Footer";
import LayoutDashBoard from "@/components/layouts/LayoutDashBoard";
import { useUser } from "@/auth/authContext";
import { DashboardEditorProfil } from "@/components/dashboard/editor/DashboardEditorProfil";
import Head from "next/head";
import useMediaQuery from "@/hooks/useMediaQuery";

export default function DashBoardContentProfile() {
  const [userInfo, isLoggedIn] = useUser();
  const isDesktop = useMediaQuery('(min-width:768px)')
  
  return (
    <>
      <Head>
        <title>EditYour.Film</title>
        <meta name="description" content="" />
      </Head>

      <LayoutDashBoard>
        <div className="dashboard-content flex flex-col lg:flex-row justify-between gap-14">
          {isLoggedIn && (
            <SideBar
              className="lg:basis-2/12 lg:w-2/12"
              type={userInfo.user.role.name}
            />
          )}
          <div className="lg:basis-9/12 main_content">
            <DashboardContainer
              hasBg={isDesktop}
            >
              <DashboardEditorProfil />
            </DashboardContainer>
            <NewsletterSection />
            <Footer />
          </div>
        </div>
      </LayoutDashBoard>
    </>
  );
}
