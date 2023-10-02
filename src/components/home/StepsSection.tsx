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

gsap.registerPlugin(ScrollTrigger)

export const StepsSection = ({ data }: any) => {
  const { ref: stepW, inView: inviewMain } = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  const lenis = useLenis()

  const step1 = useRef<HTMLDivElement>(null)
  const step2 = useRef<HTMLDivElement>(null)
  const step3 = useRef<HTMLDivElement>(null)

  const buttonsW = useRef<HTMLDivElement>(null)
  const button1 = useRef<HTMLDivElement>(null)
  const button2 = useRef<HTMLDivElement>(null)
  const button3 = useRef<HTMLDivElement>(null)

  const [buttonActive, setButtonActive] = useState(0)

  const trigger = '0%'

  const [trigger1Start, setTrigger1Start] = useState(0)
  const [trigger2Start, setTrigger2Start] = useState(0)
  const [trigger3Start, setTrigger3Start] = useState(0)

  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(min-width: 768px) && (max-width: 1024px)");
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const [medias, setMedias] = useState<{video:CloudinaryVideo, img:CloudinaryImage}[]>()
  useEffect(() => {
    const cld = new Cloudinary({
      cloud: {
        cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_NAME,
        apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_KEY,
        apiSecret: process.env.NEXT_PUBLIC_CLOUDINARY_SECRET
      }
    })

    const video1 = cld.video(data.step1_media.data.attributes.provider_metadata.public_id).format('auto')
    const video2 = cld.video(data.step2_media.data.attributes.provider_metadata.public_id).format('auto')
    const video3 = cld.video(data.step3_media.data.attributes.provider_metadata.public_id).format('auto')
    
    const img1 = cld.image(data.step1_poster.data.attributes.provider_metadata.public_id).format('auto')
    const img2 = cld.image(data.step2_poster.data.attributes.provider_metadata.public_id).format('auto')
    const img3 = cld.image(data.step3_poster.data.attributes.provider_metadata.public_id).format('auto')

    setMedias([
      {
        video: video1,
        img: img1
      },{
        video: video2,
        img: img2
      },{
        video: video3,
        img: img3
      },
    ])

  }, [])
  
  useEffect(() => {
    if(!isDesktop) return
    const ctx = gsap.context(() => {
      const step2Offset = step2.current ? step2.current?.offsetHeight : 0;
      const step3Offset = step3.current ? step3.current?.offsetHeight * 2 : 0;
      
      const tl1 = gsap.timeline({
        paused: true,
        durations: 1
      })
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

      const trigger1 = ScrollTrigger.create({
        trigger: step1.current,
        endTrigger: step1.current,
        start: `top ${trigger}`,
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
          tl1.progress(self.progress)
          if(self.progress >= 0.6 && !step2?.current?.querySelector('.content')!.classList.contains('inView')) step2?.current?.querySelector('.content')!.classList.add('inView')
        }
      });
      setTrigger1Start(trigger1.start)

      
      const tl2 = gsap.timeline({
        paused: true
      })
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

      const trigger2 = ScrollTrigger.create({
        trigger: step2.current,
        endTrigger: step2.current,
        start: `top+=${step2Offset} ${trigger}`,
        end: `bottom+=${step2Offset} ${trigger}`,
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
          tl2.progress(self.progress)
          if(self.progress >= 0.6 && !step3?.current?.querySelector('.content')!.classList.contains('inView')) step3?.current?.querySelector('.content')!.classList.add('inView')
        }
      });
      setTrigger2Start(trigger2.start)
  
      const trigger3 = ScrollTrigger.create({
        trigger: step3.current,
        endTrigger: step3.current,
        start: `top+=${step3Offset} ${trigger}`,
        end: `bottom+=${step3Offset} ${trigger}`,
        id: "step3",
        onEnter: () => {
          setButtonActive(2)
        },
        onEnterBack: () => {
          setButtonActive(2)
        },
      });
      setTrigger3Start(trigger3.start)
    })
    return () => ctx.revert()
  } , [isDesktop, isTablet, isMobile])

  const goTo = (offset:number) => {
    lenis.scrollTo(offset, {
      offset: 10,
      duration: 1.5
    })
  }

  return (
    <div ref={stepW} className={`relative md:pt-16 ${isDesktop ? 'h-[330vh] fullHd:h-[280vh]' : 'overflow-hidden'} `}>
      <div className={`${isDesktop ? 'sticky top-[15vh] fullHd:top-[22vh] h-[80vh]' : ''}`}>
        <div ref={buttonsW} className={`${isDesktop ? 'flex' : 'hidden'} ${styles.buttonsW} relative  w-full justify-center z-10`}>
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
            media={{url: '/video/home/step1.webm', poster: medias[0].img.toURL()} }
            title={data.step1_title} 
            sectionTitle={data.step1_section_title}
            content={data.step1_text} 
            side='left'
            ref={step1}
            className={inviewMain ? 'inView' : '' + 'z-10'}
            />

            <Step 
            media={{url: '/video/home/step2.webm', poster: medias[1].img.toURL()} }
            title={data.step2_title} 
            sectionTitle={data.step2_section_title}
            content={data.step2_text} 
            side='right'
            ref={step2}
            className="z-20"
            />

            <Step 
            media={{url: '/video/home/step3.webm', poster: medias[2].img.toURL()} }
            title={data.step3_title} 
            sectionTitle={data.step3_section_title}
            content={data.step3_text} 
            side='left'
            ref={step3}
            className="z-30"
            />
          </>

          }
        </div>

        <div className="relative top-section-bg1 opacity-70 top-5 z-0"></div>
        <div className="absolute bg-top-section-2 opacity-70 left-0 w-[800px] h-[500px] -bottom-5 z-0"></div>

      </div>
    </div>
  );
};

type stepProps = {
  media: {
    url:string,
    poster: string
  },
  title: string,
  sectionTitle: string,
  content: string,
  side: 'left' | 'right',
  className: string
}

const Step = forwardRef(function Step({media, title, sectionTitle, content, side, className}: stepProps, ref) {
  const cardStep = useRef(null)
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return (
    <div ref={ref as React.LegacyRef<HTMLDivElement>} className={`${className && className} ${isDesktop ? 'absolute top-0' : ''} w-full mt-10 first:mt-0 sm:first:mt-6`}>
    <div className={`content flex flex-col ${side === 'right' ? 'md:flex-row-reverse' : 'md:flex-row'} md:w-[90vw] lg:h-[70vh] fullHd:h-[50vh] border rounded-[24px] overflow-hidden gap-4 md:gap-16 lg:gap-40 justify-between md:justify-center lg:justify-between items-center max-w-6xl mx-auto py-5 px-5 md:px-[72px] fullHd:px-[100px] md:py-16 bg-black`}>
      <div className="md:w-1/3 fullHd:w-1/2 md:max-w-md">
        <H2 arrow fake>{sectionTitle}</H2>
        <Title titleType="h2" anim={isDesktop} className="mt-6 max-w-sm" fake addDuration={'0.4s'}>{title}</Title>
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
            poster={media.poster}
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
