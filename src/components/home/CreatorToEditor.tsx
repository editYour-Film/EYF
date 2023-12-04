import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Title } from '../_shared/Title';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useInView } from 'react-intersection-observer';
import { useWindowSize } from '@uidotdev/usehooks';

type CreatorToEditorProps = {

}

export const CreatorToEditor = ({}:CreatorToEditorProps) => {
  const { ref: sectionInView, inView: inViewSection } = useInView({
    triggerOnce: true,
  });

  const ww = useWindowSize()

  const pans = useRef<HTMLDivElement>(null)
  const creatorPan = useRef<HTMLDivElement>(null)
  const editorPan = useRef<HTMLDivElement>(null)
  const editorPanInner = useRef<HTMLDivElement>(null)

  const section = useRef<HTMLDivElement>(null)
  const img1 = useRef<HTMLImageElement>(null)

  const [showTitle1, setShowTitle1] = useState(false)
  const [showTitle2, setShowTitle2] = useState(false)

  useEffect(() => {
    sectionInView(section.current)
  }, [])

  useEffect(() => {
    let ctx:gsap.Context

      ctx = gsap.context(() => {
        gsap.set(img1.current, {
          yPercent: 0,
        })
  
        const triggerParralax = ScrollTrigger.create({
          trigger: section.current,
          start: 'top top',
          end: `top+=${window.innerHeight * 2} top`,
          id: 'triggerParralax',
          onUpdate: (self) => {  
            if(ww.width && ww.width > 1024) {
              gsap.set(img1.current, {
                yPercent: -50 * self.progress,
              })
            }        
          }
        })
  
        const tlTop = gsap.timeline({
          paused: true
        })
        
        if(ww.width && ww.width > 1024) {
          tlTop.fromTo(pans.current, {
            yPercent: 100,
            y: 0,
            rotateX: 5
          },{
            yPercent: 0,
            y: -60,
            rotateX: 0,
            ease: 'power2.out'
          })
        }
  
        const triggerPanTop = ScrollTrigger.create({
          trigger: section.current,
          start: 'top top',
          end: `top+=${window.innerHeight} top`,
          id: 'triggerPan',
          markers: true,
          onUpdate: (self) => {
            if (self.progress > 0.3) inViewSection && setShowTitle1(true)
            else setShowTitle1(false)
            
            if(ww.width && ww.width > 1024) tlTop.progress(self.progress)
          }
        })
  
  
        const tlLeft = gsap.timeline({
          paused: true
        })

        if(ww.width && ww.width > 1024) {
          tlLeft.fromTo([creatorPan.current!.querySelectorAll('.title'), creatorPan.current!.querySelectorAll('.creator-to-editor__imgs')], {
            xPercent: 0,
          },{
            xPercent: -20,
            duration: 0.3,
            ease: 'power3.inOut'
          }, 0.1)
    
          tlLeft.fromTo(editorPan.current, {
            xPercent: 0,
            x: 0,
          },{
            xPercent: -100,
            x: -60,
            ease: 'power2.inOut'
          }, 0)
    
          tlLeft.fromTo(editorPanInner.current, {
            xPercent: -100,
          },{
            xPercent: 0,
            ease: 'power2.inOut'
          }, 0)
    
          tlLeft.fromTo([editorPanInner.current!.querySelectorAll('.title'), editorPanInner.current!.querySelectorAll('.creator-to-editor__imgs')], {
            xPercent: 50,
          },{
            xPercent: 0,
            ease: 'power3.inOut'
          }, 0)
        }
  
        const triggerPanLeft = ScrollTrigger.create({
          trigger: section.current,
          start: `top+=${window.innerHeight} top`,
          end: `top+=${window.innerHeight * 2} top`,
          id: 'triggerPan',
          onUpdate: (self) => {
            if (self.progress > 0.3) inViewSection && setShowTitle2(true)
            else setShowTitle2(false)
            
            if(ww.width && ww.width > 1024) tlLeft.progress(self.progress)
          }
        })
      })

    return () => {
      ctx && ctx.revert()
    }
  }, [ww, inViewSection])

  return (
    <div ref={section} className="creator-to-editor lg:h-[300vh]">
      <div className='lg:h-screen w-full lg:sticky top-0 perspective overflow-hidden'>
        <div className="creator-to-editor__firstImg relative w-full z-0 mb-[80px] lg:mb-0">
          <div className='relative w-full h-screen lg:h-0 lg:pb-[62%] overflow-hidden'>
            <Image 
              ref={img1}
              src='/img/home/creator.jpg'
              alt='creator'
              className='absolute top-0 left-0 width-full h-full object-cover'
              fill
            />
          </div>
        </div>

        <div ref={pans} className="creator-to-editor__content lg:absolute top-0 flex flex-col gap-[180px] lg:gap-0 lg:flex-row w-full rounded-t-[12px] h-[calc(100%+60px)] overflow-hidden z-10">
          <div 
            ref={creatorPan} 
            className={`creator-to-editor__creator-pan relative flex flex-col lg:flex-row lg:pl-[167px] fullHd:px-[167px] justify-start lg:justify-between gap-[84px] lg:gap-dashboard-spacing-element-medium lg:items-center h-full w-full basis-full shrink-0 z-0 bg-black ${showTitle1 ? 'inView' : ''}`}
          >
            <div className='flex flex-col basis-1/2 max-w-[450px] grow-0 text-title-large font-medium px-10 lg:px-0'>
              <div>
                <Title titleType='none' anim={ww.width && ww.width > 1024 ? true : false} charDelay={'0.03s'} className='text-dashboard-text-title-white-high'>Imaginé pour les</Title>
              </div>
              <div>
                <Title titleType='none' anim={ww.width && ww.width > 1024 ? true : false} charDelay={'0.03s'} className='text-linear-sunset' isSunset>créateur.ices de contenus</Title>
              </div>
            </div>

            <div className='creator-to-editor__imgs relative w-full lg:w-full lg:basis-1/2 2xl:basis-auto grow-0 flex justify-end'>
              <div className='relative w-[calc(100%-70px)] lg:w-auto'>
                <Image 
                  src='/img/home/mockup1_desktop.png'
                  width={762}
                  height={563}
                  alt="interface de l\'application"
                  className=''
                />
                <Image 
                  src='/img/home/mockup1_phone.png'
                  width={250}
                  height={526}
                  alt="interface de l\'application"
                  className='absolute top-[40px] -left-[30px] h-full w-auto'
                />
              </div>
            </div>
          </div>

          <div ref={editorPan} className={`creator-to-editor__editor-pan lg:absolute bottom-0 left-[calc(100%+60px)] lg:h-screen w-[calc(100%+60px)] basis-full shrink-0 z-10 overflow-hidden ${showTitle2 ? 'inView' : ''} bg-blackBerry`}>
            <div ref={editorPanInner} className='lg:absolute top-0 left-0 w-full lg:h-full'>
              <div 
                className='lg:absolute top-0 left-0 w-full h-full rounded-l-[60px] lg:pr-[167px] fullHd:pl-[227px] fullHd:pr-[167px] flex flex-col lg:flex-row justify-between lg:items-center gap-[84px] lg:gap-dashboard-spacing-element-medium z-10 '
              >
                <div className='lg:order-1 w-[390px] flex flex-col text-title-large font-medium px-10 lg:px-0'>
                  <div>
                    <Title titleType='none' anim={ww.width && ww.width > 1024 ? true : false} charDelay={'0.03s'} className='text-dashboard-text-title-white-high'>Et pensé pour les</Title>
                  </div>
                  <div className='text-linear-sunset'>
                    <Title titleType='none' anim={ww.width && ww.width > 1024 ? true : false} charDelay={'0.03s'} isSunset>monteurs.se.s</Title>
                  </div>
                </div>

                <div className='creator-to-editor__imgs lg:order-0 relative w-[70%] lg:w-auto lg:basis-1/2 2xl:basis-auto grow-0 flex lg:justify-end'>
                  <Image 
                    src='/img/home/mockup2_desktop.png'
                    width={762}
                    height={563}
                    alt="interface de l\'application"
                  />
                  <Image 
                    src='/img/home/mockup2_phone.png'
                    width={250}
                    height={526}
                    alt="interface de l\'application"
                    className='absolute top-[40px] -right-[30px] h-full w-auto'
                  />
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}