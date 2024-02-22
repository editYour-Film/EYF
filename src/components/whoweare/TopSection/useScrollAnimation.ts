import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { RefObject } from "react";

export const useScrollAnimation = (el: RefObject<HTMLDivElement>) => {
  const { contextSafe } = useGSAP(() => {
    const tl = gsap.timeline({
      paused: true,
    })

    tl.to('.top-section__text', {
      opacity: 0.2,
    }, 0)

    tl.to('.top-section__text', {
      scale: 0.90,
      y: -40,
    }, 0)

    tl.to('.top-section__stars', {
      scale: 1.1,
      ease: 'power.in'
    }, 0)

    const trigger = new ScrollTrigger({
      start: 'top top',
      end: `top+=${el.current!.offsetHeight} top`,
      markers: false,
      id: 'notre-histoire',
      onUpdate: (self) => {
        tl.progress(self.progress)
      },
    })
  }, {scope: el});
}