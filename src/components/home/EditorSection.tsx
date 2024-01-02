import routes from "@/routes";
import Link from "next/link";
import Button from "../_shared/form/Button";
import { H1 } from "../_shared/typography/H1";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { useDispatch } from "react-redux";
import { toClick, toRegular } from "@/store/slices/cursorSlice";

import { Cross } from "../_shared/icons/cross";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import useMediaQuery from "@/hooks/useMediaQuery";
import { ClassicContent } from "../_shared/UI/ClassicContent";

gsap.registerPlugin(ScrollTrigger);

type EditorSectionProps = {
  data: any;
};
export const EditorSection = ({ data }: EditorSectionProps) => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const {
    ref: main,
    inView: inviewMain,
    entry,
  } = useInView({
    triggerOnce: true,
  });

  const { ref: cardsRef, inView: inViewCards } = useInView({
    triggerOnce: true,
    threshold: 0.25,
  });

  const largeCard = useRef<HTMLDivElement>(null);
  const largeCardInner = useRef<HTMLDivElement>(null);
  const gradient = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isMobile) return;
    let trigger1:globalThis.ScrollTrigger

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        paused: true,
        defaults: {
          ease: "power2.inOut",
        },
      });

      if(!isMobile) {
        tl.fromTo(
          largeCard.current!,
          {
            rotateX: "10deg",
            y: 50,
          },
          {
            rotateX: "0deg",
            y: 0,
          },
          0
        );
  
        tl.fromTo(
          largeCardInner.current!,
          {
            y: 50,
          },
          {
            y: 0,
          },
          0
        );
      }

      trigger1 = ScrollTrigger.create({
        trigger: largeCard.current,
        start: `top bottom`,
        end: `center center`,
        id: "step1",

        onUpdate: (self) => {
          !isMobile && tl.progress(self.progress);
        },
      });
    });

    return () => {
      ctx.revert();
      trigger1 && trigger1.kill()
    };
  }, [inviewMain, isMobile]);

  const handleMouseMove = (e: React.MouseEvent<Element, MouseEvent>) => {
    gradient.current &&
      gsap.to(gradient.current, {
        x: (e.clientX - gradient.current.offsetWidth / 2) / 4,
        y: (e.clientY - gradient.current.offsetHeight / 2) / 4,
        duration: 1,
      });
  };

  return (
    <div
      ref={main}
      className={`editorSection relative mx-auto ${inviewMain ? "inView" : ""}`}
      onMouseMove={(e) => {
        handleMouseMove(e);
      }}
    >
      <div className="relative mx-auto z-20">
        <div className="flex flex-col max-w-[660px] pl-[20px]">
          <ClassicContent
            suptitle={data.section_title ?? 'MONTEUR.SE.S'}
            title={data.title}
            titleType="h2"
            titleClassName="text-title-large font-medium text-dashboard-text-title-white-high mt-6 "
            paragraph="Vous êtes disponibles quelques jours en attendant ton prochain montage ? editYour.Film vous propose d’occuper 1, 2 jusqu’à 5 jours d’inactivité par le montage d’une vidéo à destination des réseaux sociaux, des plateformes ou de la TV."
          />
        </div>

        <div className="editorSection__cardsWrapper relative perspective">
          <div
            ref={cardsRef}
            className={`relative flex items-start justify-between flex-row md:flex-row gap-4 w-full overflow-scroll md:overflow-visible mt-12 md:mt-32 px-3 md:px-0 pb-dashboard-spacing-element-medium md:pb-0 z-10 perspective`}
          >
            <Item
              title={data.card1_title}
              text={data.card1_text}
              img={data.card1_img}
              i={10}
              delay={0}
              inView={inviewMain}
            />
            <Item
              title={data.card2_title}
              text={data.card2_text}
              img={data.card2_img}
              i={20}
              delay={30}
              inView={inviewMain}
            />
            <Item
              title={data.card3_title}
              text={data.card3_text}
              img={data.card3_img}
              i={30}
              delay={60}
              inView={inviewMain}
            />
          </div>

          <div
            ref={largeCard}
            className={`relative group md:border rounded-dashboard-button-square-radius mt-dashboard-spacing-element-medium md:mt-4 bg-dashboard-background-content-area md:bg-transparent border pt-dashboard-spacing-element-medium z-10 overflow-hidden perspective origin-center`}
            style={{"--item-delay": 40 / 100} as React.CSSProperties}
          >
            <div
              ref={largeCardInner}
              className="relative md:py-10 md:pl-32 md:pr-12"
            >
              <div
                className={`pointer-events-none hidden md:block absolute top-0 left-0 w-full h-full`}
              >
                <div
                  className={`absolute w-[130%] h-[130%] left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] z-10 bg-brightness-dark opacity-0 transition-opacity duration-500 group-hover:opacity-50`}
                ></div>
                <div
                  className={`absolute w-[150%] h-[150%] left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] z-10 bg-blackBerry opacity-[0.43]`}
                ></div>
                {data.large_card_img.data && (
                  <Image
                    className={`scale-150 object-cover group-hover:blur-[7px] transition-[filter] duration-500`}
                    src={data.large_card_img.data.attributes.url}
                    alt={data.large_card_img.data.attributes.alternativeText}
                    fill
                  />
                )}
              </div>

              <div className="relative flex flex-col md:flex-row-reverse justify-between gap-dashboard-spacing-element-medium z-20">
                <div className="md:basis-[55%] px-4 flex flex-col justify-center items-center md:items-start text-center md:text-left">
                  <H1 className="text-title-medium text-dashboard-text-title-white-high font-medium" fake>
                    {data.large_card_title}
                  </H1>
                  <p className="text-base text-dashboard-text-description-base my-5 max-w-xs">
                    {data.large_card_content}
                  </p>
                  <div className="flex flex-wrap gap-2.5">
                    <Link href={routes.SIGNIN}>
                      <Button
                        variant="primary"
                        text="Crée ton profil monteur"
                      />
                    </Link>
                  </div>
                </div>
                <div
                  className={`md:overflow-visible overflow-hidden relative md:basis-[30%] translate-y-[30px] group-hover:translate-y-0 transition-transform duration-500`}
                >
                  <div className="h-0 pb-[120%] md:pb-[100%] overflow-hidden">
                    <Image
                      className="md:absolute top-0 w-full h-auto"
                      src="/img/home/smartphone.png"
                      alt="smartphone présentant le calendrier du monteur"
                      width="387"
                      height="671"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={gradient}
        className="hidden sm:block absolute top-0 left-0 w-full h-full bg-editor-section z-0 pointer-events-none"
      ></div>
    </div>
  );
};

