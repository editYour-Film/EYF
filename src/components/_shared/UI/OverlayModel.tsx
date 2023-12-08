import useMediaQuery from "@/hooks/useMediaQuery"
import { lockDocumentScroll, unLockDocumentScroll } from "@/utils/utils"
import { useLenis } from "@studio-freight/react-lenis"
import { useWindowSize } from "@uidotdev/usehooks"

import gsap from "gsap"
import { PropsWithChildren, useEffect, useRef, useState } from "react"

type OverlayModelProps = {
  className?: string,
  toggle?: boolean,
  onOpen?: () => void,
  onOpened?: () => void,
  onClose?: () => void,
  onClosed?: () => void

}

export const OverlayModel = ({className, toggle, onOpen, onOpened, onClose, onClosed, children}: PropsWithChildren<OverlayModelProps>) => {
  const lenis = useLenis()

  const [isOpen, setIsOpen] = useState(true)
  const [isTweening, setIsTweening] = useState(false)
  const isMobile = useMediaQuery('(max-width: 768px)')
  const wSize = useWindowSize()
  
  const container = useRef<HTMLDivElement>(null)
  const bg = useRef<HTMLDivElement>(null)

  const ctx = useRef<gsap.Context>()

  const tempScroll = useRef(0)

  const setGsapContext = () => {
    let context = gsap.context(() => {
      
      gsap.set(container.current, {
        y: isMobile ? 0 : window.innerHeight * 1.1,
        x: isMobile ? window.innerWidth : 0
      })

      gsap.set(bg.current, {
        opacity: 0
      })
    })

    context && context.add('open', () => {      
        const tl = gsap.timeline({
          onStart: () => {
            setIsOpen(true)
            setIsTweening(true)
            onOpen && onOpen()
          },
          onComplete: () => {
            setIsTweening(false)
            onOpened && onOpened()
          }
        })

        tl.fromTo(container.current, {
          y: isMobile ? 0 : window.innerHeight * 1.1,
          x: isMobile ? window.innerWidth : 0
        }, {
          y: 0,
          x: 0,
          ease: 'power3.out',
          duration: 0.6
        }, 0)
  
        tl.fromTo(bg.current, {
          opacity: 0
        }, {
          opacity: 0.7,
          ease: 'power3.out',
          duration: 0.6
        }, 0)

      return tl
    })

    context && context.add('close', () => {    
      const tl = gsap.timeline({
        onStart: () => {
          setIsOpen(false)
          setIsTweening(true)
        },
        onComplete: () => {
          setIsTweening(false)
        }
      })

      tl.to(container.current, {
        y: isMobile ? 0 : window.innerHeight * 1.1,
        x: isMobile ? window.innerWidth : 0,
        ease: 'power3.in',
        duration: 0.6
      }, 0)

      tl.fromTo(bg.current, {
        opacity: 0.7
      }, {
        opacity: 0,
        ease: 'power3.in',
        duration: 0.6
      }, 0)

      return tl
    })

    return context
  }

  useEffect(() => {
    ctx.current = setGsapContext()

    return () => {
      ctx.current && ctx.current.revert()
    }
  }, [])

  useEffect(() => {
    // ctx.current && ctx.current.revert()
    isOpen && handleClose()
    ctx.current = setGsapContext()

  }, [wSize])

  const handleClose = () => {
    if(isTweening) return

    onClose && onClose()

    unLockDocumentScroll(tempScroll.current)

    setIsTweening(true)

    container.current && container.current.scrollTo({top:0, left:0, behavior: 'smooth'})

    ctx.current && ctx.current.close().then(() => {
      setIsTweening(false)
      setIsOpen(false)	
      onClosed && onClosed()
    })
  }

  const handleOpen = () => { 
    if(isTweening) return

    tempScroll.current = lenis.scroll
    lockDocumentScroll(tempScroll.current)

    setIsTweening(true)
    ctx.current && ctx.current.open().then(() => {
      setIsTweening(false)
      setIsOpen(true)	
    })
  }

  useEffect(() => {    
    if(toggle === true) {      
      handleOpen()
    } else {
      handleClose()
    }
  }, [toggle])

  return (
    <>
      <div 
        ref={container}
        data-lenis-prevent
        className={`relative w-full flex justify-center md:py-[100px] overflow-scroll z-10 no-scroll-bar pointer-events-none`}
      >
        <div 
          className={`overlay-model md:p-dashboard-button-separation-spacing relative max-w-[876px] md:w-[80%] xl:w-[60%] md:min-h-[100vh] bg-dashboard-background-content-area border-03 rounded-dashboard-button-square-radius shadow-large ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'} ${className}`}
        >
          {children}
        </div>
      </div>


      <div 
        data-lenis-prevent
        ref={bg}
        onClick={ () => { handleClose() } }
        className={`modify-video__bg absolute top-0 left-0 w-full h-full bg-dashboard-button-dark blur-[5px] opacity-70 ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}></div>
      </>

  )
}