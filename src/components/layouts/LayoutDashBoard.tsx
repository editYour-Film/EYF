import { useEffect } from "react";
import "react-multi-carousel/lib/styles.css";
import { Lenis, useLenis } from "@studio-freight/react-lenis";
import Router from "next/router";
import { getTokenFromLocalCookie } from "@/auth/auth";
import routes from "@/routes";
import { useUser } from "@/auth/authContext";

type LayoutDashboardProps = {
  children: React.ReactNode;
  activeNavItem?: string;
  topSectionBackground?: boolean;
  quoteNavbar?: boolean;
};
const LayoutDashboard = ({
  children,
  topSectionBackground,
}: LayoutDashboardProps) => {
  const lenis = useLenis();
  const [, isLoggedIn] = useUser();

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
    if (!getTokenFromLocalCookie()) Router.push(routes.SIGNIN_EMAIL);
  }, []);

  return (
    <>
      {isLoggedIn && (
        <Lenis root>
          <div className="bg-black min-h-screen flex flex-col justify-between gap-10">
            <main className="pt-5 lg:pt-11">
              <div className="lg:px-[113px] relative z-20 ">{children}</div>
            </main>
          </div>
        </Lenis>
      )}
    </>
  );
};

export default LayoutDashboard;
