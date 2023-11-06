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
import { MessageManager } from "@/components/_shared/UI/MessageManager";

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
  const [hasAddModel, setHasAddModel] = useState(false);

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
      {!isMobile &&
        <MessageManager 
          className='shrink ml-0 mr-auto'
        />
      }

        <IslandButton
          type="small-secondary"
          label="Ajouter un modèle"
          disabled={context.isAddModelPannelOpen}
          className="shrink-0"
          onClick={() => {
            if (!isMobile) {
              if (!context.panels?.find((p) => p.panel === AddModel)) {
                context.addPannel({
                  title: "Ajouter un modèle",
                  panel: <AddModel />,
                });

                context.setIsAddModelPannelOpen(true);
              }
            } else {
              context.setIsAddModelPannelOpen(true);
            }

            setHasAddModel(true);
          }}
        />
      </TopBar>

      <AddModelContextProvider>
        <div className="main_content mt-[50px] md:mt-0 md:col-[2_/_3] row-[2_/_4]">
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
          <NewsletterSection />
          <Footer />
        </div>
      </AddModelContextProvider>
    </>
  );
};
