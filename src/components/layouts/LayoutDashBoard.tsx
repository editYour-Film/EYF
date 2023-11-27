import { useContext, useEffect } from "react";
import "react-multi-carousel/lib/styles.css";
import { Lenis, useLenis } from "@studio-freight/react-lenis";
import Router from "next/router";
import { getTokenFromLocalCookie } from "@/auth/auth";
import routes from "@/routes";
import { useDispatch, useSelector } from "react-redux";
import { disableCustomCursor } from "@/store/slices/cursorSlice";
import { SideBar } from "../dashboard/shared/SideBar";
import { DashboardMenuMobile } from "../dashboard/shared/DashboardMenuMobile";

import {
  DASHBOARD_EDITOR_MENU,
  DASHBOARD_CLIENT_MENU,
} from "../dashboard/editor/data/menus";

import { ButtonsWrapper } from "../dashboard/shared/ButtonsWrapper";
import { AuthContext } from "@/context/authContext";
import { closeDashboardMenu } from "@/store/slices/dashboardMenuSlice";
import { RootState } from "@/store/store";

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
  const isMenuOpen = useSelector((store : RootState) => store.dashboardMenu.isOpen)

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
    <div>
      {(authContext.isLoggedIn && authContext.user) &&
          <div className="relative overflow-clip md:overflow-visible bg-black min-h-screen flex flex-col justify-between gap-10">
            <main className="md:pt-7">
              <div className="md:px-[30px] xl:px-[113px] md:mt-0 grid grid-dashboard relative z-20 ">
                {children}

                <SideBar
                  type={authContext.user.user.role.name}
                  className="md:col[1_/_2] row-[2_/_3]"
                />

                {authContext.user.user.role.name === "editor" ? (
                  <DashboardMenuMobile menu={DASHBOARD_EDITOR_MENU} trigger={isMenuOpen} action={closeDashboardMenu} />
                ) : (
                  <DashboardMenuMobile menu={DASHBOARD_CLIENT_MENU} trigger={isMenuOpen} action={closeDashboardMenu} />
                )}

                <ButtonsWrapper />
              </div>
            </main>
          </div>
      }
    </div>
  );
};

export default LayoutDashboard;
