import Image from "next/image";
import { H1 } from "../_shared/typography/H1";
import { H2 } from "../_shared/typography/H2";
import { Title } from "../_shared/Title";
import { useInView } from "react-intersection-observer";
import { useEffect, useRef, createRef } from "react";
import useMediaQuery from "@/hooks/useMediaQuery";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { CardsContainer } from "../_shared/UI/CardsContainer";
import { SimpleCard } from "../_shared/UI/CardSimple";
import { IslandButton } from "../_shared/buttons/IslandButton";
import routes from "@/routes";
import { Video } from "../_shared/video/Video";

gsap.registerPlugin(ScrollTrigger)

export const YourProfessionalVideoSection = ({ data }: any) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  const isMobile = useMediaQuery("(max-width: 768px)")
  const cards = useRef<any>([])
  cards.current = [createRef<HTMLDivElement>(), createRef<HTMLDivElement>()];

  useEffect(() => {
    if (isMobile) return
        
    const ctx = gsap.context(() => {
      cards.current!.forEach((card:any, i:number) => {
        const tl = gsap.timeline({
          paused: true,
          defaults: {
            ease: 'power.inOut'
          }
        })
         
        tl.fromTo(card.current, {
          rotateX: '10deg',
          y: 50 + i * 30,
        }, {
          rotateX: '0deg',
          y: 0
        }, 0);
  
        const trigger1 = ScrollTrigger.create({
          trigger: card.current,
          start: `top bottom`,
          end: `center center`,
          id: "step1",
  
          onUpdate: (self) => {
            tl.progress(self.progress) 
          }
        });
      })
    })

    return () => {
      ctx.revert()
    }

  }, [inView])

  return (
    <CardsContainer
      headingComp={
        <SimpleCard
          className="pb-0 md:px-[80px] overflow-hidden"
        >
          <div className="flex flex-col items-center gap-dashboard-spacing-element-medium">
            <div className="flex flex-col items-center gap-dashboard-specific-radius text-center max-w-[520px]">
              <div className="text-dashboard-text-description-base text-title-medium">Chaque jours, des nouveaux modèles de montage disponibles</div>
              <div className="text-dashboard-text-description-base-low text-base">Quand vos idées rencontrent nos talents. Choisissez le modèle de montage qui correspond le mieux à votre projet et composez vous-même le devis de votre vidéo.</div>
            </div>
            <IslandButton 
              type="primary"
              label={'Ouvrir le catalogue'}
              href={routes.CATALOGUE}
              enableTwist
            />
          </div>
          <div className="w-full flex justify-center md:px- mt-dashboard-spacing-element-medium">
            <Image
              src={data.image.data.attributes.url}
              alt=""
              width={data.image.data.attributes.width}
              height={data.image.data.attributes.height}
              className="relative z-20 object-cover min-w-[600px]"
            />
          </div>
        </SimpleCard>
      }
    >
      <SimpleCard
        className="relative overflow-hidden flex flex-col justify-between gap-[56px]"
      >
        <div className="lg:w-2/3">
          <div className="text-dashboard-text-description-base-low text-title-small">Plus Rapide</div>
          <div className="text-dashboard-text-description-base text-medium">Commandez aujourd’hui, votre montage démarre demain</div>
        </div>

        <div className="relative w-full">
          <Image
            src={data.card1_img.data.attributes.url}
            alt=""
            width={data.card1_img.data.attributes.width}
            height={data.card1_img.data.attributes.height}
            className="relative z-20 object-cover"
          />
        </div>
      </SimpleCard>

      <SimpleCard
        paddingMobileSmall
        className="relative overflow-hidden flex flex-col justify-between gap-[56px]"
      >
        <div className="lg:w-2/3">
          <div className="text-dashboard-text-description-base-low text-title-small">Plus Simple</div>
          <div className="text-dashboard-text-description-base text-medium">Ajustez le devis de votre vidéo selon votre budget et vos besoins</div>
        </div>

        <div>
          <div className="relative flex flex-row justify-between w-full z-20">
            <div className="flex flex-row justify-between items-center border rounded-full z-10 bg-010304">
              <div className="flex justify-center items-center rounded-full bg-white text-black w-[24px] h-[24px] n27 font-bold">1</div>
              <div className="text-alphaWhite px-1 md:px-3 text-[11px] md:text-sm">Modèle</div>
            </div>
            <div className="flex flex-row justify-between items-center border rounded-full z-10 bg-010304">
              <div className="flex justify-center items-center rounded-full bg-white text-black w-[24px] h-[24px] n27 font-bold">2</div>
              <div className="text-alphaWhite px-1 md:px-3 text-[11px] md:text-sm">Durée du film</div>
            </div>
            <div className="flex flex-row justify-between items-center border rounded-full z-10 bg-010304">
              <div className="flex justify-center items-center rounded-full bg-violet text-white w-[24px] h-[24px] n27 font-bold">3</div>
              <div className="text-alphaWhite px-1 md:px-3 text-[11px] md:text-sm"> 12 Fichiers</div>
            </div>
            <div className="absolute w-full h-[1px] bg-white opacity-30 z-0 top-1/2 -translate-y-1/2"></div>
          </div>

          <div className="mt-8 sm:mt-8 w-full overflow-hidden rounded-t-[20px]">
            {
              data.card2_img.data.attributes.mime.split('/')[0] === 'video' 
              ?
                <Video
                  video={data.card2_img.data.attributes}
                  autoPlay
                  muted
                  noPlayer
                  trigger={true}
                />
              :
                <Image
                  src={data.card2_img.data.attributes.url}
                  alt=""
                  width={data.card1_img.data.attributes.width}
                  height={data.card1_img.data.attributes.height}
                  className="relative z-20 w-full h-auto object-cover"
                />
            }
          </div>
        </div>
      </SimpleCard>
    </CardsContainer>

    // <div
    //   ref={ref}
    //   className={`mt-20 sm:mt-40 mx-auto pb-32 border-b border-borderWhite z-0 ${inView ? " inView" : ""}`}
    // >
    //   <div className="bg-pattern-linear-top absolute bottom-0 left-0 w-full h-[130%] -z-10"></div>
    //   <div className="max-w-6xl sm:h-[410px] mx-auto flex flex-col sm:flex-row gap-9 sm:items-center sm:justify-between mt-10 md:mt-20 perspective">

    //       <div className="absolute w-full h-[150px] gradient-to-top-black-transparent z-20 bottom-0"></div>

    //     </div>

    //   </div>
    // </div>
  );
};