type ItemProps = {
  img: any;
  title: string;
  text: string;
  i: number;
  delay: number;
  inView: boolean;
};
const Item = ({ title, text, img, i, delay, inView }: ItemProps) => {
  const [isDisplayed, setIsDisplayed] = useState(false);
  const style = { "--item-delay": i / 100 } as React.CSSProperties;
  const dispatch = useDispatch();
  const card = useRef(null);
  const cardInner = useRef(null);

  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    if(isMobile) setIsDisplayed(true)
    else setIsDisplayed(false)
  }, [isMobile])

  useEffect(() => {
    if (isMobile) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        paused: true,
        defaults: {
          ease: "power.inOut",
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

      tl.fromTo(
        cardInner.current!,
        {
          y: 30,
        },
        {
          y: 0,
        },
        0
      );

      const trigger1 = ScrollTrigger.create({
        trigger: card.current,
        start: `top+=${delay} bottom`,
        end: `center center`,
        id: "step",
        onUpdate: (self) => {
          tl.progress(self.progress);
        },
      });
    });

    return () => {
      ctx.revert();
    };
  }, [inView]);

  return (
    <div
      ref={card}
      className={`relative group basis-11/12 md:basis-1/4 shrink-0 grow flex items-end w-screen h-[80vh] md:w-auto md:h-auto before:content-[''] before:display-block before:pointer-events-none before:pb-[100%] border rounded-dashboard-button-square-radius overflow-hidden cursor-pointer`}
      onMouseLeave={() => {
        dispatch(toRegular());
        !isMobile && setIsDisplayed(false);
      }}
      onClick={() => {
        !isMobile && setIsDisplayed(!isDisplayed);
      }}
      onMouseEnter={() => {
        dispatch(toClick());
      }}
      style={style}
    >
      <div ref={cardInner} className="absolute w-full h-full top-0 left-0">
        <div
          className={" hidden md:block absolute w-[130%] h-[130%] left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] z-20 bg-radial-filter opacity-0  group-hover:opacity-50 duration-300"}
        ></div>
        <div
          className={`w-[130%] h-[130%] left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] rounded-3xl ease-in duration-200 absolute z-10 bg-brightness-dark origin-center group-hover:scale-[1.02] group-hover:-translate-x-1/2 group-hover:-translate-y-1/2 group-hover:blur-[7px] ${isDisplayed ? 'opacity-50' : ''}`}
        >

          {img.data && (
            <Image
              src={img.data.attributes.url}
              alt={img.data.attributes.alternativeText}
              className={`w-full h-full absolute object-cover`}
              fill
            />
          )}
        </div>
        <div className="absolute mb-5 w-full px-[20px] py-[20px] md:px-6 z-30 bottom-0">
          <div className={"flex gap-4 justify-between items-start"}>
            <p className="font-title text-[18px] text-dashboard-text-title-white-high uppercase">{title}</p>
            <div
              className={`hidden md:block rounded-full p-2 cursor-pointer bg-soyMilk group-hover:bg-blueBerry svg-color-black group-hover:svg-color-soyMilk transition-transform ${isDisplayed ? 'rotate-0' : 'rotate-45'}`}
            >
              <div className="w-2">
                <Cross className="w-full h-full" />
              </div>
            </div>
          </div>
          <div
            className={
              " text-sm overflow-hidden transition-[max-height] duration-500 " +
              (isDisplayed ? "max-h-40" : "max-h-0")
            }
          >
            <p className="mt-5 text-dashboard-text-description-base">{text}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
