import { useEffect, useRef, useState } from "react";
import store from "@/store/store";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import { gsap } from "gsap";
import { useLenis } from "@studio-freight/react-lenis";
import { SwitchTransition, Transition } from "react-transition-group";

import EYFLogo from "../../../public/icons/logo.svg";
import { Session } from "next-auth";
import { useDispatch } from "react-redux";
import { enableTransition } from "@/store/slices/transitionSlice";
import { closeMenu } from "@/store/slices/menuSlice";
import { CustomToaster } from "../_shared/UI/CustomToaster";

export const PageTransition = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) => {
  const router = useRouter();
  const lenis = useLenis();
  const dispatch = useDispatch()

  const transitionEl = useRef(null);
  const ctx = useRef<any>();

  useEffect(() => {
    ctx.current = gsap.context((self) => {
      gsap.set(transitionEl.current, {
        yPercent: 120,
        rotationX: 30,
      });
    });

    return () => {
      ctx.current.revert();
    };
  }, []);

  useEffect(() => {
    router.events.on('routeChangeComplete', () => {
      dispatch(enableTransition())
    })
  }, [])

  const onLeave = () => {
    lenis.stop();

    if(store.getState().menu.isOpen) dispatch(closeMenu())

    const inTl = gsap.timeline();

    inTl.set(transitionEl.current, {
      transformOrigin: "bottom",
    });

    inTl.fromTo(
      transitionEl.current,
      {
        rotationX: 50,
      },
      {
        rotationX: 0,
        duration: 0.6,
        ease: "power2.out",
      },
      0
    );

    inTl.fromTo(
      transitionEl.current,
      {
        yPercent: 100,
      },
      {
        yPercent: 0,
        duration: 0.8,
        ease: "power2.out",
      },
      0
    );
  };

  const onEnter = () => {
    const outTl = gsap.timeline({
      delay: 0.2,
      onStart: () => {
        lenis.scrollTo(0, { immediate: true, force: true });
        lenis.start();
      },
    });

    outTl.set(transitionEl.current, {
      transformOrigin: "top",
    });

    outTl.to(transitionEl.current, {
      yPercent: -110,
      duration: 0.5,
      ease: "power2.in",
    });  
  };

  return (
    <>
      <SwitchTransition>
        <Transition
          key={router.asPath}
          timeout={1000}
          onExit={() => {store.getState().transition.enabled && onLeave()}}
          onEnter={() => {store.getState().transition.enabled && onEnter()}}
        >
          <Component {...pageProps} />
        </Transition>
      </SwitchTransition>

      <div className="fixed h-full top-0 pt-[10px] pl-[10px] md:left-0 md:pl-[343px] xl:pl-[426px] w-full flex justify-center z-popup pointer-events-none">
        <CustomToaster />
      </div>

      {/* Transition Mask Element */}
      <div className="fixed w-full h-full top-0 left-0 perspective z-transition pointer-events-none">
        <div
          ref={transitionEl}
          className="fixed w-full h-full flex justify-center items-center origin-center border-05 bg-black"
        >
          <EYFLogo className="z-10 w-[70px] h-[70px]" />

          <div className="absolute w-full h-full bottom-0 z-0 overflow-hidden">
            <div className="absolute w-[2000px] h-[500px] -left-96 bottom-0 opacity-[0.9] translate-y-[75%] bg-top-section"></div>
            <div className="absolute w-[1500px] h-[500px] -right-96 bottom-0 translate-y-[50%] bg-top-section-2"></div>
          </div>
        </div>
      </div>
    </>
  );
};
