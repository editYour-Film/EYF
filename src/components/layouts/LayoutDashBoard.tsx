import { useContext, useEffect } from "react";
import "react-multi-carousel/lib/styles.css";
import { Lenis, useLenis } from "@studio-freight/react-lenis";
import Router from "next/router";
import { getTokenFromLocalCookie } from "@/auth/auth";
import routes from "@/routes";
import { useDispatch } from "react-redux";
import { disableCustomCursor } from "@/store/slices/cursorSlice";
import { DashBoardContextProvider } from "../dashboard/_context/DashBoardContext";
import { EditorContextProvider } from "../dashboard/editor/_context/EditorContext";
import { SideBar } from "../dashboard/shared/SideBar";
import { DashboardMenuMobile } from "../dashboard/shared/DashboardMenuMobile";

import { DASHBOARD_EDITOR_MENU, DASHBOARD_CLIENT_MENU } from "../dashboard/editor/data/menus";

import { ButtonsWrapper } from "../dashboard/shared/ButtonsWrapper";
import { AuthContext } from "@/context/authContext";
import { ClientContextProvider } from "../dashboard/client/_context/DashboardClientContext";

type LayoutDashboardProps = {
  children: React.ReactNode;
  activeNavItem?: string;
  topSectionBackground?: boolean;
  quoteNavbar?: boolean;
};

const LayoutDashboard = ({ children }: LayoutDashboardProps) => {
  const lenis = useLenis();
  const authContext = useContext(AuthContext);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(disableCustomCursor());
  }, []);

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

  useEffect(() => {
    if (!getTokenFromLocalCookie()) Router.push(routes.SIGNIN);
  }, []);

  return (
    <>
      {authContext.isLoggedIn && authContext.user && !authContext.isLoading && (
        <Lenis root>
          <div className="relative overflow-hidden md:overflow-visible bg-black min-h-screen flex flex-col justify-between gap-10">
            <main className="md:pt-7">
              <div className="md:px-[30px] xl:px-[113px] md:mt-0 grid grid-dashboard relative z-20 ">
                <DashBoardContextProvider>
                  {authContext.user.user.role.name === "editor" ? (
                    <EditorContextProvider>
                      {children}

                      <SideBar
                        type={authContext.user.user.role.name}
                        className="md:col[1_/_2] row-[2_/_3]"
                      />

                      <DashboardMenuMobile menu={DASHBOARD_EDITOR_MENU} />
                    </EditorContextProvider>
                  ) : (
                    <ClientContextProvider>
                      {children}

                      <SideBar
                        type={authContext.user.user.role.name}
                        className="md:col[1_/_2] row-[2_/_3]"
                      />

                      <DashboardMenuMobile menu={DASHBOARD_CLIENT_MENU} />
                    </ClientContextProvider>
                  )}

                  <ButtonsWrapper />
                </DashBoardContextProvider>
              </div>
            </main>
          </div>
        </Lenis>
      )}
    </>
  );
};

export default LayoutDashboard;
