import { useRef, useState, useEffect } from "react";
import { lerp} from "@/utils/Math";
import { useSelector, useDispatch } from "react-redux";

import { gsap } from "gsap";
import { toRegular } from "@/store/slices/cursorSlice";
import store, { RootState } from "@/store/store";
import { TextSplit } from "@/utils/TextSplit";

import Mute from "@/icons/mute.svg";
import Unmute from "@/icons/unmute.svg";
import ArrowLeft from "@/icons/arrow-left.svg";
import ArrowRight from "@/icons/arrow-right.svg";

export const Cursor = () => {
  const isCursorEnabled = useSelector((store: RootState) => store.cursor.enabled)
  const state = useSelector((state: RootState) => state.cursor.value);
  const enabled = useSelector((state: RootState) => state.cursor.enabled);
  const locked = useSelector((state: RootState) => state.cursor.locked);

  const cursor = useRef<HTMLDivElement>(null);
  const cursor2 = useRef<HTMLDivElement>(null);

  const shape = useRef<HTMLDivElement>(null);

  const [lockAnim] = useState(false);
  const dispatch = useDispatch();

  const posX = useRef(0);
  const posY = useRef(0);
  const ctx = useRef<gsap.Context>();

  const regularScale = 0.4;
  const textScale = 1.1;

  const regularBorder = 3;
  const scaledBorder = 3 / (textScale / regularScale);

  const [text, setText] = useState<any>("");
  const [showText, setShowText] = useState<boolean>(false);

  const iconW = useRef<HTMLDivElement>(null);
  const icons = useRef<HTMLDivElement>(null);
  const muteIcon = useRef<HTMLDivElement>(null);
  const unmuteIcon = useRef<HTMLDivElement>(null);
  const arrowLeft = useRef<HTMLDivElement>(null);
  const arrowRight = useRef<HTMLDivElement>(null);

  const tl = useRef<GSAPTimeline>()

  const switchFn = (state: string, isLocked: boolean) => {
    if (!isLocked) {
      switch (state) {
        case "click":
          tl.current && handleClick();
          break;
        case "watch":
          tl.current && handleWatch();
          break;
        case "pause":
          tl.current && handlePause();
          break;
        case "regular":
          tl.current && handleRegular();
          break;
        case "swipe":
          tl.current && handleSwipe();
          break;
        case "mute":
          tl.current && handleMute();
          break;
        case "unmute":
          tl.current && handleUnmute();
          break;
        case "arrowLeft":
          tl.current && handleLeftArrow();
          break;
        case "arrowRight":
          tl.current && handleRightArrow();
          break;
        case "read":
          tl.current && handleRead();
          break;
        case "text":
          tl.current && handleText(store.getState().cursor.currentText);
          break;
      }
    }
  };

  useEffect(() => {
    enabled && !locked && switchFn(state, lockAnim);
  }, [state, enabled]);

  const textAnim = (text: string) => {
    const childTl = gsap.timeline()

    childTl.call(
      () => {
        setShowText(false);
      },
      [],
      0
    );

    childTl.to(cursor.current, {
      scale: textScale,
      borderWidth: scaledBorder,
      duration: 0.4,
      yPercent: `-${50}`,
      xPercent: `-${30}`,
      ease: "power3.out",
    });

    childTl.call(
      () => {
        setText(text);
      },
      [],
      0.2
    );

    childTl.call(
      () => {
        setShowText(true);
      },
      [],
      0.3
    );

    iconAnim("none", "out")
    
    tl.current!.pause()
    tl.current!.clear()
    tl.current!.add(childTl)
    tl.current!.play()
  };

  const iconAnim = (icon: string, inOut = "in") => {
    let iconEl = null;

    const childTl = gsap.timeline()

    switch (icon) {
      case "mute":
        iconEl = muteIcon;
        break;
      case "unmute":
        iconEl = unmuteIcon;
        break;
      case "arrowLeft":
        iconEl = arrowLeft;
        break;
      case "arrowRight":
        iconEl = arrowRight;
        break;
    }

    if (inOut === "in") {
      childTl.to(cursor.current, {
        scale: textScale,
        borderWidth: scaledBorder,
        duration: 0.6,
        yPercent: `-=${20}`,
        xPercent: `-=${10}`,
        ease: "back.inOut",
      });

      childTl.set(
        icons.current!.children,
        {
          yPercent: 120,
        },
        0
      );

      childTl.to(
        iconEl!.current,
        {
          yPercent: inOut === "in" ? 0 : 120,
          ease: "power2.out",
        },
        0
      );
    } else {
      const hideTl = gsap.timeline()
      hideTl.to(
        icons.current!.children,
        {
          yPercent: 120,
        },
        0
      );
    }

    tl.current!.pause()
    tl.current!.clear()
    tl.current!.add(childTl)
    tl.current!.play()

    return tl.current
  };

  const handleText = (text: string) => {
    textAnim(text);
  }

  const handleClick = () => {
    const childTl = gsap.timeline()

    childTl.to(cursor.current, {
      scale: 0.4,
      yPercent: 0,
      xPercent: 0,
      duration: 0.6,
      ease: "back.inOut",
    });

    tl.current!.pause()
    tl.current!.clear()
    tl.current!.add(childTl)
    tl.current!.play()
  };

  const handleWatch = () => {
    textAnim("play");
  };

  const handlePause = () => {
    textAnim("pause");
  };

  const handleSwipe = () => {
    const childTl = gsap.timeline()

    childTl.to(
      shape.current,
      {
        scale: 3,
        duration: 0.6,
        ease: "back.inOut",
      },
      0
    );
    childTl.to(
      shape.current,
      {
        xPercent: -80,
        duration: 0.6,
        ease: "power2.inOut",
      },
      "-=0.2"
    );
    childTl.to(shape.current, {
      xPercent: 120,
      duration: 0.6,
      ease: "power2.inOut",
    });
    childTl.to(shape.current, {
      xPercent: 0,
      duration: 0.6,
      ease: "power2.inOut",
    });
    childTl.call(() => {
      dispatch(toRegular());
    });

    tl.current!.pause()
    tl.current!.clear()
    tl.current!.add(childTl)
    tl.current!.play()
  };

  const handleRegular = () => {
    const childTl = gsap.timeline({
      paused: true
    })

    setShowText(false);

    childTl.to(cursor.current, {
      scale: regularScale,
      yPercent: 0,
      xPercent: 0,
      borderWidth: regularBorder,
      ease: "power3.out",
      onComplete: () => {
        setText("");
      },
    });

    iconAnim("none", "out")
    tl.current!.add(childTl.play(), 0)
  };

  const handleMute = () => {
    iconAnim("mute");
  };

  const handleUnmute = () => {
    iconAnim("unmute");
  };

  const handleLeftArrow = () => {
    iconAnim("arrowLeft");
  };

  const handleRightArrow = () => {
    iconAnim("arrowRight");
  };

  const handleRead = () => {
    textAnim("Lire");
  };

  const [cursor2Pos, setCursor2Pos] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const handleMouseMove = (event: MouseEvent) => {    
    if (!isCursorEnabled) return

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
        lerp(posX.current, cursor2Pos?.x as number, 0.99) -
        shape.current?.offsetWidth! / 2,
      y:
        lerp(posY.current, cursor2Pos?.y as number, 0.99) -
        shape.current?.offsetHeight! / 2,
    });
  }, [cursor2Pos]);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);

    ctx.current = gsap.context(() => {
      gsap.set(cursor.current, {
        x: posX.current,
        y: posY.current,
      });
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);

      ctx.current?.revert();
    };
  }, [isCursorEnabled]);

  useEffect(() => {
    tl.current = gsap.timeline()

    enabled && handleRegular()
  }, [])

  if (enabled) {
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

          <div className="overflow-hidden">
            <CursorText active={showText} text={text} />
          </div>

          <div
            ref={iconW}
            className="cursor__icons absolute top-0 left-0 w-full h-full"
          >
            <div
              ref={icons}
              className="absolute top-[25%] left-[25%] w-[30px] h-[30px] overflow-hidden"
            >
              <div
                ref={muteIcon}
                className="absolute top-0 left-0 w-full h-full"
              >
                <Mute className="absolute top-0 left-0 w-full h-full svg-color-blueBerry" />
              </div>
              <div
                ref={unmuteIcon}
                className="absolute top-0 left-0 w-full h-full"
              >
                <Unmute className="absolute top-0 left-0 w-full h-full svg-color-blueBerry" />
              </div>
              <div
                ref={arrowLeft}
                className="absolute top-0 left-0 w-full h-full"
              >
                <ArrowLeft className="absolute top-0 left-0 w-full h-full" />
              </div>
              <div
                ref={arrowRight}
                className="absolute top-0 left-0 w-full h-full"
              >
                <ArrowRight className="absolute top-0 left-0 w-full h-full" />
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
  } else {
    return <></>;
  }
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
      } text-small anim-cursor relative z-10 flex w-full justify-center items-center h-max translate-y-[10%]`}
    >
      <TextSplit
        input={text} 
        type="word" 
      />
    </div>
  );
};
