import { useState, useRef, RefObject, useEffect } from "react";
import Button from "../_shared/form/Button";
import { Title } from "../_shared/Title";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import useMediaQuery from "@/hooks/useMediaQuery";
import { lerp, map, clamp } from "@/utils/Math";
import { useDispatch } from "react-redux";
import { setJoinBetaVisible } from "../../store/slices/joinBetaSlice"
import { toMute, toRegular, toUnmute } from "@/store/slices/cursorSlice";

import { CloudinaryImage, CloudinaryVideo } from "@cloudinary/url-gen";
import { format } from "@cloudinary/url-gen/actions/delivery";
import { auto } from "@cloudinary/url-gen/qualifiers/format";
import {AdvancedVideo} from '@cloudinary/react';

gsap.registerPlugin(ScrollTrigger);

export const TopVideoSection = ({ data }: any) => {
  const isMobileScreen = useMediaQuery("(max-width: 768px)");
  const isTabletScreen = useMediaQuery(
    "(min-width: 768px) && (max-width: 1024px)"
  );
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const main = useRef<any>();
  const [inView, setInView] = useState<boolean>(false);

  const title = useRef<any>();
  const sticky = useRef<any>();
  const videoW = useRef<any>();
  const gradient1 = useRef<any>();
  const gradient2 = useRef<any>();

  const dispatch = useDispatch()

  useEffect(() => {
    if (isDesktop) {
      const ctx = gsap.context(() => {
        const scaleSpeed = 0.1;
        const scaleSpeedTitle = 0.05;

        let prevProgTitle = 0;
        let prevProgVid = 0;

        gsap.set(videoW.current, {
          scale: 1.15,
          rotateX: 10,
          yPercent: 100,
        });

        const setTopSticky = () => {
          gsap.set(sticky.current, {
            top: Math.floor(
              (window.innerHeight - videoW.current?.offsetHeight) / 2
            ),
          });
        };

        window.addEventListener("resize", () => {
          setTopSticky();
        });

        setTopSticky();

        gsap.set([gradient1.current, gradient2.current], {
          opacity: 0.1,
        });

        ScrollTrigger.create({
          trigger: main.current,
          start: `top-=${window.innerWidth > 768 ? '120px' : '112px'} top`,
          end: "bottom",
          onEnter: () => {
            vidRef.current?.play();
          },
          onLeave: () => {
            vidRef.current?.pause();
          },
          onUpdate: (self) => {
            if (self.progress > 0.01) setInView(true);
            vidRef.current?.play();
            const titleP = clamp(0, 1, map(0, 0.3, 0, 1, self.progress));
            const videoP = clamp(0, 1, map(0, 0.3, 0, 1, self.progress));

            const lerpTitleP = lerp(prevProgTitle, titleP, 0.99);
            prevProgTitle = lerpTitleP;

            const lerpVideoP = lerp(prevProgVid, videoP, 0.99);
            prevProgTitle = lerpVideoP;

            gsap.set(title.current, {
              opacity: 1 - titleP,
              scale: 1 - scaleSpeedTitle * lerpTitleP,
            });

            gsap.set(videoW.current, {
              scale: clamp(1, 1.15, 1.15 - scaleSpeed * lerpVideoP),
              yPercent: clamp(0, 100, 100 - 100 * lerpVideoP),
              rotateX: clamp(0, 20, 20 - 20 * lerpVideoP),
            });

            gsap.set(gradient1.current, {
              opacity: clamp(0.1, 0.8, 0.1 + 0.7 * lerpVideoP),
            });

            gsap.set(gradient2.current, {
              opacity: clamp(0.1, 0.8, 0.1 + 0.7 * lerpVideoP),
            });
          },
        });
      });
      return () => ctx.revert();
    } else {
      const ctx = gsap.context((self) => {
        gsap.set(title.current, {
          scale: 1,
          opacity: 1,
        });

        ScrollTrigger.create({
          trigger: main.current,
          start: "top top",
          end: "+=500",
          onEnter: (self) => {
            if (self.progress > 0.01) setInView(true);
          },
          onUpdate: (self) => {
            if (self.progress > 0.1) {
              vidRef.current?.play();
            }
          },
        });
      });
      return () => ctx.revert();
    }
  }, [isMobileScreen, isTabletScreen, isDesktop])

  const [cldVid, setCldVid] = useState<CloudinaryVideo>()
  const [cldPoster, setcldPoster] = useState<CloudinaryImage>()

  useEffect(() => {
    // setCldVid(new CloudinaryVideo(data.video.data.attributes.provider_metadata.public_id, {
    //   cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_NAME,
    //   apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_KEY,
    //   apiSecret: process.env.NEXT_PUBLIC_CLOUDINARY_SECRET
    // })
    // .delivery(format(auto())))

    // setcldPoster(new CloudinaryImage(data.thumbnail.data.attributes.provider_metadata.public_id, {
    //   cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_NAME,
    //   apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_KEY,
    //   apiSecret: process.env.NEXT_PUBLIC_CLOUDINARY_SECRET
    // }).format('webp')
    // )    
  }, [])

  const [isVideoStart, setIsVideoStart] = useState(true);
  const [isVideoMute, setIsVideoMute] = useState(true);

  const vidRef = useRef<any>();

  const handleMuteVideo = () => {
    if (vidRef && vidRef !== null && vidRef?.current) {
      vidRef.current.muted = !isVideoMute;
      setIsVideoMute(!isVideoMute);
    }
  };

  const handleMouseOverVideo = () => {
    if (isVideoMute) {
      dispatch(toUnmute())
    } else {
      dispatch(toMute())
    }
  }

  const handleClick = () => {
    handleMuteVideo()
    
    if (!isVideoMute) {
      dispatch(toUnmute())
    } else {
      dispatch(toMute())
    }
  }  
  
  return (
    <div
      ref={main}
      className={`${
        inView ? "inView" : ""
      } relative lg:h-[105vh]`}
    >
      <div ref={title} className={`px-4 w-full lg:sticky lg:top-56 flex flex-col justify-center sm:items-center text-72`}>
        <div className="title text-10">
          <Title titleType='mainh1' className="text-left sm:text-center text-3xl md:text-5xl">{data.title_line_1}</Title>
          <Title titleType='mainh1' className="text-left sm:text-center text-3xl md:text-5xl">{data.title_line_2}</Title>
        </div>

        <p className="text-left w-full sm:w-auto sm:text-center text-xl mt-6 sm:max-w-md sm:mx-auto text-base-text">
          {data.content}
        </p>

        <Button
          variant="primary"
          text="Demander à rejoindre la Beta"
          className="mt-12 w-max py-6 sm:mx-auto text-lg"
          onClick={() => {
            dispatch(setJoinBetaVisible())
          }}
        />
      </div>

      <div className="mt-24 lg:absolute lg:h-full lg:w-full lg:top-0 lg:left-0 lg:mt-0 pointer-events-none">
        <div ref={sticky} className={`sticky w-full perpsective-1`}>
          <div className="absolute -top-56 left-0 w-full h-[500vh] overflow-hidden pointer-events-none">
            <div
              ref={gradient1}
              className="absolute w-[1000px] h-[500px] -left-44 top-64 z-0 opacity-[0.1] bg-top-section"
            ></div>
            <div
              ref={gradient2}
              className="absolute w-[1000px] h-[500px] -right-44 top-[17rem] z-0 opacity-[0.1] bg-top-section-2"
            ></div>
          </div>

          <div
            ref={videoW}
            className="relative w-full h-[100vw] sm:h-auto md:w-[80%] xl:w-full xl:max-w-5xl 2xl:max-w-6xl mx-auto mt-32"
          >
            <div className="relative w-full h-full sm:h-auto rounded-xl lg:rounded-3xl overflow-hidden pointer-events-auto z-10">
              {data.video && <video 
                  className="relative w-full h-full sm:h-auto object-cover"
                  autoPlay={true}
                  loop
                  muted={isVideoMute}
                  ref={vidRef}
                  poster={cldPoster?.toURL()}
  
                  onMouseOver={() => {
                    handleMouseOverVideo()
                  }}
  
                  onMouseLeave={() => {
                    dispatch(toRegular())
                  }}
  
                  onClick={() => {
                    handleClick()
                  }}
                >
                  <source src={data.video?.data.attributes?.url} />
                </video>
                }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
