import Image from "next/image";
import { EditorJsParser } from "@/utils/EditorJsParser";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useLenis } from "@studio-freight/react-lenis";
import useMediaQuery from "@/hooks/useMediaQuery";
import { TextSplit } from "@/utils/TextSplit";
import Bubble from "@/img/whoweare/Bubble.svg";
import Container from "../_shared/UI/Container";

export const HistorySection = ({ data }: any) => {
  const p1 = useRef<HTMLDivElement>(null);
  const p2 = useRef<HTMLDivElement>(null);
  const p3 = useRef<HTMLDivElement>(null);
  const p4 = useRef<HTMLDivElement>(null);

  const scrollParent = useRef(null);
  const scrollContent = useRef(null);

  const line1 = useRef<HTMLDivElement>(null);
  const line2 = useRef<HTMLDivElement>(null);
  const line3 = useRef<HTMLDivElement>(null);

  const [p2Readed, setP2Readed] = useState(false);
  const [p3Readed, setP3Readed] = useState(false);
  const [p4Readed, setP4Readed] = useState(false);

  const ctx = useRef<gsap.Context>();
  const isTweening = useRef(false);

  const step1 = useRef(0);
  const step2 = useRef(0);
  const step3 = useRef(0);
  const step4 = useRef(0);

  const lenis = useLenis();

  const isMobile = useMediaQuery("(max-width: 767px)");
  const isFullHd = useMediaQuery("(min-width: 1919px)");

  const bubble = useRef<HTMLDivElement>(null);
  const bubbleSvg = useRef<HTMLDivElement>(null);
  const bubbleText = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isMobile) return;
    ctx.current = gsap.context((self) => {
      const defaults = {
        ease: "power2.inOut",
        duration: 1,
      };

      self.add("firstDate", () => {
        const tl = gsap.timeline({
          defaults,
          onStart: () => {
            isTweening.current = true;
          },
          onComplete: () => {
            isTweening.current = false;
          },
        });

        tl.to(
          [p2.current, p3.current, p4.current],
          {
            opacity: 0.5,
            y: 300,
          },
          0
        );

        setP2Readed(false);
        setP3Readed(false);
        setP4Readed(false);

        tl.to(
          line1.current,
          {
            height: 80,
          },
          0
        );

        tl.to(
          [line2.current, line3.current],
          {
            height: 0,
          },
          0
        );
      });

      self.add("secondDate", () => {
        const tl = gsap.timeline({
          defaults,
          onStart: () => {
            isTweening.current = true;
          },
          onComplete: () => {
            isTweening.current = false;
          },
        });

        tl.to(
          [p2.current],
          {
            opacity: 1,
            y: 0,
          },
          0
        );

        tl.to(
          [p3.current],
          {
            opacity: 0.5,
            y: 300,
          },
          0
        );

        setP2Readed(true);
        setP3Readed(false);
        setP4Readed(false);

        tl.to(
          line1.current,
          {
            height: 20,
          },
          0
        );

        tl.to(
          line3.current,
          {
            height: 0,
          },
          0
        );

        tl.to(
          line2.current,
          {
            height: 80,
          },
          0
        );
      });

      self.add("thirdDate", () => {
        const tl = gsap.timeline({
          defaults,
          onStart: () => {
            isTweening.current = true;
          },
          onComplete: () => {
            isTweening.current = false;
          },
        });

        tl.to(
          [p3.current],
          {
            opacity: 1,
            y: 0,
          },
          0
        );

        tl.to(
          [p4.current],
          {
            opacity: 0.5,
            y: 300,
          },
          0
        );

        setP3Readed(true);
        setP4Readed(false);

        tl.to(
          line2.current,
          {
            height: 20,
          },
          0
        );

        tl.to(
          line3.current,
          {
            height: 80,
          },
          0
        );
      });

      self.add("fourthDate", () => {
        const tl = gsap.timeline({
          defaults,
          onStart: () => {
            isTweening.current = true;
          },
          onComplete: () => {
            isTweening.current = false;
          },
        });

        tl.to(
          [p4.current],
          {
            opacity: 1,
            y: 0,
          },
          0
        );

        setP4Readed(true);

        tl.to(
          line3.current,
          {
            height: 20,
          },
          0
        );
      });

      const offset1 = window.innerHeight * 0.15;
      const offset2 = window.innerHeight * 0.15;
      const offset3 = window.innerHeight * 0.15;

      let trigger1: ScrollTrigger;
      let trigger2: ScrollTrigger;
      let trigger3: ScrollTrigger;

      if (p1.current) {
        trigger1 = ScrollTrigger.create({
          trigger: scrollParent.current,
          start: `top+=${window.innerHeight / 2 - offset2} center`,
          end: `top+=${p1.current?.offsetTop + offset1 + offset2} center`,
          id: "step1",
          onEnter: () => {
            ctx.current?.firstDate();
          },
          onEnterBack: () => {
            ctx.current?.firstDate();
          },
          onLeave: () => {
            ctx.current?.secondDate();
          },
        });

        trigger2 = ScrollTrigger.create({
          trigger: scrollParent.current,
          start: `top+=${p1.current?.offsetTop + offset1 + offset2} center`,
          end: `top+=${
            p1.current?.offsetTop + offset1 + offset2 + offset3
          } center`,
          id: "step2",
          onEnterBack: () => {
            ctx.current?.secondDate();
          },
          onLeave: () => {
            ctx.current?.thirdDate();
          },
        });

        trigger3 = ScrollTrigger.create({
          trigger: scrollParent.current,
          start: `top+=${
            p1.current?.offsetTop + offset1 + offset2 + offset3
          } center`,
          end: `bottom-=${window.innerHeight / 2 + offset2 + offset3} center`,
          id: "step3",
          onEnterBack: () => {
            ctx.current?.thirdDate();
          },
          onLeave: () => {
            ctx.current?.fourthDate();
          },
        });
      }

      step1.current = trigger1!.start + 20;
      step2.current = trigger2!.start + 20;
      step3.current = trigger3!.start + 20;
      step4.current = trigger3!.end + 20;

      const BubbleTl = gsap.timeline({
        paused: true,
      });

      bubble.current &&
        BubbleTl.fromTo(
          bubble.current,
          {
            scale: 0,
            rotate: -25,
          },
          {
            scale: 1,
            rotate: 0,
            duration: 1.3,
            ease: "elastic.out(1, 0.8)",
          }
        );

      bubbleText.current &&
        BubbleTl.fromTo(
          bubbleText.current,
          {
            opacity: 0,
          },
          {
            opacity: 1,
          },
          0.6
        );

      const bubbleTrigger = ScrollTrigger.create({
        trigger: bubble.current,
        start: `top bottom`,
        end: `top center`,
        id: "step1",
        once: true,
        onEnter: () => {
          BubbleTl.play();
        },
      });
    });

    ctx.current.firstDate();

    return () => {
      ctx.current?.revert();
    };
  }, [isMobile, isFullHd]);

  return (
    <div>
      <div className="relative my-10 md:my-20 max-w-[700px] mx-auto">
        <div className="px-4">
          <p className="text-xl">
            <span className="n27 text-linear-sunset text-poster">2012,</span>{" "}
            <span className="text-dashboard-text-description-base text-large">
              Notre histoire commence.
            </span>
          </p>

          <div
            ref={bubble}
            className="relative hystory__bubble flex justify-center items-center my-6 px-7 py-4 origin-bottom-right min-h-[100px]"
          >
            <div
              ref={bubbleText}
              className="relative hystory__msg text-base z-20 xl:pr-[160px]"
            >
              <TextSplit input="Et si on pouvait faire monter ses vidéos par un.e professionnel.le à tout moment, peu importe le lieu où on se trouve ?" />
            </div>
            <div className="absolute top-0 left-0 w-full h-full object-cover bg-blackBerry border rounded-3xl z-10"></div>
            <Bubble
              ref={bubbleSvg}
              className="absolute hidden md:block top-6 left-4 w-full h-auto object-contain z-0 svg-color-dashboard-button-island-hover"
            ></Bubble>
          </div>

          <p className="text-right text-xl text-soyMilk opacity-60">
            François, distribué.
          </p>
        </div>
      </div>

      <div ref={scrollParent} className="md:h-[170vh]">
        <div className="flex justify-between items-start gap-8 md:h-[90vh] lg:h-[85vh] md:sticky md:top-[5vh] lg:top-[7.5vh]">
          <div className="relative shrink-0 border md:border-l-0 rounded-r-3xl bg-blackBerry hidden md:flex justify-end items-center md:w-4/12 lg:w-2/5 self-stretch z-10">
            <div className="md:flex flex-col md:justify-center md:items-center lg:justify-start h-max items-center lg:p-16 lg:pr-28 relative overflow-hidden w-full">
              <Tag
                date="2012"
                text="Une idée"
                readed={true}
                onClick={() => {
                  lenis.scrollTo(step1.current, { duration: 0.3 });
                }}
              />
              <div
                ref={line1}
                className="w-[1px] h-[100px] gradient-white-transparent"
              ></div>
              <Tag
                date="2020"
                text="Le bon moment"
                readed={p2Readed}
                offset={50}
                onClick={() => {
                  lenis.scrollTo(step2.current, { duration: 0.3 });
                }}
              />
              <div
                ref={line2}
                className="w-[1px] h-[30px] gradient-white-transparent"
              ></div>
              <Tag
                date="2021"
                text="L'équipe"
                readed={p3Readed}
                onClick={() => {
                  lenis.scrollTo(step3.current, { duration: 0.3 });
                }}
              />
              <div
                ref={line3}
                className="w-[1px] h-[100px] gradient-white-transparent"
              ></div>
              <Tag
                date="2024"
                text="Le lancement"
                readed={p4Readed}
                onClick={() => {
                  lenis.scrollTo(step4.current, { duration: 0.3 });
                }}
              />
            </div>
            <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none opacity-20 bg-pattern"></div>
          </div>

          <div className="relative flex items-center h-full text-base no-scroll-bar overflow-scroll bg-blackBerry md:border md:border-r-0 rounded-3xl md:rounded-r-none md:rounded-l-3xl md:p-4 mx-4 md:mx-0 md:px-16 lg:px-28 md:py-24 md:w-8/12 lg:w-3/5 z-10">
            <div ref={scrollContent} className="max-w-3xl text-base-text">
              <div ref={p1}>
                <span className="font-medium">
                  Les bons monteurs ne sont pas réservés qu’aux documentaires
                  d’ARTE, aux magazines de France Télévisions ou aux grands
                  youtubers !
                </span>
                <p className="mt-3">
                  En 2012, François Hérard, alors administrateur de production à
                  France 3 a pour idée de créer un service de montage vidéo à
                  distance avec pour objectif de développer une expérience
                  fluide où créateur.ice.s et monteur.se.s collaboreraient en
                  distanciel.
                </p>
              </div>

              <div ref={p2} className="mt-12 md:mt-8 md:opacity-90">
                En 2020, le COVID19 oblige la production audiovisuelle à
                s’adapter au télétravail. A la Fabrique et dans les rédactions
                de France Télévisions, les réalisateurs, les journalistes
                échangent avec les monteurs depuis leur domicile, …et ça marche
                ! Le montage à distance est désormais dans les usages.
              </div>

              <div ref={p3} className="mt-12 md:mt-8 md:opacity-90">
                2021, Sébastien Soriano, consultant en Product Design, joue un
                rôle crucial dans la conception et la création de l’interface
                utilisateur d’editYour.Film. Sa contribution significative et sa
                confiance dans le projet l’ont également amené à devenir associé
                au projet.
              </div>

              <div ref={p4} className="mt-12 md:mt-8 md:opacity-90">
                2024, après plusieurs phases de tests, editYour.film permet aux
                créateurs de confier leur montage vidéo à un professionnel
                expérimenté en quelques clics, peu importe leur localisation.
                Vous pouvez dès maintenant profitez de nos services.
              </div>
            </div>
          </div>

          {/* <div className="absolute hidden md:block w-full h-full gradient-menu-mobile z-0"></div> */}
        </div>
      </div>
    </div>
  );
};

type tagProps = {
  date: string;
  text: string;
  readed: boolean;
  offset?: number;
  onClick: () => void;
};
const Tag = ({ date, text, readed, offset = 0, onClick }: tagProps) => {
  const el = useRef(null);
  const textEl = useRef(null);

  useEffect(() => {
    gsap.to(textEl.current, {
      opacity: readed ? 1 : 0,
    });
  }, [readed]);

  return (
    <div
      ref={el}
      className="w-36 relative z-20"
      onClick={() => {
        onClick();
      }}
    >
      <div
        className={`bg-background-card text-4xl n27 py-2 px-8 rounded-full border ${
          readed ? "border-soyMilk  border-opacity-70" : ""
        } hover:border-soyMilk hover:border-opacity-70 transition-colors duration-500 overflow-hidden`}
      >
        <span className="text-linear-sunset">{date}</span>
      </div>
      <div ref={textEl} className="text-soyMilk opacity-60 mt-4 text-center">
        {text}
      </div>
    </div>
  );
};
