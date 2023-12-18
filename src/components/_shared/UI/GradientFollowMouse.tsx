import { lerp, map } from "@/utils/Math";
import gsap from "gsap";
import { useEffect, useRef } from "react";

export const GradientFollowMouse = () => {
  const bgGradient = useRef<HTMLDivElement>(null);

  let bgAbstractPos = {
    x: 0,
    y: 0,
  };

  let bgInstantPos = {
    x: 0,
    y: 0,
  };

  const lateDuration = 3;

  const handleMousMove = (e: MouseEvent) => {    
    if (bgGradient.current) {
      const xPosNormal = map(0, 1, -2, 0, e.clientX / window.innerWidth);
      const yPosNormal = map(0, 1, 0.3, 0.6, e.clientY / window.innerHeight);

      const xOffsetBg = window.innerWidth / 10;
      const yOffsetBg = window.innerWidth / 10;

      bgInstantPos.x =
        xPosNormal * xOffsetBg +
        (window.innerWidth / 2 - bgGradient.current?.offsetWidth / 2);
      bgInstantPos.y =
        yPosNormal * yOffsetBg +
        (window.innerHeight / 2 - bgGradient.current?.offsetHeight / 2);

      const lateAnim = gsap.to(bgAbstractPos, {
        x:
          xPosNormal * xOffsetBg +
          (window.innerWidth / 2 - bgGradient.current?.offsetWidth / 2),
        y:
          yPosNormal * yOffsetBg +
          (window.innerHeight / 2 - bgGradient.current?.offsetHeight / 2),
        duration: lateDuration,
        ease: "power2.out",

        onUpdate: () => {
          const lerpx = lerp(
            bgInstantPos.x,
            bgAbstractPos.x,
            1 - lateAnim.progress()
          );
          const lerpy = lerp(
            bgInstantPos.y,
            bgAbstractPos.y,
            1 - lateAnim.progress()
          );

          if(bgGradient.current) bgGradient.current!.style.transform = `translateX(${lerpx}px) translateY(${lerpy}px)`
        }
      })
    }
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMousMove);

    return () => {
      window.removeEventListener("mousemove", handleMousMove);
    };
  });
  
  return (
    <div
      ref={bgGradient}
      className="bg-signin absolute w-[40vw] min-w-[500px] h-[40vw] min-h-[500px] -z-1 pointer-events-none sm:-left-0 sm:left-1/8"
    ></div>
  )
}