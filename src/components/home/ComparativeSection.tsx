import { H2 } from "../_shared/typography/H2";
import { useInView } from "react-intersection-observer";
import { Title } from "../_shared/Title";
import Cross from "@/icons/comparison-cross.svg";
import Check from "@/icons/comparison-check.svg";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import useMediaQuery from "@/hooks/useMediaQuery";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

type ComparativeSectionProps = {
  data: any;
};

export const ComparativeSection = ({ data }: ComparativeSectionProps) => {
  const { ref: section, inView } = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  return (
    <div
      ref={section}
      className={`relative comparative-section pt-44 w-full overflow-hidden ${
        inView ? " inView" : ""
      }`}
    >
      <div className="comparative-section__title flex flex-col items-center text-center px-4 mx-auto md:max-w-2xl">
        <H2 arrow fake>
          {data.classic_content.suptitle}
        </H2>
        <Title titleType="h1" anim className="mt-4 md:mt-6" fake>
          {data.classic_content.title}
        </Title>
        <p className="text-lg text-base-text">{data.classic_content.content}</p>
      </div>

      <div className="comparative-section__cards relative flex flex-col md:flex-row items-center md:items-stretch w-full justify-center gap-16 md:gap-8 lg:gap-16 mt-40 perspective z-10">
        {data.comparison_cards &&
          data.comparison_cards.map((card: any, i: number) => {
            return (
              <Card
                key={card.id}
                title={card.title}
                subTitle={card.subTitle}
                type={card.type}
                details={card.text_list}
                delay={i === 0 ? 0 : 50}
              />
            );
          })}
      </div>

      <div className="bg-signin absolute w-[1200px] h-[600px] top-0 right-0 translate-x-1/2 opacity-20 z-0 pointer-events-none"></div>
    </div>
  );
};

type CardProps = {
  title: string,
  subTitle: string,
  type: 'pro' | 'cons',
  details?: [{id:number, entry: string}],
  delay: number
}

const Card = ({type, details, title, subTitle, delay}:CardProps) => {  
  const chart = useRef<HTMLDivElement>(null)
  const card = useRef<HTMLDivElement>(null)

  const linesH = "150";
  const isMobile = useMediaQuery("(max-width: 768px)");

  const { ref: inViewCard, inView } = useInView({
    triggerOnce: true,
  });

  const { ref: inViewChartRef, inView: inViewChart } = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  useEffect(() => {
    inViewChartRef(chart.current);
    inViewCard(card.current);
  }, [inViewChartRef, inViewCard]);

  useEffect(() => {
    if (isMobile) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        paused: true,
        defaults: {
          ease: "power2.out",
        },
      });

      tl.fromTo(
        card.current!,
        {
          rotateX: "10deg",
          y: 50 + delay,
        },
        {
          rotateX: "0deg",
          y: 0,
        },
        0
      );

      const trigger1 = ScrollTrigger.create({
        trigger: card.current,
        start: `top+=${delay} bottom`,
        end: `top+=${300} center`,
        id: "comparativeCard",
        onUpdate: (self) => {
          tl.progress(self.progress);
        },
      });
    });

    return () => {
      ctx.revert();
    };
  }, [inView]);

  useEffect(() => {
    const step = 20;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        paused: true,
      });
      const lines = chart.current?.querySelectorAll(".comparative-line");

      lines?.forEach((line, i) => {
        tl.fromTo(
          line,
          {
            yPercent: 120,
          },
          {
            yPercent:
              type === "cons" ? 100 - (20 + step) : 100 - (20 + step * (i + 1)),
            ease: "power2.out",
            duration: 0.8,
          },
          i * 0.2
        );
      });

      if (inViewChart) {
        tl.play();
      }
    });

    return () => {
      ctx.revert();
    };
  }, [inViewChart]);

  return (
    <div
      ref={card}
      className="comparative-card relative bg-cards p-10 pb-0 rounded-3xl basis-[45%] max-w-[430px] z-20"
    >
      <div className="comparative-card__inner h-full relative z-20 flex flex-col items-center">
        {title && (
          <div className="comparative-card__title text-base-lg font-medium text-violet text-center">
            {title}
          </div>
        )}
        {subTitle && (
          <div className="comparative-card__subTitle n27  text-sm text-ebebeb text-opacity-80 text-center">
            {subTitle}
          </div>
        )}

        <div className="comparative-card__details flex flex-col gap-10 mt-10">
          {details &&
            details.map((detail, i) => {
              return (
                <div
                  key={i}
                  className="comparative-detail flex gap-3 items-center"
                >
                  <div className="shrink-0">
                    {type === "cons" ? <Cross /> : <Check />}
                  </div>
                  <div className="text-base-text text-base">{detail.entry}</div>
                </div>
              );
            })}
        </div>

        <div
          ref={chart}
          className={`comparative-chart relative flex flex-row mt-auto mb-0 w-full gap-5 px-5 z-20 h-[${linesH}px] overflow-hidden`}
        >
          <div
            className={`comparative-line gradient-chart basis-1/3 h-full rounded-xl`}
          ></div>
          <div
            className={`comparative-line gradient-chart basis-1/3 h-full rounded-xl`}
          ></div>
          <div
            className={`comparative-line gradient-chart basis-1/3 h-full rounded-xl`}
          ></div>
          <div className="absolute gradient-to-top-black-transparent w-full h-[60%] bottom-0 left-0 z-10"></div>
        </div>
      </div>
    </div>
  );
};
