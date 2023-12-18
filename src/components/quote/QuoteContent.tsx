import { useContext, useEffect, useRef } from "react"
import { SliderStep } from "./steps/SliderStep"
import { QuoteContext } from "./_context/QuoteContext"
import { CatalogStep } from "./steps/CatalogStep"
import { FilesStep } from "./steps/FilesStep"
import { Lenis, ReactLenis, useLenis } from "@studio-freight/react-lenis"
import Container from "../_shared/UI/Container"
import gsap from "gsap"
import { useWindowSize } from "@uidotdev/usehooks"

export const QuoteContent = () => {
  const quoteContext = useContext(QuoteContext)
  const lenis = useLenis()

  const step1 = useRef<HTMLDivElement>(null)
  const step2 = useRef<HTMLDivElement>(null)
  const step3 = useRef<HTMLDivElement>(null)

  const ww = useWindowSize()
  
  useEffect(() => {
    lenis && lenis.start()
    switch (quoteContext.currentStep) {
      case 0:
        lenis && lenis.scrollTo(0, {
          lock: true,
          onComplete: () => { lenis.stop() }
        })
        break;
      case 1:
        lenis && lenis.scrollTo(step2.current, {
          offset: step2.current ? -((window.innerHeight - step2.current?.offsetHeight) / 2) : 50,
          lock: true,
          onComplete: () => { lenis.stop() }
        })
        break;
      case 2:
        lenis && lenis.scrollTo(step3.current, {
          offset: step3.current ? -((window.innerHeight - step3.current?.offsetHeight) / 2) : 50,
          lock: true,
          onComplete: () => { lenis.stop() }
        })
        break;
      case 3:

        break
    }
    
  }, [quoteContext.currentStep, lenis, ww])

  return (
    <div className="quote-content flex flex-col gap-[100vh]">
      <div
        ref={step1}
        className=""
      >
        <ReactLenis
          // content={content.current}
          wrapper={step1.current}
          className={'h-screen overflow-scroll no-scroll-bar'}
        >
          
          <CatalogStep />
        </ReactLenis>
      </div>

      <Container
        className="flex flex-col gap-[100vh]"
      >

        <div
          ref={step2}
        >
          <SliderStep />
        </div>

        <div
          ref={step3}
        >
          <FilesStep />
        </div>
      </Container>
    </div>
  )
}