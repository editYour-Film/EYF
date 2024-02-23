import { H1 } from "../../_shared/typography/H1";

import Stars from "@/img/whoweare/stars.svg";
import { useScrollAnimation } from "./useScrollAnimation";
import { useRef } from "react";

export const TopSection = ({ data }: any) => {
  const wrapper = useRef(null);
  useScrollAnimation(wrapper);

  return (
    <div
      ref={wrapper}
      className="top-section sticky flex justify-center items-center top-0 -mt-navbar-h w-full min-h-screen z-0 pointer-events-none"
    >
      <div className="top-section__text relative max-w-2xl z-30">
        <h1 className="top-section__title text-dashboard-text-title-white-high text-center text-poster leading-[110%] font-normal uppercase">
          {data.title}
        </h1>
        <div className="top-section__content relative text-center text-medium sm:max-w-lg sm:mx-auto text-dashboard-text-description-base mt-10 z-10">
          {data.content}
        </div>
      </div>

      <div className="absolute w-full h-full top-0 left-0 bg-rose-sunset z-0 opacity-50"></div>
      <div className="absolute w-full h-[200%] top-0 left-0 gradient-black-transparent gradient-start-[-20%] gradient-end-[90%] linear-orientation-0 z-10"></div>
      <div className="top-section__stars absolute w-full h-full top-0 left-0 z-30">
        <Stars className="min-w-full h-full" />
      </div>
    </div>
  );
};
