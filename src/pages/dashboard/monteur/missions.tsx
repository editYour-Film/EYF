import { DashboardContainer } from "@/components/dashboard/shared/DashboardContainer";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { SideBar } from "@/components/dashboard/shared/SideBar";
import Footer from "@/components/_shared/Footer";
import LayoutDashBoard from "@/components/layouts/LayoutDashBoard";
import { useUser } from "@/auth/authContext";
import { DashboardEditorMissions } from "@/components/dashboard/editor/DashboardEditorMissions";
import Head from "next/head";

export default function DashBoardContentMissions() {
  const [userInfo, isLoggedIn] = useUser();

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
            <DashboardContainer>
              <DashboardEditorMissions />
            </DashboardContainer>
            <NewsletterSection />
            <Footer />
          </div>
        </div>
      </LayoutDashBoard>
    </>
  );
}
