import { DashboardContainer } from "@/components/dashboard/shared/DashboardContainer";
import { DashboardEditorSchedule } from "@/components/dashboard/editor/DashboardEditorSchedule";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { SideBar } from "@/components/dashboard/shared/SideBar";
import Footer from "@/components/_shared/Footer";
import LayoutDashBoard from "@/components/layouts/LayoutDashBoard";
import Head from "next/head";
import { useContext } from "react";
import { AuthContext } from "@/context/authContext";
import { FooterDashboard } from "@/components/dashboard/shared/FooterDashBoard";
import { GradientCard } from "@/components/dashboard/shared/GradientCard";

export default function DashBoardContentSchedule() {
  const authContext = useContext(AuthContext);
  return (
    <>
      <Head>
        <title>EditYour.Film</title>
        <meta name="description" content="" />
      </Head>

      <LayoutDashBoard>
        {authContext.user.user.role && (
          <div className="dashboard-content flex flex-col lg:flex-row justify-between gap-14">
            <SideBar
              className="lg:basis-2/12 lg:w-2/12"
              type={authContext.user.user.role.name}
            />

            <div className="lg:basis-9/12 main_content">
              <DashboardContainer>
                <DashboardEditorSchedule />
              </DashboardContainer>
              <GradientCard
                title="Merci à tous"
                content={<><p>C'est grâce à votre engagement sur la plateforme que nous pouvons travailler tous ensemble à créer l'outil le plus adapté à nos besoins. Nous travaillons constamment sur des nouveautés passionnantes, et nous vous tiendrons vite au courant des évolutions à venir.</p><br/><p>Merci à vous, 
                L'équipe d'editYour.film 📹</p></>}
              />
              <FooterDashboard />
            </div>
          </div>
        )}
      </LayoutDashBoard>
    </>
  );
}
