import { TextSplit } from "@/utils/TextSplit";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { createRef, forwardRef, useEffect, useRef, useState } from "react";

export const TitleReveal = ({ data }: any) => {
  const titles = [];

  data?.forEach((element: any) => {
    titles.push({
      text: element.title,
      content: element.content,
      isActive: false,
    });
  });

  titles.push({ text: "...", content: "...", isActive: false });

  const [titleActive, setTitleActive] = useState<number | null>(null);

  const titlesRef = useRef(
    titles.map<React.RefObject<HTMLDivElement>>(() => {
      return createRef<HTMLDivElement>();
    })
  );

  const contents = useRef<HTMLDivElement>(null);

  const DirectionRef = useRef(titles.map<1 | -1>(() => 1));

  const titlesNumber = titles.length;

  const parent = useRef<HTMLDivElement>(null);

  const stepHeight = window.innerHeight / 2;

  const moveContent = (i: number) => {
    const tl = gsap.timeline();

    tl.to(contents.current, {
      x: -i * (contents.current!.offsetWidth + 400),
      ease: "power2.inOut",
      duration: 0.8,
    });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      titlesRef.current.forEach((title, i) => {
        ScrollTrigger.create({
          trigger: parent.current,
          start: `top+=${stepHeight * (i + 1)} ${
            i === 0 ? "bottom" : "center"
          }`,
          end: `top+=${stepHeight * (i + 2)} ${
            i === titlesRef.current.length - 1 ? "top" : "center"
          }`,
          id: `step${i}`,
          onEnter: () => {
            setTitleActive(i);
            moveContent(i);
            DirectionRef.current[i] = 1;
          },
          onEnterBack: () => {
            setTitleActive(i);
            moveContent(i);
            DirectionRef.current[i] = -1;
          },
          onLeave: () => {
            setTitleActive(null);
            DirectionRef.current[i] = -1;
          },
          onLeaveBack: () => {
            setTitleActive(null);
            DirectionRef.current[i] = 1;
          },
        });
      });
    });

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={parent}
      className="title-reveal w-full"
      style={{ height: `${stepHeight * (titlesNumber + 1)}px` }}
    >
      <div className="title-reveal__container sticky h-[80vh] w-full flex top-[10vh] justify-center items-center">
        <div className="title-reveal__content w-full overflow-hidden">
          <div className="title-reveal__suptitle text-center text-linear-sunset linear-orientation-90 text-large n27">
            Nous avons créé une nouvelle façon de travailler pour les
          </div>
          {/* <div className="relative title-reveal__titles text-center grid text-poster place-content-center mt-8 n27 font-bold">
            {titles.length &&
              titles.map((title, i) => {
                return (
                  <Title
                    key={i}
                    ref={titlesRef.current[i]}
                    text={title.text}
                    isActive={titleActive === i}
                    direction={DirectionRef.current[i]}
                  />
                );
              })}
          </div> */}
          <div className="relative w-full mt-dashboard-spacing-element-medium p-4 md:p-0 md:w-1/2 mx-auto">
            <div className="absolute gradient-dark-transparent w-[37.5vw] h-full -translate-x-[100%] z-10"></div>
            <div className="absolute gradient-dark-transparent w-[37.5vw] h-full right-0 rotate-[180deg] translate-x-[100%] z-10"></div>

            <div
              ref={contents}
              className="relative w-full flex gap-[400px] z-0"
            >
              {titles.length &&
                titles.map((title: any, i) => {
                  return (
                    <div
                      key={i}
                      className="basis-[100%] shrink-0 text-center text-dashboard-text-title-white-high text-poster"
                    >
                      {title.content}
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

type TitleProps = {
  text: string;
  isActive: boolean;
  direction: 1 | -1;
};

const Title = forwardRef<HTMLDivElement, TitleProps>(function Title(
  { text, isActive, direction },
  ref
) {
  return (
    <div
      ref={ref}
      className={`title-reveal__first col-[1/2] row-[1/2] top-0 uppercase anim-title anim-title-reveal ${
        isActive && "title-active"
      }`}
      style={
        {
          "--direction": direction,
          "--char-delay": "0.01s",
        } as React.CSSProperties
      }
    >
      <TextSplit input={text} />
    </div>
  );
});
