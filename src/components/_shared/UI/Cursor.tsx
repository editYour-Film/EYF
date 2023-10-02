import { useRef, useState, useEffect } from "react"
import {lerp, clamp, map} from "@/utils/Math"
import { useSelector, useDispatch } from 'react-redux'

import { gsap } from "gsap"
import { toRegular } from "@/store/slices/cursorSlice"
import {RootState} from "@/store/store"
import { TextSplit } from "@/utils/TextSplit"

export const Cursor = () => {
  const state = useSelector((state: RootState) => state.cursor.value)
  const cursor = useRef<HTMLDivElement>(null)
  const shape = useRef<HTMLDivElement>(null)
  const playTitle = useRef<HTMLDivElement>(null)

  const dispatch = useDispatch()

  const posX = useRef(0)
  const posY = useRef(0)
  const posXPrev = useRef(0)
  const posYPrev = useRef(0)
  const x = useRef(0)
  const y = useRef(0)
  const ctx = useRef<gsap.Context>()
  const raf = useRef(0)

  const regularScale = 0.4;
  const textScale = 1.4;

  const regularBorder = 3;
  const scaledBorder = 3 / (textScale / regularScale);

  const started = useRef(false);

  const [text, setText]= useState<any>('')
  const [showText, setShowText]= useState<boolean>(false)

  useEffect(() => {
    switch(state) {
      case 'click':        
        handleClick()
        break;
      case 'watch':      
        handleWatch()
        break;
      case 'pause':      
        handlePause()
        break;
      case 'regular':        
        handleRegular()
        break;
      case 'swipe':        
        handleSwipe()
        break;
      case 'mute':     
        handleMute()
        break;
      case 'unmute':     
        handleUnmute()
        break;
    }
  }, [state])

  const textAnim = (text:string) => {
    const tl = gsap.timeline()
    
    tl.call(() => {
      setShowText(false)
    }, [], 0)

    tl.to(cursor.current, {
      scale: textScale,
      borderWidth: scaledBorder,
      duration: 0.6,
      ease: 'back.inOut',
    })

    tl.call(() => {
      setText(text)
    }, [], 0.2)

    tl.call(() => {
      setShowText(true)
    }, [], 0.3)

  }

  const handleClick = () => {
    gsap.to(cursor.current, {
      scale: 0.4,
      duration: 0.6,
      ease: 'back.inOut'
    })
  }

  const handleWatch = () => {
    textAnim('play')
  }

  const handlePause = () => {
    textAnim('pause')
  }

  const handleSwipe = () => {
    const tl = gsap.timeline()
    tl.to(shape.current, {
      scale: 3,
      duration: 0.6,
      ease: 'back.inOut'
    }, 0)
    tl.to(shape.current, {
      xPercent: -80,
      duration: 0.6,
      ease: 'power2.inOut'
    }, '-=0.2')
    tl.to(shape.current, {
      xPercent: 120,
      duration: 0.6,
      ease: 'power2.inOut'
    })
    tl.to(shape.current, {
      xPercent: 0,
      duration: 0.6,
      ease: 'power2.inOut'
    })
    tl.call(() => {
      dispatch(toRegular())
    })
  }

  const handleRegular = () => {
    setShowText(false)

    gsap.to(cursor.current, {
      scale: regularScale,
      borderWidth: regularBorder,
      ease: 'back.inOut',
      onComplete: () => {
        setText('')
      }
    })
  }

  const handleMute = () => {   
    textAnim('mute')
  }

  const handleUnmute = () => {
    textAnim('unmute')
  }

  const getVel = (xPrev:number, x:number, yPrev:number, y:number) => {
    return Math.sqrt((x - xPrev) ** 2 + (y - yPrev) ** 2)
  }

  const handleMouseMove = (event: MouseEvent) => {
    posX.current = event.clientX
    posY.current = event.clientY
    
    const vel = getVel(posXPrev.current, posX.current, posYPrev.current, posY.current);
    const clampedVel = clamp(0, 1, map(0, 30, 0, 1, vel))
  }

  useEffect(() => {    
    window.addEventListener('mousemove' , (e) => {
      handleMouseMove(e)
    })

    ctx.current = gsap.context(() => {
      gsap.set(cursor.current, {
        x: posX.current,
        y: posY.current
      })
    })

    const start = Date.now()
    let then = start
    let fps = 30
    let fpsInterval = 1000 / fps

    const anim = () => {
      raf.current = requestAnimationFrame(anim)
      
      const now = Date.now()
      const delta = now - then
      const time = now - start
      const ratio = time % fpsInterval / fpsInterval

      x.current = lerp(posXPrev.current, posX.current, ratio)
      y.current = lerp(posYPrev.current, posY.current, ratio)

      if (delta > fpsInterval) {        
        posXPrev.current = posX.current
        posYPrev.current = posY.current

        then = now - (delta % fpsInterval);
      }

      gsap.set(cursor.current, {
        x: x.current - shape.current?.offsetWidth! / 2,
        y: y.current - shape.current?.offsetHeight! / 2,
      })
    }

    if(!started.current) {
      anim()
    }

    return () => {
      window.addEventListener('mousemove' , (e) => {
        handleMouseMove(e)
      })

      ctx.current?.revert()

      cancelAnimationFrame(raf.current)
    }
  }, [])

  return (
    <div className="fixed top-0 left-0 w-full h-full z-cursor pointer-events-none">
      <div ref={cursor} className="absolute w-[60px] h-[60px] flex justify-center items-center backdrop-blur-[3px] rounded-full border-white border-[3px] overflow-hidden">
        <div ref={shape} className="absolute w-full h-full origin-center translate-z-0" >
          {/* <div className="absolute top-0 left-0 w-full h-full scale-120 rounded-full"></div> */}
          <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[100%] h-[100%] bg-cursor z-20 opacity-30"></div>
        </div>
        <CursorText active={showText} text={text} /> 
      </div>
    </div>
  )
}

type CursorTextProps = {
  text: string,
  active: boolean
}

const CursorText = ({text, active}: CursorTextProps) => {
  return (
    <div className={`${active ? 'active' : ''} anim-cursor relative z-10 flex w-full justify-center items-center h-max translate-y-[10%]`}>
      <TextSplit input={text} type='word'/>
    </div>
  )
}