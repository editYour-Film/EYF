import { Title } from "../_shared/Title";
import { H2 } from "../_shared/typography/H2";
import { useInView } from "react-intersection-observer";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useEffect, useRef, forwardRef, useState } from "react";
import styles from "@/styles/components/StepsSection.module.scss"
import { useLenis } from "@studio-freight/react-lenis";
import useMediaQuery from "@/hooks/useMediaQuery";
import { useDispatch } from 'react-redux'
import { toClick, toRegular} from "@/store/slices/cursorSlice"
import { Cloudinary, CloudinaryImage, CloudinaryVideo } from "@cloudinary/url-gen";
import { closeNavbar, openNavbar } from "@/store/slices/navbarSlice";
import store from "@/store/store";

gsap.registerPlugin(ScrollTrigger)

export const StepsSection = ({ data }: any) => {
  const dispatch = useDispatch()
  const lenis = useLenis()

  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(min-width: 768px) && (max-width: 1024px)");
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const wrapper = useRef<HTMLDivElement>(null)

  const { ref: stepW, inView: inviewMain } = useInView({
    // triggerOnce: true,
    threshold: isMobile ? 0.2 : 0.15,
  });

  const step1 = useRef<HTMLDivElement>(null)
  const step2 = useRef<HTMLDivElement>(null)
  const step3 = useRef<HTMLDivElement>(null)

  const buttonsW = useRef<HTMLDivElement>(null)
  const button1 = useRef<HTMLDivElement>(null)
  const button2 = useRef<HTMLDivElement>(null)
  const button3 = useRef<HTMLDivElement>(null)

  const [buttonActive, setButtonActive] = useState(0)

  const trigger = '0%'

  const [trigger1Start, setTrigger1Start] = useState<number | Element>(0)
  const [trigger2Start, setTrigger2Start] = useState<number | Element>(0)
  const [trigger3Start, setTrigger3Start] = useState<number | Element>(0)

  const [medias, setMedias] = useState<{video:string}[]>()

  useEffect(() => {
    stepW(wrapper.current)
    setMedias([
      {
        video: '/video/home/step1.webm',
      },      {
        video: '/video/home/step2.webm',
      },      {
        video: '/video/home/step3.webm',
      },
    ])
  }, [])
  
  useEffect(() => {    
    const handleScroll = () => {
      const gbcr = wrapper.current?.getBoundingClientRect()
      
      if (gbcr) {
        if(gbcr.top < 50) {          
          store.getState().navbar.isOpen && dispatch(closeNavbar())
        } else {
          !store.getState().navbar.isOpen && dispatch(openNavbar())
        }
  
        if(gbcr.top + wrapper.current!.offsetHeight < 0 && !store.getState().navbar.isOpen) {
          dispatch(openNavbar())
        }
      }
    }

    isMobile && window.addEventListener('scroll', handleScroll, false)

    return () => {
      isMobile && window.removeEventListener('scroll', handleScroll, false)
    }
  }, [isMobile])
  
  useEffect(() => {
    let trigger1:globalThis.ScrollTrigger, trigger2:globalThis.ScrollTrigger, trigger3:globalThis.ScrollTrigger;

    const ctx = gsap.context(() => {
        const step2Offset = (!isMobile && step2.current) ? step2.current?.offsetHeight : 0;
        const step3Offset = (!isMobile && step3.current) ? step3.current?.offsetHeight * 2 : 0;
        
        const tl1 = gsap.timeline({
          paused: true,
          durations: 1
        })

        if (!isMobile) {
          tl1.fromTo(step2?.current?.querySelector('.content')!, {
            y: window.innerHeight
          }, {
            y: 0,
            ease: 'power2.inOut'
          }, 0)
          tl1.fromTo(step1?.current?.querySelector('.content')!, {
            scale: 1
          }, {
            scale: 0.9
          }, 0)
        }

        trigger1 = ScrollTrigger.create({
          trigger: step1.current,
          endTrigger: step1.current,
          start: `top+=${isMobile ? - 150 : 0} ${trigger}`,
          end: `bottom ${trigger}`,
          id: "step1",
          onEnter: () => {
            setButtonActive(0)
          },
          onEnterBack: () => {
            setButtonActive(0)
          },
          onLeave: () => {
            setButtonActive(1)
          },
          onUpdate: (self) => {
            if(!isMobile) {
              tl1.progress(self.progress)
              if(self.progress >= 0.6 && !step2?.current?.querySelector('.content')!.classList.contains('inView')) step2?.current?.querySelector('.content')!.classList.add('inView')
            }
          }
        });
        setTrigger1Start(trigger1.start)

        
        const tl2 = gsap.timeline({
          paused: true
        })
        if (!isMobile) {
          tl2.fromTo(step3?.current?.querySelector('.content')!, {
            y: window.innerHeight
          }, {
            y: 0,
            ease: 'power2.inOut'
          })
          tl2.fromTo(step2?.current?.querySelector('.content')!, {
            scale: 1
          }, {
            scale: 0.9
          }, 0)
        }


        trigger2 = ScrollTrigger.create({
          trigger: step2.current,
          endTrigger: step2.current,
          start: `top+=${isMobile ? step2Offset - 150 : step2Offset} ${trigger}`,
          end: `bottom+=${isMobile ? step2Offset - 150 : step2Offset} ${trigger}`,
          id: "step2",
          onEnter: () => {
            setButtonActive(1)
          },
          onEnterBack: () => {
            setButtonActive(1)
          },
          onLeave: () => {
            setButtonActive(2)
          },
          onUpdate: (self) => {
            if (!isMobile) {
              tl2.progress(self.progress)
              if(self.progress >= 0.6 && !step3?.current?.querySelector('.content')!.classList.contains('inView')) step3?.current?.querySelector('.content')!.classList.add('inView')
            }
          }
        });
        setTrigger2Start(trigger2.start)
    
        trigger3 = ScrollTrigger.create({
          trigger: step3.current,
          endTrigger: step3.current,
          start: `top+=${isMobile ? step3Offset - 150 : step3Offset} ${trigger}`,
          end: `bottom+=${step3Offset} ${trigger}`,
          id: "step3",
          onEnter: () => {
            setButtonActive(2)
          },
          onEnterBack: () => {
            setButtonActive(2)
          },
        });
        setTrigger3Start(trigger2.end)
      })
    return () => {
      ctx && ctx.revert()
      trigger1 && trigger1.kill()
      trigger2 && trigger2.kill()
      trigger3 && trigger3.kill()
    }
  } , [isDesktop, isTablet, isMobile])

  const goTo = (offset:number|Element) => {
    lenis.scrollTo(offset, {
      offset: isMobile ? -150 : 10,
      duration: 1.5
    })
  }

  // useEffect(() => {
  //   if (inviewMain) {      
  //     dispatch(closeNavbar())
  //   } else {
  //     dispatch(openNavbar())
  //   }
  // }, [inviewMain])

  return (
    <div ref={wrapper} className={`relative md:pt-16 md:h-[330vh] fullHd:h-[280vh]`}>
      <div className={`${isDesktop ? 'sticky top-[15vh] fullHd:top-[22vh] h-[80vh]' : 'h-full'}`}>
        <div ref={buttonsW} className={`sticky md:relative mb-dashboard-spacing-element-medium md:mb-0 bg-blackBerry bg-opacity-80 top-0 py-[20px] md:py-0 flex ${styles.buttonsW} relative w-full justify-center z-20`}>
          <div className="flex flex-row justify-space-between gap-5">
            <StepButton 
              isActive={buttonActive === 0 ? true : false} 
              ref={button1}
              onClick={() => {goTo(trigger1Start)}}
            >Étape 1</StepButton>
            <StepButton 
              isActive={buttonActive === 1 ? true : false} 
              ref={button2}
              onClick={() => {goTo(trigger2Start)}}
            >Étape 2</StepButton>
            <StepButton 
              isActive={buttonActive === 2 ? true : false} 
              ref={button3}
              onClick={() => {goTo(trigger3Start)}}
            >Étape 3</StepButton>
          </div>
        </div>

        <div className="relative z-10">
          {medias !== undefined && 
          <>
            <Step
            media={{url: medias[0].video} }
            title={data.step1_title} 
            sectionTitle={data.step1_section_title}
            content={data.step1_text} 
            side='left'
            ref={step1}
            className={inviewMain ? 'inView' : ''}
            isActive={buttonActive === 0 ? true : false} 
            />

            <Step 
            media={{url: medias[1].video} }
            title={data.step2_title} 
            sectionTitle={data.step2_section_title}
            content={data.step2_text} 
            side='right'
            ref={step2}
            isActive={buttonActive === 1 ? true : false} 
            className="z-20"
            />

            <Step 
            media={{url: medias[2].video} }
            title={data.step3_title} 
            sectionTitle={data.step3_section_title}
            content={data.step3_text} 
            side='left'
            ref={step3}
            isActive={buttonActive === 2 ? true : false} 
            className="z-30"
            />
          </>

          }
        </div>

        {/* <div className="relative top-section-bg1 opacity-70 top-5 z-0"></div>
        <div className="absolute bg-top-section-2 opacity-70 left-0 w-[800px] h-[500px] -bottom-5 z-0"></div> */}

      </div>
    </div>
  );
};

