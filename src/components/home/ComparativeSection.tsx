import { useInView } from "react-intersection-observer";
import Cross from "@/icons/comparison-cross.svg";
import Check from "@/icons/comparison-check.svg";
import { RefObject, createRef, forwardRef, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import useMediaQuery from "@/hooks/useMediaQuery";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { map } from "@/utils/Math";
import { IslandButton } from "../_shared/buttons/IslandButton";
import routes from "@/routes";
import { useWindowSize } from "@uidotdev/usehooks";
import { ClassicContent } from "../_shared/UI/ClassicContent";

type ComparativeSectionProps = {
  data: any;
};

export const ComparativeSection = ({ data }: ComparativeSectionProps) => {  
  const section = useRef<HTMLDivElement>(null)
  const wrapper = useRef<HTMLDivElement>(null)
  const cardsWrapper = useRef<HTMLDivElement>(null)
  const cards = useRef<RefObject<HTMLDivElement>[]>(data.comparison_cards.map(() => createRef()))

  const [currentCard, setCurrentCard] = useState(0)

  const { ref: inViewSectionRef, inView } = useInView({
    triggerOnce: true,
    threshold: 0,
  });

  const ww = useWindowSize()
  const isMobile = useMediaQuery('(max-width:1024px)')

  useEffect(() => {
    inViewSectionRef(section.current)
  }, [])

  useEffect(() => {
    const tl = gsap.timeline()
    if(ww.width && ww.width <= 1024) {
      tl.to(cardsWrapper.current, {
        opacity: 0,
        duration: 0.2
      })
      tl.set([cards.current[0].current, cards.current[1].current], {
        x: -(cards.current[0].current!.offsetWidth + 64)* currentCard
      })
      tl.to(cardsWrapper.current, {
        opacity: 1,
        duration: 0.2
      })
    }

  }, [currentCard, ww])

  useEffect(() => {
    const amort = 50
    const offsetTop = (window.innerHeight - wrapper.current!.offsetHeight) / 2

    let tl:GSAPTimeline, st:globalThis.ScrollTrigger, st2:globalThis.ScrollTrigger
    
    if(ww.width && ww.width > 1024) {
      gsap.set([cards.current[0].current, cards.current[1].current], {
        x: 0
      })

      tl = gsap.timeline({
        paused: true
      })
  
      tl.fromTo(cardsWrapper.current, {
        y: 0
      },{
        y: (cards.current[0].current!.offsetHeight + 100 ) * -1, 
        ease: 'power2.inOut'
      })
  
      gsap.set(wrapper.current, {
        top: offsetTop,
        y: amort
      })
  
      st = ScrollTrigger.create({
        trigger: section.current,
        start: `top top`,
        end: `top+=${(section.current && wrapper.current) ? section.current.offsetHeight - wrapper.current?.offsetHeight - offsetTop : 0} top`,
        onUpdate: (self) => {        
          tl.progress(self.progress) 
        },
      });

      st2 = ScrollTrigger.create({
        trigger: section.current,
        start: `top-=${offsetTop} top`,
        end: `top+=${(section.current && wrapper.current) ? section.current.offsetHeight - wrapper.current?.offsetHeight - offsetTop : 0} top`,
        onUpdate: (self) => {
          let y
          if(self.progress < 0.15) {
            y = amort * map(0, 0.15, 1, 0, self.progress)
          } else if (self.progress > 0.85) {
            y = -amort * map(0.85, 1, 0, 1, self.progress)
          }
          
          gsap.set(wrapper.current, {
            y: y
          })
        },
      });
    }

    return () => {
      tl && tl.progress(0)
      st && st.kill()
      st2 && st2.kill()
      gsap.set(wrapper.current, {
        y: 0
      })
    }
  }, [inView, ww])


  return (
    <div
      ref={section}
      className={`relative comparative-section w-full lg:h-[200vh] ${
        inView ? " inView" : ""
      }`}
    >

      <div 
      ref={wrapper}
      className="lg:sticky lg:h-[90vh] flex flex-col lg:flex-row justify-center lg:px-dashboard-spacing-element-medium py-[64px] gap-dashboard-spacing-element-medium lg:gap-[128px] lg:border-03 rounded-dashboard-button-square-radius lg:bg-dashboard-background-content-area lg:shadow-large z-10 overflow-hidden">
        <div className="comparative-section__title sticky max-w-[450px] top-0 flex flex-col gap-6 px-dashboard-mention-padding-right-left lg:px-0">
          <ClassicContent 
            className="perspective"
            suptitle={data.classic_content.suptitle}
            title={data.classic_content.title}
            titleType="h2"
            titleClassName="text-title-medium"
            paragraph={data.classic_content.content}
            cta="Créer mon compte"
            ctaType="primary"
            ctaHref={routes.SIGNIN}
          />
        </div>

        <div className="shrink-0 basis-[50%] flex flex-col gap-dashboard-spacing-element-medium lg:block">
          <div 
            ref={cardsWrapper}
            className="comparative-section__cards relative w-full max-w-[100vw] flex flex-row lg:flex-col items-start lg:items-center justify-start gap-16 lg:gap-[100px] perspective z-10 bg-dashboard-background-content-area lg:bg-none overflow-hidden"
          >
            {data.comparison_cards &&
              data.comparison_cards.map((card: any, i: number) => {
                return (
                  <Card
                    ref={cards.current[i]}
                    key={card.id}
                    title={card.title}
                    supTitle={card.suptitle}
                    type={card.type}
                    details={card.text_list}
                    delay={i === 0 ? 0 : 50}
                  />
                );
              })}
          </div>
          
          {isMobile && 
            <div className="flex w-full gap-[13px]">
              <IslandButton 
                type="tertiary"
                label="Vos difficultés"
                onClick={() => {
                  setCurrentCard(0)
                }}
                disabled={currentCard === 0}
                className="basis-5/12"
              />
              <IslandButton 
                type="tertiary"
                label="Notre solution"
                onClick={() => {
                  setCurrentCard(1)
                }}
                disabled={currentCard === 1}
                className="basis-7/12"
              />
            </div>
          }
        </div>

      </div>

      <div className="relative w-full overflow-hidden">
        <div className="bg-signin absolute w-[1200px] h-[600px] top-0 right-0 translate-x-1/2 opacity-20 pointer-events-none z-0"></div>
      </div>
    </div>
  );
};

type CardProps = {
  title: string,
  supTitle: string,
  type: 'pro' | 'cons',
  details?: [{id:number, entry: string}],
  delay: number
}

const Card = forwardRef<HTMLDivElement, CardProps>(function Card({type, details, title, supTitle}, ref) {  
  const chart = useRef<HTMLDivElement>(null)
  const linesH = "150";

  const { ref: inViewChartRef, inView: inViewChart } = useInView({
    triggerOnce: true,
    threshold: 0,
  });

  useEffect(() => {
    inViewChartRef(chart.current);
  }, [inViewChartRef]);

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
      ref={ref}
      className="comparative-card relative shrink-0 w-full basis-full lg:bg-dashboard-button-dark p-10 pb-0 rounded-dashboard-button-square-radius lg:border-03 shadow-large lg:max-w-[430px] z-20"
    >
      <div className="comparative-card__inner h-full relative z-20 flex flex-col items-center">
        {supTitle && (
          <div className="comparative-card__title text-title-small text-dashboard-text-description-base-low text-center leading-none mb-dashboard-button-separation-spacing">
            {supTitle}
          </div>
        )}

        {title && (
          <div className="comparative-card__title text-title-medium text-dashboard-text-description-base text-center">
            {title}
          </div>
        )}

        <div className="comparative-card__details flex flex-col gap-padding-medium lg:gap-10 mt-dashboard-spacing-element-medium">
          {details &&
            details.map((detail, i) => {
              return (
                <div
                  key={i}
                  className="comparative-detail flex flex-row lg:flex-col gap-3 items-center"
                >
                  <div className="shrink-0">
                    {type === "cons" ? <Cross /> : <Check />}
                  </div>
                  <div className="lg:text-center text-dashboard-text-description-base text-medium">{detail.entry}</div>
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
        </div>
      </div>
      <div className="absolute gradient-to-top-black-transparent w-full h-[20%] bottom-0 left-0 z-20"></div>
    </div>
  )}
) 
