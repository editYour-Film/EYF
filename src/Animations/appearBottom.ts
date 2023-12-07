import gsap from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

type appearBottomArgs = {
  elmts:GSAPTweenTarget, 
  liteY?:boolean,
  rotateX?:boolean,
}

export const appearBottom = ({elmts, liteY, rotateX}:appearBottomArgs) => {
  const tl = gsap.timeline()

  tl.fromTo(elmts, {
    y: liteY ? 50 : 400,
    rotateX: rotateX ? 10 : 0
  }, {
    y: 0,
    rotateX: 0,
    duration: 1.5,
    ease: 'expo'
  }, 0)

  tl.fromTo(elmts, {
    opacity: 0,
  }, {
    opacity: 1,
    duration: 1.5,
    ease: 'power2'
  }, 0)

  return tl
}

const titleTimeline = (title:Element, isPaused?: boolean) => {
  const tl = gsap.timeline({
    paused: isPaused
  })

  const elmts = Array.from(title.querySelectorAll('*[data-split-line-index]'))
   
  let lineIndex = 0
  let _line:HTMLElement[] = []
  let lines:HTMLElement[][] = []  

  elmts.map((el, i) => {
    if((el as HTMLElement).dataset.splitLineIndex === lineIndex.toString()) {
      _line.push((el as HTMLElement))
      if(i === elmts.length - 1) {
        lines.push(_line)   
      }
    }
    else {
      if(i === elmts.length - 1) _line.push((el as HTMLElement))
      lines.push(_line)
      _line = [(el as HTMLElement)]
      lineIndex++
    } 
  })  

  
  lines.forEach((line, i) => {  
    tl.fromTo(line, {
      opacity: 0,
    }, {
      opacity: 1,
      duration: 1,
      ease: 'power2.in',
      stagger: 0.05
    }, 0.2 * i)

    tl.fromTo(line, {
      y: 40,
    }, {
      y: 0,
      duration: 4,
      stagger: 0.15,
      ease: 'expo',
    }, 0.2 * i)

    tl.fromTo(line.map((el) => el.querySelectorAll('.split-char')), {
      y: 30,
    }, {
      y: 0,
      duration: 4,
      stagger: 0.01,
      ease: 'expo',
    }, 0.2 * i)
  })

  return tl
}

type appearBottomTitleArgs = {
  title:Element,
  liteY?:boolean
}

export const appearBottomTitle = ({title}:appearBottomTitleArgs) => {
  let tl:GSAPTimeline

  const ctx = gsap.context(() => {
    tl = titleTimeline(title, true)
    return () => {
      trigger.kill()
    }
  })
  
  const trigger = ScrollTrigger.create({
    trigger: title,
    start: `top+=${window.innerHeight * 0.2} bottom`,
    end: `top+=${window.innerHeight * 0.2 + 500} bottom`,
    id: 'title',

    onUpdate: (self) => {
      tl.progress(self.progress)
    }
  })

  return ctx
}

const classicContentTl = (suptitle?:Element | null, title?:Element | null, parapgraph?:Element | null, cta?:Element | null) => {
  const tl = gsap.timeline({paused: true})

  if (suptitle) {
    tl.fromTo(suptitle, {
      opacity: 0,
    }, {
      opacity: 1,
      duration: 1,
      ease: 'power2.in',
      stagger: 0.05
    }, 0)

    tl.fromTo(suptitle, {
      y: 60,
    }, {
      y: 0,
      duration: 4,
      stagger: 0.15,
      ease: 'expo',
    }, 0)
  }

  tl.addLabel('title', '<+=0.5')
  title && tl.add(titleTimeline(title, false), 'title')
  

  if (parapgraph) {
    tl.addLabel('paragraph', '<+=0.5')

    tl.fromTo(parapgraph, {
      opacity: 0,
    }, {
      opacity: 1,
      duration: 1,
      ease: 'power2.in',
    }, 'paragraph')

    tl.fromTo(parapgraph, {
      y: 60,
    }, {
      y: 0,
      duration: 4,
      ease: 'expo',
    }, 'paragraph')
  }

  if (cta) {
    tl.addLabel('cta', '<+=0.5')

    tl.fromTo(cta, {
      opacity: 0,
    }, {
      opacity: 1,
      duration: 1,
      ease: 'power2.in',
    }, 'cta')

    tl.fromTo(cta, {
      y: 60,
    }, {
      y: 0,
      duration: 4,
      ease: 'expo',
    }, 'cta')
  }

  return tl
}

type appearBottomClassicContentArgs = {
  wrapper: Element | null,
  suptitle?:Element | null,
  title:Element | null,
  parapgraph?:Element | null,
  cta?: | null,
}

export const appearBottomClassicContent = ({wrapper, suptitle, title, parapgraph, cta}:appearBottomClassicContentArgs) => {
  let tl: GSAPTimeline
  const ctx = gsap.context(() => {
    tl = classicContentTl(suptitle, title, parapgraph, cta)

    return () => {
      trigger.kill()
    }
  })
  
  const trigger = ScrollTrigger.create({
    trigger: wrapper,
    start: `top+=${window.innerHeight * 0.2} bottom`,
    end: `top+=${window.innerHeight * 0.2 + 500} bottom`,
    id: 'classic-content',

    onUpdate: (self) => {
      tl.progress(self.progress)
    }
  })

  return ctx
}