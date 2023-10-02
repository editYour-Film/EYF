import { H1 } from "../_shared/typography/H1";
import Image from "next/image";
import { H2 } from "../_shared/typography/H2";
import { EditorJsParser } from "@/utils/EditorJsParser";
import { Fragment, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Title } from "../_shared/Title";
import useMediaQuery from "@/hooks/useMediaQuery";

export const NewWaySection = ({data}:any) => {
  const section = useRef(null)
  const img1 = useRef(null)
  const img1W = useRef(null)

  const img2 = useRef(null)
  const img2W = useRef(null)
  const [inView, setInView] = useState(false);

  const scrollAnim = useMediaQuery('(min-width: 1024px)')

  const setImgTl = (img:HTMLDivElement, wrapper:HTMLDivElement, way:-1|1) => {
    const offset = 10 * way

    const imgTl = gsap.timeline({
      paused: true,
      defaults: {
        ease: 'power2.inOut'
      }
    })

    imgTl.fromTo(wrapper, {
      xPercent: offset
    },{
      xPercent: 0
    }, 0)

    imgTl.fromTo(img, {
      scale: 1
    },{
      scale: 1.05
    }, 0)

    return imgTl
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      const imgTl1:GSAPTimeline|undefined = scrollAnim && img1.current && img1W.current ? setImgTl(img1.current, img1W.current, 1) : undefined;
      const imgTl2:GSAPTimeline|undefined = scrollAnim && img2.current && img2W.current ? setImgTl(img2.current, img2W.current, -1) : undefined;
  
      const trigger = ScrollTrigger.create({
        trigger: section.current,
        start: 'top bottom',
        end: 'bottom top',
        // markers: true,
        onUpdate: (self) => {
          self.progress > 0.1 && setInView(true)
          
          if (scrollAnim) {
            scrollAnim && imgTl1 && imgTl1.progress(self.progress * 2)
            scrollAnim && imgTl2 && imgTl2.progress(self.progress * 2 - 0.5)
          }
        }
      })
    })

    return () => {
      ctx.revert()
    }
  }, [scrollAnim])

  return (
    <div ref={section} className="two-imgs relative grid grid-cols-[1fr] grid-rows-[auto] lg:grid-cols-[1fr_1fr] lg:grid-rows-[1fr_0.5fr_0.5fr_1fr] gap-x-44 my-10 md:my-40 z-10 w-full overflow-hidden">
      <div className={`px-4 lg:row-start-1 lg:row-end-2 lg:col-start-1 lg:col-end-2 lg:justify-self-center xl:max-w-md ${inView && 'inView'}`}>
        <H2 arrow fake>{data.suptitle}</H2>
        <Title titleType="h1" fake anim className="mt-4 leading-[110%]">
          {data.title}
        </Title>
      </div>

      <div className="px-4 lg:px-0 text-base-text relative self-end opacity-80 mt-4 lg:row-start-4 lg:row-end-5 lg:col-start-2 lg:col-end-3 lg:pr-20 z-10">
        <EditorJsParser JSONContent={data.rich_content} />
      </div>

      <div className="two-img__img1 mb-10 lg:mb-0 relative overflow-hidden row-start-1 row-end-2 lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3 z-10">
        <div 
          ref={img1W}
          className="relative w-full h-0 pb-[100%] lg:pb-[130%] rounded-3xl lg:rounded-l-3xl overflow-hidden">
          <Image
            ref={img1}
            src={data.img.data.attributes.url}
            alt={data.img.data.attributes.alternativeText}
            width={416}
            height={670}
            className="absolute top-0 w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="two-img__img2 hidden lg:block relative lg:row-start-2 lg:row-end-5 lg:col-start-1 lg:col-end-2 z-10">
        <div 
          ref={img2W}
          className="relative w-full h-0 pb-[130%] rounded-r-3xl overflow-hidden">
          <Image
            ref={img2}
            src={data.img.data.attributes.url}
            alt={data.img.data.attributes.alternativeText}
            width={416}
            height={670}
            className="absolute top-0 w-full h-full object-cover"
          />
        </div>
      </div>
    
      <div className="absolute -z-1 bg-top-section w-[800px] h-[700px] left-[30%] opacity-30 "></div>
    </div>
  );
};
