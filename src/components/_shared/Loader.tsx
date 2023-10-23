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
      className="fixed w-full h-full flex justify-center items-center origin-center border-05 bg-black"
    >
      <EYFLogo className="z-10" />

      <div className="absolute w-full h-full bottom-0 z-0 overflow-hidden">
        <div className="absolute w-[2000px] h-[500px] -left-96 bottom-0 opacity-[0.9] translate-y-[75%] bg-top-section"></div>
        <div className="absolute w-[1500px] h-[500px] -right-96 bottom-0 translate-y-[50%] bg-top-section-2"></div>
      </div>
    </div>
  </div>
  )
}