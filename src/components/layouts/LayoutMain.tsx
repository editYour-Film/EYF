import { useEffect } from "react";
import Footer from "../_shared/Footer";
import Header from "../_shared/Header";
import "react-multi-carousel/lib/styles.css";
import HeaderQuote from "../_shared/HeaderQuote";
import { useLenis } from "@studio-freight/react-lenis";
import Router from "next/router";
import { JoinBeta } from "@/components/_shared/JoinBeta";
import { useSelector, useDispatch } from 'react-redux'
import {RootState} from "@/store/store"
import { setJoinBetaInvisible } from "@/store/slices/joinBetaSlice";
import { enableCustomCursor } from "@/store/slices/cursorSlice";
import { DashboardMenuMobile } from "../dashboard/shared/DashboardMenuMobile";
import { LANDING_MENU } from "../dashboard/editor/data/menus";
import { closeMenu } from "@/store/slices/menuSlice";
import { IslandButton } from "../_shared/buttons/IslandButton";

type LayoutMainProps = {
  children: React.ReactNode;
  activeNavItem?: string;
  topSectionBackground?: boolean;
  quoteNavbar?: boolean;
};
const LayoutMain = ({
  children,
  activeNavItem = "",
  quoteNavbar,
  topSectionBackground,
}: LayoutMainProps) => {

  const lenis = useLenis();
  
  const joinBetaState = useSelector((state: RootState) => state.joinBeta.isVisible)
  const dispatch = useDispatch()

  const isMenuOpen = useSelector((store: RootState) => store.menu.isOpen)

  useEffect(() => {
    dispatch(enableCustomCursor())
  }, [])

  useEffect(() => {
    function onHashChangeStart(url: string) {
      url = "#" + url.split("#").pop();
      lenis.scrollTo(url);
    }

    Router.events.on("hashChangeStart", onHashChangeStart);

    return () => {
      Router.events.off("hashChangeStart", onHashChangeStart);
    };
  }, [lenis]);

  return (
    <>
        <div className="bg-black min-h-screen flex flex-col justify-between gap-10 no-cursor w-full overflow-clip">
          {quoteNavbar ? (
            <HeaderQuote step={2} />
          ) : (
            <Header activeNavItem={activeNavItem} />
          )}

          <JoinBeta 
            isVisible={joinBetaState}
            onClose={() => {dispatch(setJoinBetaInvisible())}}
          />

          <main className="md:pt-navbar-h">
            {topSectionBackground && (
              <>
                <div className="top-section-bg1"></div>
                <div className="top-section-bg2 -top-10 sm:top-24"></div>
              </>
            )}
            <div className="flex flex-col gap-8 md:gap-11 relative z-20 ">
              {children}
            </div>
          </main>

          <DashboardMenuMobile menu={LANDING_MENU} trigger={isMenuOpen} action={closeMenu}>
            <IslandButton
              type="primary"
              label="Obtenir mon devis"
              onClick={() => {}}
            />
          </DashboardMenuMobile>

          <Footer />
        </div>
    </>
  );
};

export default LayoutMain;
