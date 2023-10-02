import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Title } from '../_shared/Title';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useInView } from 'react-intersection-observer';

type CreatorToEditorProps = {

}

export const CreatorToEditor = ({}:CreatorToEditorProps) => {
  const { ref: sectionInView, inView: inViewSection } = useInView({
    triggerOnce: true,
  });

  const pans = useRef<HTMLDivElement>(null)
  const creatorPan = useRef<HTMLDivElement>(null)
  const editorPan = useRef<HTMLDivElement>(null)
  const section = useRef<HTMLDivElement>(null)
  const img1 = useRef<HTMLImageElement>(null)

  const [showTitle1, setShowTitle1] = useState(false)
  const [showTitle2, setShowTitle2] = useState(false)

  useEffect(() => {
    sectionInView(section.current)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(img1.current, {
        yPercent: 0,
      })

      const triggerParralax = ScrollTrigger.create({
        trigger: section.current,
        start: 'top top',
        end: `top+=${window.innerHeight * 2} top`,
        id: 'triggerParralax',
        onUpdate: (self) => {          
          gsap.set(img1.current, {
            yPercent: -50 * self.progress,
          })
        }
      })

      const tlTop = gsap.timeline({
        paused: true
      })

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

      const triggerPanTop = ScrollTrigger.create({
        trigger: section.current,
        start: 'top top',
        end: `top+=${window.innerHeight} top`,
        id: 'triggerPan',
        onUpdate: (self) => {
          if (self.progress > 0.5) inViewSection && setShowTitle1(true)
          else setShowTitle1(false)
          
          tlTop.progress(self.progress)
        }
      })


      const tlLeft = gsap.timeline({
        paused: true
      })
      tlLeft.fromTo(editorPan.current, {
        xPercent: 0,
        x: 0,
      },{
        xPercent: -100,
        x: -60,
        ease: 'power2.out'
      })

      const triggerPanLeft = ScrollTrigger.create({
        trigger: section.current,
        start: `top+=${window.innerHeight} top`,
        end: `top+=${window.innerHeight * 2} top`,
        id: 'triggerPan',
        onUpdate: (self) => {
          if (self.progress > 0.3) inViewSection && setShowTitle2(true)
          else setShowTitle2(false)
          
          tlLeft.progress(self.progress)
        }
      })
    })

    return () => {
      ctx.revert()
    }
  }, [inViewSection])

  return (
    <>
    <div ref={section} className="creator-to-editor h-[300vh] mt-52">
      <div className='h-screen w-full sticky top-0 perspective overflow-hidden'>
        <div className="creator-to-editor__firstImg relative w-full z-0">
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

        <div ref={pans} className="creator-to-editor__content absolute top-0 flex flex-row w-full rounded-t-[60px] h-[calc(100%+60px)] overflow-hidden z-10">
          <div className="absolute top-0 left-0 h-full w-full gradient-text"></div>
          <div 
            ref={creatorPan} 
            className={`creator-to-editor__creator-pan relative text-title-large lg:text-[260px] font-medium flex justify-center items-center h-full w-full basis-full shrink-0 z-0 bg-black mix-blend-darken ${showTitle1 ? 'inView' : ''}`}>
            <Title titleType='none' anim charDelay={'0.03s'} className='pt-[60px]'>Créateur</Title>
          </div>
          <div ref={editorPan} className={`creator-to-editor__editor-pan absolute bottom-0 left-[calc(100%+60px)] h-screen w-[calc(100%+60px)] basis-full shrink-0 z-10 overflow-hidden ${showTitle2 ? 'inView' : ''}`}>
            <div className='absolute top-0 left-1/2 w-full h-1/2 bg-signin opacity-100 z-0'></div>
            <div 
              className='absolute top-0 left-0 w-full h-full text-title-large lg:text-[260px] font-medium rounded-l-[60px] flex justify-center items-center z-10 text-black bg-white mix-blend-lighten'
            >
              <Title titleType='none' anim fromRight charDelay={'0.1s'} className='pl-[60px]'>Monteur</Title>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="creator-to-editor__lastImg w-full overflow-hidden">
      <div className='relative w-full h-0 pb-[30%]'>
        <Image 
          src='/img/home/creator.jpg'
          alt='creator'
          className='absolute top-0 left-0 width-full h-full object-cover'
          fill
        />
      </div>
    </div>
    </>
  )
}