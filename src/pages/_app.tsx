import "@/styles/globals.css";
import "@/styles/strapi.css";
import "@/styles/animated-border.css";
import "@/styles/utils/splitText.scss";
import "@/styles/components/Footer.scss";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useContext, useEffect, useState } from "react";
import { Lenis, useLenis } from "@studio-freight/react-lenis";
import { Provider } from "react-redux";
import store from "@/store/store";

import type { AppProps } from "next/app";
import InstanciatedQueryClientProvider from "@/context/QueryClientProvider";
import { Cursor } from "@/components/_shared/UI/Cursor";
import { PageTransition } from "@/components/transition/PageTransition";
import useMediaQuery from "@/hooks/useMediaQuery";
import { Loader } from "@/components/_shared/Loader";
import { AuthContext, AuthProvider } from "@/context/authContext";
import { DashBoardContextProvider } from "@/components/dashboard/_context/DashBoardContext";
import { EditorContextProvider } from "@/components/dashboard/editor/_context/EditorContext";
import { ClientContextProvider } from "@/components/dashboard/client/_context/DashboardClientContext";
import { GlobalContextProvider } from "@/components/_context/GlobalContext";

if (typeof window !== "undefined") {
  gsap.defaults({ ease: "none" });
  gsap.registerPlugin(ScrollTrigger);

  // merge rafs
  gsap.ticker.lagSmoothing(0);

  // reset scroll position
  window.scrollTo(0, 0);
  window.history.scrollRestoration = "manual";
}

export default function App(pageProps: AppProps) {
  const lenis = useLenis(ScrollTrigger.update);

  useEffect(() => {
    ScrollTrigger.refresh;
  }, [lenis]);

  return (
    <Provider store={store}>
      <AuthProvider>
        <GlobalContextProvider>
          <InstanciatedQueryClientProvider>
            <Content pageProps={pageProps} />
          </InstanciatedQueryClientProvider>
        </GlobalContextProvider>
      </AuthProvider>
    </Provider>
  );
}

type contentProps = {
  pageProps: AppProps;
};

const Content = ({ pageProps }: contentProps) => {
  const hasHover = useMediaQuery("(hover: hover)");
  const [isLoading, setIsLoading] = useState(true);

  const authContext = useContext(AuthContext);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  const mainContent = (
    <>
      <Loader isLoading={isLoading} />
      <Lenis root>
        <PageTransition {...pageProps} />
      </Lenis>
      {hasHover && <Cursor />}
    </>
  );

  if (authContext.isLoggedIn && authContext.user) {
    return (
      <>
        <DashBoardContextProvider>
          {authContext.user.user.role.name === "editor" ? (
            <EditorContextProvider>{mainContent}</EditorContextProvider>
          ) : (
            <ClientContextProvider>{mainContent}</ClientContextProvider>
          )}
        </DashBoardContextProvider>
      </>
    );
  } else {
    return <>{mainContent}</>;
  }
};
