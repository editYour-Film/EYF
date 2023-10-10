import { useRef, useState, useEffect } from "react";
import { lerp, clamp, map } from "@/utils/Math";
import { useSelector, useDispatch } from "react-redux";

import { gsap } from "gsap";
import { toRegular } from "@/store/slices/cursorSlice";
import { RootState } from "@/store/store";
import { TextSplit } from "@/utils/TextSplit";
import { useRouter } from "next/router";

import Mute from "@/icons/mute.svg";
import Unmute from "@/icons/unmute.svg";

export const Cursor = () => {
  const router = useRouter();
  const state = useSelector((state: RootState) => state.cursor.value);
  const cursor = useRef<HTMLDivElement>(null);
  const cursor2 = useRef<HTMLDivElement>(null);

  const shape = useRef<HTMLDivElement>(null);

  const [lockAnim, setLockAnim] = useState(false);
  const dispatch = useDispatch();

  const posX = useRef(0);
  const posY = useRef(0);
  const ctx = useRef<gsap.Context>();
  const raf = useRef(0);

  const regularScale = 0.4;
  const textScale = 1.4;

  const regularBorder = 3;
  const scaledBorder = 3 / (textScale / regularScale);

  const [text, setText] = useState<any>("");
  const [showText, setShowText] = useState<boolean>(false);

  const iconW = useRef<HTMLDivElement>(null);
  const icons = useRef<HTMLDivElement>(null);
  const muteIcon = useRef<HTMLDivElement>(null);
  const unmuteIcon = useRef<HTMLDivElement>(null);

  const switchFn = (state: string, isLocked: boolean) => {
    if (!isLocked) {
      switch (state) {
        case "click":
          handleClick();
          break;
        case "watch":
          handleWatch();
          break;
        case "pause":
          handlePause();
          break;
        case "regular":
          handleRegular();
          break;
        case "swipe":
          handleSwipe();
          break;
        case "mute":
          handleMute();
          break;
        case "unmute":
          handleUnmute();
          break;
      }
    }
  };

  useEffect(() => {
    switchFn(state, lockAnim);
  }, [state]);

  const textAnim = (text: string) => {
    const tl = gsap.timeline();

    tl.call(
      () => {
        setShowText(false);
      },
      [],
      0
    );

    tl.to(cursor.current, {
      scale: textScale,
      borderWidth: scaledBorder,
      duration: 0.6,
      yPercent: `-=${20}`,
      xPercent: `-=${10}`,
      ease: "back.inOut",
    });

    tl.call(
      () => {
        setText(text);
      },
      [],
      0.2
    );

    tl.call(
      () => {
        setShowText(true);
      },
      [],
      0.3
    );
  };

  const iconAnim = (icon: string, inOut = "in") => {
    const tl = gsap.timeline();
    let iconEl = null;

    switch (icon) {
      case "mute":
        iconEl = muteIcon;
        break;
      case "unmute":
        iconEl = unmuteIcon;
        break;
    }

    if (inOut === "in") {
      tl.to(cursor.current, {
        scale: textScale,
        borderWidth: scaledBorder,
        duration: 0.6,
        yPercent: `-=${20}`,
        xPercent: `-=${10}`,
        ease: "back.inOut",
      });

      tl.set(
        icons.current!.children,
        {
          yPercent: 120,
        },
        0
      );

      tl.to(
        iconEl!.current,
        {
          yPercent: inOut === "in" ? 0 : 100,
          ease: "power2.out",
        },
        0
      );
    } else {
      tl.to(
        icons.current!.children,
        {
          yPercent: 120,
        },
        0
      );
    }
  };

  const handleClick = () => {
    gsap.to(cursor.current, {
      scale: 0.4,
      yPercent: 0,
      xPercent: 0,
      duration: 0.6,
      ease: "back.inOut",
    });
  };

  const handleWatch = () => {
    textAnim("play");
  };

  const handlePause = () => {
    textAnim("pause");
  };

  const handleSwipe = () => {
    const tl = gsap.timeline();
    tl.to(
      shape.current,
      {
        scale: 3,
        duration: 0.6,
        ease: "back.inOut",
      },
      0
    );
    tl.to(
      shape.current,
      {
        xPercent: -80,
        duration: 0.6,
        ease: "power2.inOut",
      },
      "-=0.2"
    );
    tl.to(shape.current, {
      xPercent: 120,
      duration: 0.6,
      ease: "power2.inOut",
    });
    tl.to(shape.current, {
      xPercent: 0,
      duration: 0.6,
      ease: "power2.inOut",
    });
    tl.call(() => {
      dispatch(toRegular());
    });
  };

  const handleRegular = () => {
    setShowText(false);
    iconAnim("none", "out");

    gsap.to(cursor.current, {
      scale: regularScale,
      yPercent: 0,
      xPercent: 0,
      borderWidth: regularBorder,
      ease: "back.inOut",
      onComplete: () => {
        setText("");
      },
    });
  };

  const handleMute = () => {
    // textAnim('mute')
    iconAnim("mute");
  };

  const handleUnmute = () => {
    // textAnim('unmute')
    iconAnim("unmute");
  };

  const getVel = (xPrev: number, x: number, yPrev: number, y: number) => {
    return Math.sqrt((x - xPrev) ** 2 + (y - yPrev) ** 2);
  };

  const [cursor2Pos, setCursor2Pos] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const handleMouseMove = (event: MouseEvent) => {
    posX.current = event.clientX;
    posY.current = event.clientY;

    gsap.to(cursor2.current, {
      x: posX.current,
      y: posY.current,
      ease: "power4.out",
      duration: 1,
      onUpdate() {
        setCursor2Pos({
          x: gsap.getProperty(this.targets()[0], "x") as number,
          y: gsap.getProperty(this.targets()[0], "y") as number,
        });
      },
    });
  };

  useEffect(() => {
    gsap.set(cursor.current, {
      x:
        lerp(posX.current, cursor2Pos?.x as number, 0.1) -
        shape.current?.offsetWidth! / 2,
      y:
        lerp(posY.current, cursor2Pos?.y as number, 0.1) -
        shape.current?.offsetHeight! / 2,
    });
  }, [cursor2Pos]);

  useEffect(() => {
    window.addEventListener("mousemove", (e) => {
      handleMouseMove(e);
    });

    ctx.current = gsap.context(() => {
      gsap.set(cursor.current, {
        x: posX.current,
        y: posY.current,
      });
    });

    // const start = Date.now()
    // let then = start
    // let fps = 60
    // let fpsInterval = 1000 / fps

    // const anim = () => {
    //   raf.current = requestAnimationFrame(anim)

    //   const now = Date.now()
    //   const delta = now - then
    //   const time = now - start
    //   const ratio = 0.8

    //   x.current = lerp(posXPrev.current, posX.current, ratio)
    //   y.current = lerp(posYPrev.current, posY.current, ratio)

    //   if (delta > fpsInterval) {
    //     posXPrev.current = posX.current
    //     posYPrev.current = posY.current

    //     posX.current = x.current
    //     posY.current = y.current

    //     then = now - (delta % fpsInterval);

    //     gsap.set(cursor.current, {
    //       x: x.current - shape.current?.offsetWidth! / 2,
    //       y: y.current - shape.current?.offsetHeight! / 2,
    //     })
    //   }
    // }

    // if(!started.current) {
    //   anim()
    // }

    router.events.on("routeChangeStart", () => {
      setLockAnim(true);
      dispatch(toRegular());
    });

    router.events.on("routeChangeComplete", () => {
      setTimeout(() => {
        setLockAnim(false);
      }, 1000);
    });

    return () => {
      window.removeEventListener("mousemove", (e) => {
        handleMouseMove(e);
      });

      ctx.current?.revert();

      cancelAnimationFrame(raf.current);
    };
  }, []);

  // useEffect(() => {
  //   let timer = null
  //   lenis.on('scroll', () => {
  //     if(!lockAnim) {
  //       setLockAnim(true)
  //       dispatch( toRegular() )
  //     }

  //     if(timer !== null) {
  //       clearTimeout(timer);
  //     }

  //     timer = setTimeout(function() {
  //       setLockAnim(false)
  //       // switchFn(store.getState().cursor.value, false)
  //     }, 150);
  //   })
  // }, [])

  return (
    <div className="fixed top-0 left-0 w-full h-full z-cursor pointer-events-none">
      <div
        ref={cursor}
        className="absolute w-[60px] h-[60px] flex justify-center items-center backdrop-blur-[3px] rounded-full border-white border-[3px] overflow-hidden"
      >
        <div
          ref={shape}
          className="absolute w-full h-full origin-center translate-z-0"
        >
          {/* <div className="absolute top-0 left-0 w-full h-full scale-120 rounded-full"></div> */}
          <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[100%] h-[100%] bg-cursor z-20 opacity-30"></div>
        </div>

        <CursorText active={showText} text={text} />

        <div
          ref={iconW}
          className="cursor__icons absolute top-0 left-0 w-full h-full"
        >
          <div
            ref={icons}
            className="absolute top-[25%] left-[25%] w-[50%] h-[50%] overflow-hidden"
          >
            <div ref={muteIcon} className="absolute top-0 lef-0 w-full h-full">
              <Mute className="absolute top-0 left-0 w-full h-full" />
            </div>
            <div
              ref={unmuteIcon}
              className="absolute top-0 lef-0 w-full h-full"
            >
              <Unmute className="absolute top-0 left-0 w-full h-full" />
            </div>
          </div>
        </div>
      </div>
      <div
        ref={cursor2}
        className="hidden absolute w-[60px] h-[60px] rounded-full border-error border-[3px] overflow-hidden"
      ></div>
    </div>
  );
};

type CursorTextProps = {
  text: string;
  active: boolean;
};

const CursorText = ({ text, active }: CursorTextProps) => {
  return (
    <div
      className={`${
        active ? "active" : ""
      } anim-cursor relative z-10 flex w-full justify-center items-center h-max translate-y-[10%]`}
    >
      <TextSplit input={text} type="word" />
    </div>
  );
};
