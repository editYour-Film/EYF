
import { createRef, useEffect, useRef } from "react"
import { Title } from "../_shared/Title"
import { useInView } from "react-intersection-observer"
import Arrow from '@/icons/right-arrow-violet.svg'
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import useMediaQuery from "@/hooks/useMediaQuery"

type ArrowCardsProps = {
  data: any
}

export const ArrowCards = ({data}: ArrowCardsProps) => {
  const {ref: section, inView} = useInView({
    triggerOnce: true,
  })

  const arrow = useRef(null)
  const cardsW = useRef(null)
  const cards = useRef([])
  cards.current = data.arrow_card.map((el:any, i:number) => { return cards.current[i] ?? createRef<React.Ref<HTMLDivElement>>() })

  const animCards = useMediaQuery('(min-width: 1024px)')
  
  useEffect(() => {      
    const ctx = gsap.context(() => {
      gsap.set(arrow.current, {
        rotate: 0
      })

      const arrowTl = gsap.timeline({
        paused: true,
        defaults: {
          ease: 'power2.inOut'
        }
      })

      arrowTl.fromTo(arrow.current, {
        rotate: 0,
        y: 0
      }, {
        rotate: 180,
        y: 50
      }, 0)

      const trigger = ScrollTrigger.create({
        trigger: arrow.current,
        start: 'top-=150 bottom-=150',
        end: 'bottom+=150 center',
        id: 'arrow',
        onUpdate: (self) => {
          arrowTl.progress(self.progress)
        }
      })

      if(data.arrow_card) {

        const tlCards = gsap.timeline({
          paused: true
        })
        const cardsEl = cards.current?.map((el:any) => el ? el.current : false)
        
        if (animCards) {
          tlCards.fromTo(cardsEl, {
            y: 100,
            rotateX: 10
          }, {
            y: 0,
            rotateX: 0,
            stagger: 0.1,
            ease: 'power2.inOut'
          })
    
          const trigger2 = ScrollTrigger.create({
            trigger: cardsW.current,
            start: 'top-=100 bottom',
            end: 'center center',
            id: 'cards',
            onUpdate: (self) => {
              tlCards.progress(self.progress)
            }
          })
        } 
      }
    })

    return () => {
      ctx.revert()
    }
  }, [inView, animCards, data])
  
  return (
    <div ref={section} className="arrow-cards mb-32">
      <div ref={arrow} className="arrow-cards__arrow flex justify-center items-center rounded-full border w-[92px] h-[92px] mx-auto border-white border-opacity-70">
        <Arrow className='rotate-[-90deg]'/>
      </div>

      <div className={`flex flex-col items-center text-center px-4 mx-auto md:max-w-2xl mt-32 ${inView && 'inView'}`}>
        <div className="text-violet text-[22px] font-medium">{data.suptitle}</div>
        <Title titleType="h1" fake anim className="mt-4 leading-[110%]">
          {data.title}
        </Title>
      </div>

      <div ref={cardsW} className="arrow-cards__cards flex flex-col gap-8 lg:flex-row items-stretch mt-32 px-4 md:px-32 lg:px-24 xl:px-32 perspective">
        {data.arrow_card.length && data.arrow_card.map((card:any, i:number) => {        
          return (
            <div ref={cards.current[i]} key={i} className="bg-cards basis-1/3 py-4 px-10 pt-32">
              <div className="inner relative z-10 flex flex-col items-center text-center">
                <div className="card_title font-medium text-[28px]">{card.title}</div>
                <div className="card_text text-xl text-base-text mt-4">{card.content}</div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
