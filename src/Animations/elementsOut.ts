import gsap from "gsap"

type CbType = {
  onStart?: Function, 
  onComplete?: Function
}

export const ElementsOut = (elements:Element[], callbacks: CbType = {}) => {
  const tl = gsap.timeline({
    onStart: () => {
      callbacks.onStart && callbacks.onStart()
    },
    onComplete: () => {
      callbacks.onComplete&& callbacks.onComplete()
    }
  })

  elements.forEach((element, i) => {
    tl.to(element, {
      x: -50,
      opacity: 0,
      stagger: 0.1,
      ease: 'power.in',
      duration: 0.5
    }, i * 0.05)
  });

}