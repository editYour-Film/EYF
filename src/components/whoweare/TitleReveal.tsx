import { TextSplit } from "@/utils/TextSplit"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import { createRef, forwardRef, useEffect, useRef, useState } from "react"

type TitleRevealProps = {

}

export const TitleReveal = ({}: TitleRevealProps) => {
  const titles = [
    {
      text: 'CRÉATEURS DE CONTENUS',
      isActive: true
    },{
      text: 'Réalisateurs',
      isActive: false
    },{
      text: 'journalistes',
      isActive: false
    },{
      text: 'vlogueurs',
      isActive: false
    },{
      text: 'VIDÉASTES',
      isActive: false
    },{
      text: '...',
      isActive: false
    },
  ]

  const [titleActive, setTitleActive] = useState<number | null>(null)

  const titlesRef = useRef(titles.map<React.RefObject<HTMLDivElement>>(() => {
    return createRef<HTMLDivElement>()
  }))

  const DirectionRef = useRef(titles.map<1 | -1>(() => 1 ))

  const titlesNumber = titles.length;

  const parent = useRef<HTMLDivElement>(null)

  const stepHeight = window.innerHeight / 2
  
  useEffect(() => {    
    const ctx = gsap.context(() => {
      titlesRef.current.forEach((title, i) => {
        ScrollTrigger.create({
          trigger: parent.current,
          start: `top+=${stepHeight * ( i + 1)} ${i === 0 ? 'bottom' : 'center'}`,
          end: `top+=${stepHeight * (i + 2)} ${i === titlesRef.current.length - 1 ? 'top' : 'center'}`,
          id: `step${i}`,
          onEnter: () => {
            setTitleActive(i)
            DirectionRef.current[i] = 1
          },
          onEnterBack: () => {
            setTitleActive(i)
            DirectionRef.current[i] = -1
          },
          onLeave: () => {
            setTitleActive(null)
            DirectionRef.current[i] = -1
          },
          onLeaveBack: () => {
            setTitleActive(null)
            DirectionRef.current[i] = 1
          }
        })
      });
    })

    return () => {
      ctx.revert()
    }
  }, [])

  return (
    <div 
      ref={parent}
      className="title-reveal w-full"
      style={{height: `${stepHeight * (titlesNumber + 1)}px`}}
    >
      <div className="title-reveal__container sticky h-[100vh] w-full flex top-0 justify-center items-center">
        <div className="title-reveal__content">
          <div className="title-reveal__suptitle text-center text-violet font-medium text-2xl n27">Une nouvelle façon de travailler pour les</div>
          <div className="relative title-reveal__titles text-center grid place-content-center text-[40px] md:text-[50px] leading-[100%] mt-8 n27 font-bold">
            {titles.length && titles.map((title, i) => {
              return (
                <Title 
                  key={i} 
                  ref={titlesRef.current[i]} 
                  text={title.text} 
                  isActive={titleActive === i} 
                  direction={DirectionRef.current[i]}/>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

type TitleProps = {
  text: string,
  isActive: boolean,
  direction: 1 | -1
}

const Title = forwardRef<HTMLDivElement, TitleProps>(function Title({text, isActive, direction}, ref) {
  return (
    <div 
      ref={ref} 
      className={`title-reveal__first col-[1/2] row-[1/2] top-0 uppercase anim-title anim-title-reveal ${isActive && 'title-active'}`} 
      style={{
        '--direction': direction,
        '--char-delay': '0.01s',
      } as React.CSSProperties}
    >
      <TextSplit input={text} />
    </div>
  )
})