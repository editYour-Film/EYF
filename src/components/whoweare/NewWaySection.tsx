import Image from "next/image";
import { EditorJsParser } from "@/utils/EditorJsParser";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import useMediaQuery from "@/hooks/useMediaQuery";
import { ClassicContent } from "../_shared/UI/ClassicContent";
import { map } from "@/utils/Math";

export const NewWaySection = ({ data }: any) => {
  const section = useRef(null);
  const img1 = useRef(null);
  const img1W = useRef(null);

  const img2 = useRef(null);
  const img2W = useRef(null);
  const [inView, setInView] = useState(false);

  const isMobile = useMediaQuery("(max-width: 1024px)");

  const setImgTl = (
    img: HTMLDivElement,
    wrapper: HTMLDivElement,
    way: -1 | 1
  ) => {
    const offset = (isMobile ? 50 : 10) * way;

    const imgTl = gsap.timeline({
      paused: true,
      defaults: {
        ease: "power2.inOut",
      },
    });

    imgTl.fromTo(
      wrapper,
      {
        xPercent: offset,
      },
      {
        xPercent: 0,
        ease: "power3.inOut",
      },
      0
    );

    imgTl.fromTo(
      img,
      {
        scale: 1,
      },
      {
        scale: 1.05,
      },
      0
    );

    return imgTl;
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const imgTl1: GSAPTimeline | undefined =
        img1.current && img1W.current
          ? setImgTl(img1.current, img1W.current, 1)
          : undefined;
      const imgTl2: GSAPTimeline | undefined =
        img2.current && img2W.current
          ? setImgTl(img2.current, img2W.current, -1)
          : undefined;

      ScrollTrigger.create({
        trigger: section.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          self.progress > 0.1 && setInView(true);

          if (isMobile) {
            imgTl1 && imgTl1.progress(map(0, 0.6, 0, 1, self.progress));
            imgTl2 && imgTl2.progress(map(0, 0.6, 0, 1, self.progress) - 0.1);
          } else {
            imgTl1 && imgTl1.progress(self.progress * 2);
            imgTl2 && imgTl2.progress(self.progress * 2 - 0.5);
          }
        },
      });
    });

    return () => {
      ctx.revert();
    };
  }, [isMobile]);

  return (
    <div
      ref={section}
      className="two-imgs relative grid grid-cols-[1fr_1fr] grid-rows-[auto_80px_auto_auto] lg:grid-rows-[auto_auto_auto_auto] gap-y-dashboard-spacing-element-medium lg:gap-y-[100px] gap-x-[45px] lg:gap-x-[85px] my-10 md:my-40 z-10 w-full overflow-hidden"
    >
      <ClassicContent
        className="w-full px-4 row-start-1 row-end-2 col-start-1 col-end-3 lg:col-start-1 lg:col-end-2 lg:justify-self-end xl:max-w-[80%]"
        suptitle={data.suptitle}
        suptitleClassName="text-linear-sunset"
        title={data.title}
        titleType="h2"
        titleClassName="text-title-medium"
        paragraph={data.content}
      />

      <div className="px-4 lg:px-0 text-base-text relative self-end opacity-80 mt-4 row-start-4 col-start-1 col-end-3 lg:row-start-3 lg:row-end-4 lg:col-start-2 lg:col-end-3 lg:pr-20 z-10 xl:max-w-[80%]">
        <EditorJsParser JSONContent={data.rich_content} />
      </div>

      {data.img && data.img.data && (
        <>
          <div className="two-img__img1 mb-10 lg:mb-0 relative overflow-hidden row-start-2 row-end-4 col-start-2 col-end-3 lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3 z-10">
            <div
              ref={img1W}
              className="relative w-full h-0 pb-[150%] lg:pb-[130%] rounded-3xl lg:rounded-l-3xl overflow-hidden"
            >
              <Image
                ref={img1}
                src={data.img.data.attributes.url}
                alt={data.img.data.attributes.alternativeText}
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="two-img__img2 relative row-start-3 row-end-4 lg:row-start-2 lg:row-end-4 col-start-1 col-end-2 lg:col-start-1 lg:col-end-2 z-10">
            <div
              ref={img2W}
              className="relative w-full h-0 pb-[200%] lg:pb-[130%] rounded-r-3xl overflow-hidden"
            >
              <Image
                ref={img2}
                src={data.img2.data.attributes.url}
                alt={data.img2.data.attributes.alternativeText}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </>
      )}
      <div className="absolute -z-1 bg-top-section w-[800px] h-[700px] left-[30%] opacity-30 "></div>
    </div>
  );
};
