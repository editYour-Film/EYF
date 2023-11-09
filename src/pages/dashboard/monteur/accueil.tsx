import { DashboardContainer } from "@/components/dashboard/shared/DashboardContainer";
import { DashboardEditorHome } from "@/components/dashboard/editor/DashboardEditorHome";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import Footer from "@/components/_shared/Footer";
import LayoutDashBoard from "@/components/layouts/LayoutDashBoard";
import Head from "next/head";
import { PropsWithChildren, useContext, useEffect, useState } from "react";
import { DashBoardContext } from "@/components/dashboard/_context/DashBoardContext";
import { AddModel } from "@/components/dashboard/editor/AddModel";
import { IslandButton } from "@/components/_shared/buttons/IslandButton";
import { TopBar } from "@/components/dashboard/shared/TopBar";
import { NotificationCenter } from "@/components/dashboard/shared/NotificationCenter";
import { useMediaQuery } from "@uidotdev/usehooks";
import { AddModelContextProvider } from "@/components/dashboard/editor/_context/AddModelContext";
import { GradientCard } from "@/components/dashboard/shared/GradientCard";
import { FooterDashboard } from "@/components/dashboard/shared/FooterDashBoard";
import { EditorContext } from "@/components/dashboard/editor/_context/EditorContext";
import {toast} from 'react-hot-toast'
import Clock from '@/icons/Clock.svg'

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

const DashBoardPageHome = ({ children }: PropsWithChildren) => {
  const context = useContext(DashBoardContext);
  const editorContext = useContext(EditorContext);

  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    context.setPanels([
      {
        title: "Accueil - Modèles",
        panel: <DashboardEditorHome />,
      },
    ]);
  }, []);

  return (<>
    <TopBar
      className=""
    >
        <IslandButton
          type="small-secondary"
          label="Ajouter un modèle"
          disabled={context.isAddModelPannelOpen}
          className="shrink-0"
          onClick={() => {
            editorContext.startAddModel()
          }}
        />
      </TopBar>

      <AddModelContextProvider>
        <div 
          className="main_content mt-[50px] md:mt-0 md:col-[2_/_3] row-[2_/_4]"
        >
          <div className="flex flex-col">
            <NotificationCenter className="relative z-0" />

            <DashboardContainer className="relative z-10" />

            {isMobile && (
              <>
                <div
                  data-lenis-prevent
                  className={`fixed top-0 left-0 w-full h-screen bg-dashboard-button-dark z-panels overflow-scroll transition-transform duration-500  ${
                    context.isAddModelPannelOpen
                      ? "ease-out translate-x-0"
                      : "translate-x-full pointer-events-none ease-in"
                  }`}
                >
                  <AddModel />
                </div>
              </>
            )}
          </div>

          <div className="flex flex-col mt-[60px] gap-dashboard-spacing-element-medium">
            <GradientCard 
              title='PARRAINER UN AMI'
              content='Bénéficiez d’avantages exclusifs en rejoignant la communauté des parrains editYour.Film dès aujourd’hui.'
              hasCta 
              type="email"
              placeholder="Email" 
              ctaLabel="Envoyer le lien de parrainage"
              onClick={(email: string) => { context.sendSponsorLink(email)}}
            />
            <FooterDashboard />
          </div>

        </div>
      </AddModelContextProvider>
    </>
  );
};
