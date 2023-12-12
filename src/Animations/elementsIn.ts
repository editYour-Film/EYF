import gsap from "gsap"

type CbType = {
  onStart?: Function, 
  onComplete?: Function
}

export const ElementsIn = (elements:Element[], callbacks: CbType = {}) => {
  const tl = gsap.timeline({
    onStart: () => {
      callbacks.onStart && callbacks.onStart()
    },
    onComplete: () => {
      callbacks.onComplete&& callbacks.onComplete()
    }
  })

  elements.forEach((element, i) => {
    tl.from(element, {
      x: 50,
      opacity: 0,
      stagger: 0.1,
      ease: 'power2.out',
      duration: 0.6
    }, i * 0.05)
  });
}