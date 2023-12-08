import { DashboardContainer } from "@/components/dashboard/shared/DashboardContainer";
import LayoutDashBoard from "@/components/layouts/LayoutDashBoard";
import Head from "next/head";
import { PropsWithChildren, useContext, useEffect } from "react";
import { DashBoardContext } from "@/components/dashboard/_context/DashBoardContext";
import { IslandButton } from "@/components/_shared/buttons/IslandButton";
import { TopBar } from "@/components/dashboard/shared/TopBar";
import { NotificationCenter } from "@/components/dashboard/shared/NotificationCenter";
import { AddModelContextProvider } from "@/components/dashboard/editor/_context/AddModelContext";
import { FooterDashboard } from "@/components/dashboard/shared/FooterDashBoard";
import { GradientCard } from "@/components/dashboard/shared/GradientCard";
import { GlobalContext } from "@/components/_context/GlobalContext";
import { DashboardCreatorHome } from "@/components/dashboard/creator/DashboardCreatorHome";
import { ModifyVideoPanel } from "@/components/dashboard/editor/ModifyVideoPanel";
import { ClientContext } from "@/components/dashboard/client/_context/DashboardClientContext";

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
  const clientContext = useContext(ClientContext);
  const globalContext = useContext(GlobalContext);

  useEffect(() => {
    context.setPanels([
      {
        title: "Accueil - Modèles",
        panel: <DashboardCreatorHome />,
      },
    ]);
  }, []);

  return (<>
    <TopBar
      className=""
    >
      <IslandButton
        type="small-secondary"
        label="Obtenir un devis"
        disabled={context.isAddModelPannelOpen}
        className="shrink-0"
        onClick={() => {
          // push to quote
        }}
      />
    </TopBar>

    <AddModelContextProvider>
      <div className="main_content mt-[50px] md:mt-0 md:col-[2_/_3] row-[2_/_4]">
        <div className="flex flex-col">
          <NotificationCenter className="relative z-0" />

          <DashboardContainer className="relative z-10" />
        </div>

        <GradientCard 
          title='PARRAINER UN AMI'
          content='Bénéficiez d’avantages exclusifs en rejoignant la communauté des parrains editYour.Film dès aujourd’hui.'
          hasCta 
          type="email"
          placeholder="Email" 
          ctaLabel="Envoyer le lien de parrainage"
          onClick={(email: string) => { globalContext.sendSponsorLink(email)}}
          className="mt-dashboard-spacing-element-medium lg:mt-[70px]"
        />

        <FooterDashboard />
      </div>

      <ModifyVideoPanel context={clientContext} type="creator" />
      
    </AddModelContextProvider>
  </>
  );
};
