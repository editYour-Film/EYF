import { RefObject } from "react"
import { FilesLibraryProps } from "./FilesLibrary"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"

export const useAnimation = (options: {wrapper:RefObject<HTMLDivElement>, onClose:FilesLibraryProps['onClose']}) => {
  const { contextSafe } = useGSAP(() => {
    gsap.set(options.wrapper.current, {
      y: window.innerHeight
    })
  }, {scope: options.wrapper})

  const open = contextSafe(() => {
    const tl = gsap.timeline()

    tl.to(options.wrapper.current, {
      y: 0,
      duration: 0.8,
      ease: 'expo.out'
    })
  })

  const close = contextSafe(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        options.onClose && options.onClose()
      }
    })

    tl.to(options.wrapper.current, {
      y: window.innerHeight,
      duration: 0.5,
      ease: 'power2.in'
    })
  })

  return {
    open,
    close
  }
}