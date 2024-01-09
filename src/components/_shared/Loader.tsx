import { useEffect, useRef } from "react";
import EYFLogo from "../../../public/icons/logo.svg";
import { gsap } from "gsap";

type loaderProps = {
  isLoading: boolean
}

export const Loader = ({isLoading}:loaderProps) => {
  const loader = useRef<any>()

  useEffect(() => {    
    if (!isLoading) {
      gsap.to(loader.current, {
        yPercent: -110
      })
    }
  }, [isLoading])

  return (
    <div className="loader fixed w-full h-full top-0 left-0 perspective z-transition pointer-events-none">
    <div
      ref={loader}
      className="fixed w-full h-full flex justify-center items-center origin-center border-05 bg-blackBerry"
    >
      <EYFLogo className="z-10 w-[70px] h-[70px]" />

      <div className="absolute w-full h-full bottom-0 z-0 overflow-hidden">
        <div className="absolute w-[600px] h-[600px]  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-25 rotate-[35deg] blur-[100px] bg-radial-gradient"></div>
      </div>
    </div>
  </div>
  )
}