import Image from "next/image";
import { H1 } from "../_shared/typography/H1";
import { H2 } from "../_shared/typography/H2";
import { Title } from "../_shared/Title";
import { useInView } from "react-intersection-observer";
import { useEffect, useRef, createRef } from "react";
import useMediaQuery from "@/hooks/useMediaQuery";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

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
    <div
      ref={ref}
      className={`mt-20 sm:mt-40 mx-auto pb-32 border-b border-borderWhite z-0 ${inView ? " inView" : ""}`}
    >
      <div className="bg-pattern-linear-top absolute bottom-0 left-0 w-full h-[130%] -z-10"></div>
      <div className="max-w-6xl sm:h-[410px] mx-auto flex flex-col sm:flex-row gap-9 sm:items-center sm:justify-between mt-10 md:mt-20 perspective">
        <div 
          ref={cards.current[0]}
          className="flex flex-col items-center sm:h-full bg-cards w-full relative pt-10 px-7 rounded-3xl">
          <div className="relative w-full h-full max-w-[400px]">
            <p className="relative n27 text-center text-xl text-ebebeb z-20">
              {data.card1_title}
            </p>
            <p className="relative text-center font-medium text-violet max-w-md text-2xl z-20">
              {data.card1_text}
            </p>
            <div className="mt-8 sm:mt-4 sm:absolute sm:bottom-0 w-full h-[250px] rounded-t-[15px] overflow-hidden">
              <Image
                src={data.card1_img.data.attributes.url}
                alt=""
                height={250}
                width={450}
                className="relative h-full z-20 object-cover"
              />
            </div>
          </div>
          <div className="absolute w-full h-[150px] gradient-to-top-black-transparent z-20 bottom-0"></div>

        </div>
        <div 
          ref={cards.current[1]}
          className="relative flex flex-col items-center sm:h-full bg-cards w-full pt-10 px-7 rounded-3xl">
            <div className="relative w-full h-full max-w-[400px]">
              <p className="relative n27 text-center text-xl text-ebebeb z-20">
                {data.card2_title}
              </p>
              <p className="relative text-center font-medium text-violet max-w-md text-2xl z-20">
                {data.card2_text}
              </p>

              <div className="relative flex flex-row justify-between w-full z-20 mt-12">
                <div className="flex flex-row justify-between items-center border rounded-full z-10 bg-010304">
                  <div className="flex justify-center items-center rounded-full bg-white text-black w-[24px] h-[24px] n27 font-bold">1</div>
                  <div className="text-alphaWhite px-3 text-sm">Durée du film</div>
                </div>
                <div className="flex flex-row justify-between items-center border rounded-full z-10 bg-010304">
                  <div className="flex justify-center items-center rounded-full bg-white text-black w-[24px] h-[24px] n27 font-bold">2</div>
                  <div className="text-alphaWhite px-3 text-sm">Modèle</div>
                </div>
                <div className="flex flex-row justify-between items-center border rounded-full z-10 bg-010304">
                  <div className="flex justify-center items-center rounded-full bg-violet text-white w-[24px] h-[24px] n27 font-bold">3</div>
                  <div className="text-alphaWhite px-3 text-sm">Fichiers</div>
                </div>
                <div className="absolute w-full h-[1px] bg-white opacity-30 z-0 top-1/2 -translate-y-1/2"></div>
              </div>

              <div className="mt-8 sm:mt-4 sm:absolute bottom-0 w-full h-[170px] overflow-hidden rounded-t-[20px]">
                <Image
                  src={data.card2_img.data.attributes.url}
                  alt=""
                  height={250}
                  width={400}
                  className="relative z-20 w-full h-auto object-cover"
                />
              </div>
            </div>
            <div className="absolute w-full h-[150px] gradient-to-top-black-transparent z-20 bottom-0"></div>
        </div>
      </div>
    </div>
  );
};
