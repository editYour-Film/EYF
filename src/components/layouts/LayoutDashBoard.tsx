import { useEffect } from "react";
import "react-multi-carousel/lib/styles.css";
import { Lenis, useLenis } from "@studio-freight/react-lenis";
import Router from "next/router";
import { getTokenFromLocalCookie } from "@/auth/auth";
import routes from "@/routes";
import { useUser } from "@/auth/authContext";
import { useDispatch } from "react-redux";
import { disableCustomCursor } from "@/store/slices/cursorSlice";
import { DashBoardContextProvider } from "../dashboard/_context/DashBoardContext";
import { EditorContextProvider } from "../dashboard/editor/_context/EditorContext";
import { SideBar } from "../dashboard/shared/SideBar";
import { useMediaQuery } from "@uidotdev/usehooks";
import { DashboardMenuMobile } from "../dashboard/shared/DashboardMenuMobile";
import { DASHBOARD_EDITOR_MENU } from "../dashboard/editor/data/menus";

type LayoutDashboardProps = {
  children: React.ReactNode;
  activeNavItem?: string;
  topSectionBackground?: boolean;
  quoteNavbar?: boolean;
};

const LayoutDashboard = ({ children }: LayoutDashboardProps) => {
  const lenis = useLenis();
  const [user, isLoggedIn] = useUser();
  
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(disableCustomCursor())
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

  useEffect(() => {
    if (!getTokenFromLocalCookie()) Router.push(routes.SIGNIN);
  }, []);

  return (
    <>
      {isLoggedIn && (
        <Lenis root>
          <div className="bg-black min-h-screen flex flex-col justify-between gap-10">
            <main className="md:pt-7">
              <div className="md:px-[30px] lg:px-[113px] md:mt-0 grid grid-dashboard relative z-20 ">
                <DashBoardContextProvider>
                  { user.user.role.name === 'editor'
                    ? 
                      <EditorContextProvider>
                        {children}

                        <SideBar
                          type={user.user.role.name}
                          className="md:col[1_/_2] row-[2_/_3]"
                        />

                        <DashboardMenuMobile 
                          menu={DASHBOARD_EDITOR_MENU} 
                        />
                        
                      </EditorContextProvider>
                    :
                      children
                  }
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
