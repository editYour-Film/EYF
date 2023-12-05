import { useState, useRef, useEffect } from "react";
import { Title } from "../_shared/Title";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import useMediaQuery from "@/hooks/useMediaQuery";
import { lerp, map, clamp } from "@/utils/Math";
import { useDispatch } from "react-redux";
import { setJoinBetaVisible } from "../../store/slices/joinBetaSlice"
import { toMute, toRegular, toUnmute } from "@/store/slices/cursorSlice";

import { IslandButton } from "../_shared/buttons/IslandButton";

gsap.registerPlugin(ScrollTrigger);

export const TopVideoSection = ({ data }: any) => {
  const dispatch = useDispatch()
  const isMobileScreen = useMediaQuery("(max-width: 768px)");
  const isTabletScreen = useMediaQuery("(min-width: 768px) && (max-width: 1024px)");
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const [inView, setInView] = useState<boolean>(false);
  const [isVideoStart, setIsVideoStart] = useState(true);
  const [isVideoMute, setIsVideoMute] = useState(true);

  const main = useRef<any>();
  const vidRef = useRef<any>();
  const title = useRef<any>();
  const sticky = useRef<any>();
  const videoW = useRef<any>();
  const gradientW = useRef<any>();
  const media = useRef<any>()
  const [isModel, setIsModel] = useState(false)

  useEffect(() => {
    if(data.editor_video && data.editor_video.data) {
      setIsModel(true)
      media.current = data.editor_video.data.attributes.video.data
    } else if (data.video && data.video.data) {
      media.current = data.video.data
    }    
  }, [data])

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

        gsap.set(gradientW.current, {
          opacity: 0.5,
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

            gsap.set(gradientW.current, {
              opacity: clamp(0.1, 0.5, 0.1 + 0.7 * lerpVideoP),
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
        <div className="relative flex flex-col">
          <div className="title text-10">
            <Title titleType='mainh1' className="text-left sm:text-center text-3xl md:text-5xl">{data.title_line_1}</Title>
            <Title titleType='mainh1' className="text-left sm:text-center text-3xl md:text-5xl">{data.title_line_2}</Title>
          </div>

          <p className="text-left w-full sm:w-auto sm:text-center text-xl mt-6 sm:max-w-md sm:mx-auto text-base-text">
            {data.content}
          </p>

          <IslandButton
            type="main"
            label="Obtenir mon devis"
            enableTwist
            className="mt-12 w-max py-6 sm:mx-auto text-lg"
            onClick={() => {
              dispatch(setJoinBetaVisible())
            }}
          />

          <div className="absolute top-[60%] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-radial-gradient-blueLight rounded-full w-full lg:w-[400px] h-[400px]"></div>
        </div>
      </div>

      <div 
        className="hidden lg:block w-full h-full relative overflow-hidden pointer-events-none"
        ref={gradientW}
      >
        <div className="relative flex justify-between top-1/2 -translate-y-full">
          <div className="w-[800px] h-[200px] translate-x-[-33%] bg-radial-gradient-violetLight"></div>
          <div className="w-[800px] h-[200px] translate-x-[33%] bg-radial-gradient-violetLight"></div>
        </div>
      </div>

      <div className="mt-24 lg:absolute lg:h-full lg:w-full lg:top-0 lg:left-0 lg:mt-0 pointer-events-none">
        <div ref={sticky} className={`sticky w-full perpsective-1`}>
        {media.current && 
          <div
            ref={videoW}
            className="relative w-full h-[100vw] sm:h-auto md:w-[80%] xl:w-full xl:max-w-5xl 2xl:max-w-6xl mx-auto mt-64 overflow-hidden"
          > 
            <div
              className="relative px-dashboard-mention-padding-right-left py-dashboard-spacing-element-medium rounded-dashboard-button-square-radius border-03 bg-dashboard-button-dark pointer-events-auto z-10"
            >
              <div
                className="graaaad absolute top-[30px] left-[-10%] w-[120%] h-full gradient-white-transparent linear-orientation-180 blur-[32px]"
              ></div>

              <div className="relative w-full h-full sm:h-auto rounded-dashboard-button-separation-spacing overflow-hidden">
                {
                  isModel && 
                    <IslandButton
                      type='small'
                      label="Voir le modèle"
                      onClick={() => {}}
                      className="absolute top-[15px] right-[15px] z-10"
                    />
                }
                <video 
                    className="relative w-full h-full sm:h-auto object-cover pointer-events-none md:pointer-events-auto"
                    autoPlay={true}
                    loop
                    muted={isVideoMute}
                    ref={vidRef}
    
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
                    <source src={media.current.attributes?.url} />
                  </video>
              </div>
            </div>
          </div>
          }
        </div>
      </div>
    </div>
  );
};
