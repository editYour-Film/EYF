import {
  MouseEvent,
  RefObject,
  createRef,
  useEffect,
  useRef,
  useState,
} from "react";
import { CardArticle } from "../_shared/UI/CardArticle";
import { useWindowSize } from "@uidotdev/usehooks";
import gsap from "gsap";
import { Button } from "../_shared/buttons/Button";
import store from "@/store/store";
import { toArrowLeft, toArrowRight, toRead } from "@/store/slices/cursorSlice";
import { useDispatch } from "react-redux";
import useMediaQuery from "@/hooks/useMediaQuery";

export const MoreArticles = ({ articles, current }: any) => {
  const dispatch = useDispatch();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [maxArticles, setMaxArticles] = useState(1);
  const availableArticles = isMobile
    ? articles.filter((art: any) => art !== current).slice(0, maxArticles)
    : articles.filter((art: any) => art !== current);
  const cardArticles = useRef<RefObject<HTMLDivElement>[]>([]);
  const ctx = useRef<gsap.Context>();
  const wrapper = useRef<HTMLDivElement>(null);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [elementWidth, setElementWidth] = useState(0);
  const [offset, setOffset] = useState(0);
  const [initOffset, setInitOffset] = useState(0);

  const [isTweening, setIsTweening] = useState(false);
  const ww = typeof window !== 'undefined' ? useWindowSize() : undefined;

  const [dragStart, setDragStart] = useState(false);
  const dragOffset = useRef(0);
  const dragOffsetInit = useRef(0);
  const tl = useRef<GSAPTimeline>();

  useEffect(() => {
    availableArticles.forEach((x: any) => {
      cardArticles.current.push(createRef());
    });

    getValues();

    ctx.current = gsap.context(() => {
      tl.current = gsap.timeline();
    });

    setCurrentSlide(1);

    return () => {
      ctx.current && ctx.current.revert();
      cardArticles.current = [];
    };
  }, []);

  useEffect(() => {
    ctx.current &&
      ctx.current.add("goTo", (i: number) => {
        if (tl.current) {
          tl.current.pause();
          tl.current.clear();

          const childTl = gsap.timeline({
            onStart: () => {
              setIsTweening(true);
            },
            onComplete: () => {
              setIsTweening(false);
            },
          });

          childTl.to(wrapper.current, {
            x: initOffset - offset * i,
            ease: "power3.out",
            duration: 1.2,
          });

          tl.current.add(childTl);
          tl.current.play();
        }
      });

    ctx.current &&
      ctx.current.add("dragTo", () => {
        gsap.set(wrapper.current, {
          x: initOffset - offset * currentSlide + dragOffset.current,
        });
      });

    ctx.current &&
      ctx.current.add("reset", () => {
        if (tl.current) {
          tl.current.kill();
        }
        gsap.set(wrapper.current, {
          x: 0,
        });
      });
  }, [ctx.current, currentSlide, initOffset, elementWidth, ww]);

  useEffect(() => {
    if (ww && ww.width && ww.width > 768) {
      getValues();
      ctx.current && ctx.current.goTo(currentSlide);
    } else {
      resetValues();
      ctx.current && ctx.current.reset();
    }
  }, [ww]);

  useEffect(() => {
    ctx.current && ctx.current.goTo(currentSlide);
  }, [currentSlide]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentSlide, isTweening]);

  const getValues = () => {
    const gapValue = wrapper.current
      ? parseInt(getComputedStyle(wrapper.current).gap, 10)
      : 0;
    const elW =
      cardArticles.current[0] && cardArticles.current[0].current
        ? cardArticles.current[0].current?.offsetWidth
        : 0;

    setElementWidth(elW);
    setOffset(elW + gapValue);
    setInitOffset((window.innerWidth - elW) / 2);
  };

  const resetValues = () => {
    const elW =
      cardArticles.current[0] && cardArticles.current[0].current
        ? cardArticles.current[0].current?.offsetWidth
        : 0;

    setElementWidth(elW);
    setOffset(0);
    setInitOffset(0);
  };

  const handleClick = (i: number) => {
    if (i === currentSlide) return;

    if (i > currentSlide) {
      next();
    } else {
      prev();
    }
  };

  const prev = () => {
    if (!isTweening) currentSlide > 0 && setCurrentSlide(currentSlide - 1);
  };

  const next = () => {
    if (!isTweening)
      currentSlide < availableArticles.length - 1 &&
        setCurrentSlide(currentSlide + 1);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      next();
    } else if (e.key === "ArrowLeft") {
      prev();
    }
  };

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>, i: number) => {
    setDragStart(true);
    dragOffsetInit.current = e.clientX;

    return false;
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>, i: number) => {
    if (!dragStart) return;
    dragOffset.current = e.clientX - dragOffsetInit.current;
    ctx.current && ctx.current.dragTo();

    if (dragOffset.current < -100) {
      next();
      setDragStart(false);
    }
    if (dragOffset.current > 100) {
      prev();
      setDragStart(false);
    }
  };

  const setCloserElementToFocus = () => {
    // const closer = cardArticles.current.length > 0 && cardArticles.current.reduce((prev, curr, n) => {
    //   const prevOffset = prev.current ? Math.abs((window.innerWidth / 2) - (prev.current?.getBoundingClientRect().x + elementWidth / 2)) : 0
    //   const currOffset = curr.current ? Math.abs((window.innerWidth / 2) - (curr.current?.getBoundingClientRect().x + elementWidth / 2)) : 0

    //   return prevOffset < currOffset ? prev : curr;
    // })

    // const closerI = cardArticles.current.indexOf(closer)

    // setCurrentSlide(closerI)
    // ctx.current && ctx.current.goTo(closerI)
    setDragStart(false);
  };

  const handleMouseUp = () => {
    setCloserElementToFocus();
  };

  const handleMouseLeave = () => {
    setCloserElementToFocus();
  };

  const handleMouseOver = (i: number) => {
    if (i === currentSlide - 1 && store.getState().cursor.value !== "arrowLeft")
      dispatch(toArrowLeft());
    else if (
      i === currentSlide + 1 &&
      store.getState().cursor.value !== "arrowRight"
    )
      dispatch(toArrowRight());
    if (i === currentSlide && store.getState().cursor.value !== "read")
      dispatch(toRead());
  };

  return (
    <div className="pt-[109px] pb-[122px] mt-20 bg-blackBerry overflow-hidden">
      <div
        ref={wrapper}
        className="w-full flex flex-col md:flex-row items-stretch justify-start px-4 lg:px-0 gap-[44px]"
      >
        {availableArticles?.map((x: any, i: number) => {
          return (
            <div
              ref={cardArticles.current[i]}
              className="md:w-[60vw] shrink-0 select-none"
              onClick={(e) => {
                handleClick(i);
              }}
              onMouseDown={(e) => {
                handleMouseDown(e, i);
              }}
              onMouseMove={(e) => {
                handleMouseMove(e, i);
              }}
              onMouseUp={(e) => {
                handleMouseUp();
              }}
              onMouseLeave={() => {
                handleMouseLeave();
              }}
            >
              <CardArticle
                post={x.attributes}
                disableClick={i !== currentSlide || isTweening || dragStart}
                className="h-full"
                smallGap
                onMouseOver={() => {
                  handleMouseOver(i);
                }}
              />
            </div>
          );
        })}
      </div>

      {isMobile && (
        <div className="w-full mt-[72px]">
          <Button
            type="primary"
            label="Voir plus d’articles"
            onClick={() => {
              setMaxArticles(maxArticles + 5);
            }}
            disabled={maxArticles >= articles.length - 1}
            className="w-full"
          />
        </div>
      )}
    </div>
  );
};
