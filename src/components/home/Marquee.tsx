import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import {map, lerp, clamp} from '@/utils/Math';
import Image from 'next/image';
import useMediaQuery from '@/hooks/useMediaQuery';
import { useDebouncedCallback } from 'use-debounce';

gsap.registerPlugin(ScrollTrigger)

type MarqueeProps = {
  firstLine: string;
  secondLine: string;
  className?: string;
}

export const Marquee = ({ firstLine, secondLine, className}:MarqueeProps) => {
  const el = useRef<HTMLDivElement>(null)
  const line1 = useRef<HTMLDivElement>(null)
  const line2 = useRef<HTMLDivElement>(null)

  const [line1XTot, setLine1XTot] = useState(0)
  const [line2XTot, setLine2XTot] = useState(0)

  const line1Elems = useRef<any>(null)
  const line2Elems = useRef<any>(null)

  const raf = useRef<number>()
  const ctx = useRef<any>(false)

  interface lineObj {
    el: HTMLDivElement, 
    xInit:number, 
    currentX:number,
  }

  const line1Obj = useRef<lineObj[]>([])
  const line2Obj = useRef<lineObj[]>([])

  const vel = useRef<number>(0)
  
  useEffect(() => {
    line1Elems.current = line1.current?.querySelectorAll('div')
    line2Elems.current = line2.current?.querySelectorAll('div')

    let xTot = 0
    for (let i = 0; i < line1Elems.current!.length; i++) {
      const el = line1Elems.current![i]
      const xInit = -xTot
      
      line1Obj.current.push({
        el,
        xInit,
        currentX:xInit,
      })

      gsap.set(el, {
        x: xInit
      })

      xTot += el.offsetWidth 
    }
    setLine1XTot(xTot)

    xTot = 0
    for (let i = 0; i < line2Elems.current!.length; i++) {
      const el = line2Elems.current![i]
      const xInit = el.offsetWidth * i
      
      line2Obj.current.push({
        el,
        xInit,
        currentX:xInit,
      })

      gsap.set(el, {
        x: xInit
      })

      xTot += el.offsetWidth 
    }    
    setLine2XTot(xTot)

    window.addEventListener('resize', () => {
      handleResize()
    })

    return () => {
      window.removeEventListener('resize', () => {
          handleResize()
      })
    }
  }, [])

  const handleResize = useDebouncedCallback(() => {
    vel.current = 0
    ctx.current.revert()

    let xTot = 0
    
    line1Obj.current.forEach((obj, i) => {
      obj.xInit = -xTot
      obj.currentX = -xTot

      obj.el.style.transform = `translateX(${-xTot}px)`

      xTot += obj.el.offsetWidth 
    })
    setLine1XTot(xTot)

    let xTot2 = 0
    line2Obj.current.forEach((obj, i) => {
      obj.xInit = xTot2
      obj.currentX = xTot2
      xTot2 += obj.el.offsetWidth 
    })
    setLine2XTot(xTot2)
  }, 200)

  useEffect(() => {      
    let velPrec = 0  
    ctx.current = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el.current,
        endTrigger: el.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: self => {      
          const velNow = clamp(0, 1, map(0, 500, 0, 1, Math.abs(self.getVelocity())))      
          const velLerp = lerp(velPrec, velNow, 0.92)
          vel.current = velLerp
          velPrec = velLerp
        }
      });
    });

    const speedFactor = 10;
    let animated = false;
    let fps = 60
    let fpsInterval = 1000 / fps
    let startTime = Date.now()
    let then = startTime
    let now, elapsed

    const anim = () => {
      
      raf.current = requestAnimationFrame(anim)

      now = Date.now();
      elapsed = now - then;
      
      if (elapsed > fpsInterval) {        
        line1Obj.current.forEach(obj => {
          const move = obj.currentX + vel.current * speedFactor + 1
          if(move > obj.el.offsetWidth) {            
            gsap.set(obj.el, {
              x: obj.currentX - line1XTot
            })
            obj.currentX -= line1XTot
          } else {
            gsap.set(obj.el, {
              x: move
            })
            obj.currentX = move
          }
        })
        
        line2Obj.current.forEach(obj => {
          const move = obj.currentX - vel.current * speedFactor - 1
          
          if(move < -obj.el.offsetWidth) {            
            gsap.set(obj.el, {
              x: obj.currentX + line2XTot
            })
            obj.currentX += line2XTot
          } else {
            gsap.set(obj.el, {
              x: move
            })
            obj.currentX = move
          }
        })

        vel.current = vel.current > 0.01 ? vel.current -= 0.01 : 0
      }
    }

    if(!animated) {
      animated = true;
      anim()
    }

    return () => {
      ctx.current.revert()
      cancelAnimationFrame(raf.current!)
    };
  }, [line1Elems, line2Elems, line1XTot, line2XTot])

  const getLine = (nb:number, text:string, iArrow:number = 3, way:string = 'toRight', line:number) => {
    let content = [];
    for (let i = 0; i < nb; i++) {
      content.push(
        <div 
          key={i} className={`inline-block absolute ${way === 'toRight' ? 'right-0 px-1' : 'left-0 px-5'} w-max uppercase`}>
            <span className={`${i === iArrow && line === 1 ? "before:mr-2 before:content-[url('/icons/right-arrow-violet.svg')]" : ""}`}>
              {i === iArrow ? <span className='text-violet'>{text}</span> : text }
            </span> 
        </div>
      );
    }
    return content;
  };


  return (
    <div ref={el} id="marquee" className={`${className} my-20 md:mt-48 md:mb-12 w-full overflow-hidden n27`}>
      <div 
        ref={line1}
        className={`relative w-full text-xl h-10 md:h-14 md:text-3xl`} 
        data-content={firstLine + ' '}>
          {  getLine(8, firstLine, 1, 'toRight', 1) }
        </div>
      <div 
        ref={line2}
        className={`relative w-full h-10 text-2xl md:text-6xl md:h-20`} 
        data-content={secondLine + ' '}>
          {  getLine(4, secondLine, 1, 'toLeft', 2) }
      </div>
    </div>
  )
}