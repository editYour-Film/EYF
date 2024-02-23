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

        <div className="mt-[238px]">
          <div className="arrow-cards__img relative h-0 pb-[70%] rounded-dashboard-button-separation-spacing overflow-hidden">
            <Image
              src={data.img.data.attributes.url}
              alt={data.img.alternativeText}
              fill
              className="object-cover"
              sizes="(max-width: 1280px) 100vw, 63vw"
            />
          </div>

          <div
            className={`flex flex-col lg:flex-row gap-4 lg:gap-16 px-4 mt-16 ${
              inView && "inView"
            }`}
          >
            <Title
              titleType="none"
              fake
              anim
              className="basis-[40%] text-title-medium leading-[110%]"
            >
              {data.title}
            </Title>

            <div className="basis-[60%] text-base text-dashboard-text-description-base">
              {data.content}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
