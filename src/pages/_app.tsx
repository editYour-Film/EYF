import "@/styles/globals.css";
import "@/styles/strapi.css";
import "@/styles/animated-border.css";
import "@/styles/utils/splitText.scss";
import "@/styles/components/Footer.scss";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useEffect, useState } from "react";
import { Lenis, useLenis } from "@studio-freight/react-lenis";
import { Provider } from "react-redux";
import store from "@/store/store";

import type { AppProps } from "next/app";
import InstanciatedQueryClientProvider from "@/context/QueryClientProvider";
import { Cursor } from "@/components/_shared/UI/Cursor";
import { PageTransition } from "@/components/transition/PageTransition";
import useMediaQuery from "@/hooks/useMediaQuery";
import { Loader } from "@/components/_shared/Loader";
import { AuthProvider } from "@/context/authContext";

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
  const hasHover = useMediaQuery("(hover: hover)");
  const lenis = useLenis(ScrollTrigger.update);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    ScrollTrigger.refresh;
  }, [lenis]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  return (
    <Provider store={store}>
      <AuthProvider>
        <InstanciatedQueryClientProvider>
          <Loader isLoading={isLoading} />
          <Lenis root>
            <PageTransition {...pageProps} />
          </Lenis>
          {hasHover && <Cursor />}
        </InstanciatedQueryClientProvider>
      </AuthProvider>
    </Provider>
  );
}
