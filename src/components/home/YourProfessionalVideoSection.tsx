import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { useEffect, useRef } from "react";
import useMediaQuery from "@/hooks/useMediaQuery";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { CardsContainer } from "../_shared/UI/CardsContainer";
import { SimpleCard } from "../_shared/UI/CardSimple";
import { IslandButton } from "../_shared/buttons/IslandButton";
import routes from "@/routes";
import { Video } from "../_shared/video/Video";
import { appearBottom } from "@/Animations/appearBottom";

gsap.registerPlugin(ScrollTrigger)

export const YourProfessionalVideoSection = ({ data }: any) => {
  const isMobile = useMediaQuery("(max-width: 768px)")
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  const wrapper = useRef<HTMLDivElement>(null)
  const cardsWrapper = useRef<HTMLDivElement>(null);
  const card1 = useRef<HTMLDivElement>(null);
  const card2 = useRef<HTMLDivElement>(null);
  const card3 = useRef<HTMLDivElement>(null);


  useEffect(() => {
    if (isMobile) return
    
    const tlWrapper = gsap.timeline({
      paused: true
    })

    const tlCards = gsap.timeline({
      paused: true
    })

    const ctx = gsap.context((self) => {
      self.add('cards', () => {
        tlWrapper.add(appearBottom({elmts:cardsWrapper.current}), 0)
        tlWrapper.add(appearBottom({elmts:card1.current, liteY:true, rotateX:true}), 0.4)
        tlCards.add(appearBottom({elmts:[card2.current, card3.current], liteY:true, rotateX:true}))
      })
    })

    const trigger1 = ScrollTrigger.create({
      trigger: wrapper.current,
      start: `top+=${window.innerHeight * 0.3333} bottom`,
      end: `top+=${window.innerHeight * 0.3333 + 600} bottom`,
      id: "step1",
      // markers: true,
      onUpdate: (self) => {
        tlWrapper.progress(self.progress)
      }
    });

    const trigger2 = ScrollTrigger.create({
      trigger: wrapper.current,
      start: `top+=${window.innerHeight * 0.6666} bottom`,
      end: `top+=${window.innerHeight * 0.6666 + 600} bottom`,
      id: "step2",
      // markers: true,
      onUpdate: (self) => {        
        tlCards.progress(self.progress)
      }
    });

    ctx.cards()

    return () => {
      ctx.revert()
      trigger1.kill()
      trigger2.kill()
    }

  }, [inView, isMobile])

  return (
    <div ref={wrapper}>
      <CardsContainer
        ref={cardsWrapper}
        className='perspective'
        headingComp={
          <SimpleCard
            ref={card1}
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
          ref={card2}
          className="relative overflow-hidden flex flex-col justify-between gap-[56px] pb-0"
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
          ref={card3}
          paddingMobileSmall
          className="relative overflow-hidden flex flex-col justify-between gap-[56px] pb-0"
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
                    loop
                    muted
                    noPlayer
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
    </div>
  );
};
