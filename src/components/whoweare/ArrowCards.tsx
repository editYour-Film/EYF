import { createRef, useEffect, useRef } from "react";
import { Title } from "../_shared/Title";
import { useInView } from "react-intersection-observer";
import Arrow from "@/icons/right-arrow-violet.svg";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import useMediaQuery from "@/hooks/useMediaQuery";
import Image from "next/image";
import Container from "../_shared/UI/Container";

type ArrowCardsProps = {
  data: any;
};

export const ArrowCards = ({ data }: ArrowCardsProps) => {
  const { ref: section, inView } = useInView({
    triggerOnce: true,
  });

  const arrow = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(arrow.current, {
        rotate: 0,
      });

      const arrowTl = gsap.timeline({
        paused: true,
        defaults: {
          ease: "power2.inOut",
        },
      });

      arrowTl.fromTo(
        arrow.current,
        {
          rotate: 0,
          y: 0,
        },
        {
          rotate: 180,
          y: 50,
        },
        0
      );

      ScrollTrigger.create({
        trigger: arrow.current,
        start: "top-=150 bottom-=150",
        end: "bottom+=150 center",
        id: "arrow",
        onUpdate: (self) => {
          arrowTl.progress(self.progress);
        },
      });
    });

    return () => {
      ctx.revert();
    };
  }, [inView, data]);

  return (
    <div ref={section} className="arrow-cards mb-32">
      <Container>
        <div
          ref={arrow}
          className="arrow-cards__arrow flex justify-center items-center rounded-full border w-[92px] h-[92px] mx-auto border-soyMilk border-opacity-70"
        >
          <Arrow className="rotate-[-90deg]" />
        </div>
      </Container>
    </div>
  );
};