type stepProps = {
  media: {
    url:string,
    // poster: string
  },
  title: string,
  sectionTitle: string,
  content: string,
  side: 'left' | 'right',
  className?: string,
  isActive: boolean,
}

const Step = forwardRef(function Step({media, title, sectionTitle, content, side, className, isActive}: stepProps, ref) {
  const cardStep = useRef(null)
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  
  return (
    <div 
      ref={ref as React.LegacyRef<HTMLDivElement>} 
      className={`${className && className} ${isDesktop ? 'absolute top-0' : ''} w-full mt-10 first:mt-0 sm:first:mt-6 ${isActive ? '' : 'pointer-events-none'}`}
    >
    <div 
      className={`content flex flex-col ${side === 'right' ? 'md:flex-row-reverse' : 'md:flex-row'} fullHd:h-[50vh] border rounded-[24px] overflow-hidden gap-4 md:gap-16 lg:gap-40 justify-between md:justify-center lg:justify-between items-center max-w-6xl mx-auto py-5 px-5 md:px-[72px] fullHd:px-[100px] md:py-16 bg-black`}
    >
      <div className="md:w-6/12 fullHd:w-1/2 md:max-w-md">
        <H2 arrow fake className="text-base">{sectionTitle}</H2>
        <Title titleType="h2" anim={isDesktop} className="mt-6 text-title-medium" noLH fake addDuration={'0.4s'}>{title}</Title>
        <p className="text-xl text-base-text mt-9">
          {content}
        </p>
      </div>

      <div ref={cardStep} className="w-full mt-14 md:mt-0 md:w-[45%] md:max-w-md relative p-4">
        <div className="step-img-white hidden xl:block"></div>
        <div className="relative pt-[100%]">
          <video
            className="absolute w-full h-full left-0 top-0 z-20"
            // controls
            muted
            // poster={media.poster}
            autoPlay
            loop
          >
            <source
              src={media.url}
              type="video/webm"
            />
          </video>
        </div>
      </div>
      
    </div>
  </div>
  )
})

type stepButtonProps = {
  children: React.ReactNode,
  isActive: boolean,
  onClick: React.MouseEventHandler<HTMLDivElement> | undefined,
}

const StepButton = forwardRef(function StepButton({children, isActive, onClick}:stepButtonProps, ref) {
  const dispatch = useDispatch()

  return (
    <div 
      onClick={onClick} 
      onMouseEnter={() => {dispatch(toClick())}}
      onMouseLeave={() => {dispatch(toRegular())}}

      className={`${styles.button} ${isActive && styles.active} bg-black px-8 py-2 rounded-full border h-max cursor-pointer font-medium`}>
      <span>{children}</span>
    </div>
  )
})
