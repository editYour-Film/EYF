import { DashboardContainer } from "@/components/dashboard/shared/DashboardContainer";
import { DashboardEditorHome } from "@/components/dashboard/editor/DashboardEditorHome";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { SideBar } from "@/components/dashboard/shared/SideBar";
import Footer from "@/components/_shared/Footer";
import LayoutDashBoard from "@/components/layouts/LayoutDashBoard";
import { useUser } from "@/auth/authContext";
import Head from "next/head";

export default function DashBoardContentHome() {
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
              className="lg:basis-3/12 lg:w-3/12"
              type={userInfo.user.role.name}
            />
          )}
          <div className="lg:basis-9/12 main_content">
            <DashboardContainer>
              <DashboardEditorHome />
            </DashboardContainer>
            <NewsletterSection />
            <Footer />
          </div>
        </div>
      </LayoutDashBoard>
    </>
  );
}
