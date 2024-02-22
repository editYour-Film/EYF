import Image from "next/image";
import { EditorJsParser } from "@/utils/EditorJsParser";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useLenis } from "@studio-freight/react-lenis";
import useMediaQuery from "@/hooks/useMediaQuery";
import { TextSplit } from "@/utils/TextSplit";
import Bubble from "@/img/whoweare/Bubble.svg";

export const HistorySection = ({ data }: any) => {
  const p1 = useRef<HTMLDivElement>(null);
  const p2 = useRef<HTMLDivElement>(null);
  const p3 = useRef<HTMLDivElement>(null);
  const scrollParent = useRef(null);
  const scrollContent = useRef(null);
  const line1 = useRef<HTMLDivElement>(null);
  const line2 = useRef<HTMLDivElement>(null);

  const [p2Readed, setP2Readed] = useState(false);
  const [p3Readed, setP3Readed] = useState(false);

  const ctx = useRef<gsap.Context>();
  const isTweening = useRef(false);

  const step1 = useRef(0);
  const step2 = useRef(0);
  const step3 = useRef(0);

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
          [p2.current, p3.current],
          {
            opacity: 0.5,
            y: 300,
          },
          0
        );

        setP2Readed(false);
        setP3Readed(false);

        tl.to(
          line1.current,
          {
            height: 100,
          },
          0
        );

        tl.to(
          line2.current,
          {
            height: 30,
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

        tl.to(
          line1.current,
          {
            height: 30,
          },
          0
        );

        tl.to(
          line2.current,
          {
            height: 100,
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

        setP3Readed(true);

        tl.to(
          line1.current,
          {
            height: 30,
          },
          0
        );

        tl.to(
          line2.current,
          {
            height: 30,
          },
          0
        );
      });

      const offset1 = window.innerHeight * 0.15;
      const offset2 = window.innerHeight * 0.15;

      let trigger1: ScrollTrigger;
      let trigger2: ScrollTrigger;
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
          end: `bottom-=${window.innerHeight / 2 + offset2} center`,
          id: "step2",
          onEnterBack: () => {
            ctx.current?.secondDate();
          },
          onLeave: () => {
            ctx.current?.thirdDate();
          },
        });
      }

      step1.current = trigger1!.start + 20;
      step2.current = trigger2!.start + 20;
      step3.current = trigger2!.end + 20;

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

    return () => {
      ctx.current?.revert();
    };
  }, [isMobile, isFullHd]);

  return (
    <div>
      <div className="relative my-10 md:my-20 max-w-[700px] mx-auto">
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
            className="relative hystory__msg text-base z-20 pr-[160px]"
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

      <div ref={scrollParent} className="md:h-[170vh]">
        <div className="flex justify-between items-start gap-8 md:h-[80vh] lg:h-[80vh] md:sticky md:top-[15vh] lg:top-[15vh]">
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
                date="2019"
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
                date="2023"
                text="Le lancement"
                readed={p3Readed}
                onClick={() => {
                  lenis.scrollTo(step3.current, { duration: 0.3 });
                }}
              />
            </div>
            <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none opacity-20 bg-pattern"></div>
          </div>

          <div className="relative flex items-center h-full text-base no-scroll-bar overflow-scroll bg-blackBerry border md:border-r-0 rounded-3xl md:rounded-r-none md:rounded-l-3xl p-8 md:p-4 mx-4 md:mx-0 md:px-16 lg:px-28 md:py-24 md:w-8/12 lg:w-3/5 z-10">
            <div ref={scrollContent} className="max-w-3xl text-base-text">
              <div ref={p1}>
                <span className="font-medium">
                  Notre histoire commence quand{" "}
                  <span className="items-baseline w-max">
                    <Image
                      className="relative inline align-baseline mx-4 top-2"
                      src={"/img/whoweare/francois.png"}
                      width={42}
                      height={42}
                      alt="Photo de François Herard"
                    />
                    <span className="underline capitalize">
                      françois Herard
                    </span>
                  </span>
                </span>
                <p className="mt-3">
                  après avoir travaillé 25 ans chez France Télévisions a une
                  idée qui a changé la donne...{" "}
                </p>
                <p className="mt-3">
                  En 2012, il a tenté pour la première fois de créer un service
                  de montage vidéo à distance, mais l&rsquo;époque était trop
                  prématurée pour cette idée.
                </p>
              </div>

              <div ref={p2} className="mt-12 md:mt-8 md:opacity-90">
                Puis, en 2019, le COVID-19 a forcé le monde à s&rsquo;adapter
                rapidement au télétravail. À France Télévisions, les rédactions
                ont mis en place un dispositif pour permettre aux monteur.se.s
                de monter les sujets JT depuis leur domicile. Les conditions
                idéales étaient enfin réunies pour EDY !
              </div>

              <div ref={p3} className="mt-12 md:mt-8 md:opacity-90">
                Après deux versions de test, nous sommes enfin prêts à vous
                aider à{" "}
                <span className="text-linear-sunset font-medium">
                  transformer vos vidéos en véritables œuvres d&rsquo;art
                </span>{" "}
                grâce à toutes les fonctionnalités que nous avons développées.
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
