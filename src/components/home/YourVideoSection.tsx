import Button from "../_shared/form/Button";
import { H1 } from "../_shared/typography/H1";
import { H2 } from "../_shared/typography/H2";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { setJoinBetaVisible } from "@/store/slices/joinBetaSlice";
import { ResponsiveImg } from "../_shared/ResponsiveImg";

export const YourVideoSection = ({ data }: any) => {
  const dispatch = useDispatch()
  
  return (
    <div className="relative border-b mt-14 md:mt-56 w-full mx-auto">
      <div className="your-video-bg md:left-1/2 md:-translate-x-1/2 w-4/5 hidden md:block"></div>
      <div className="flex flex-col md:flex-row items-center md:justify-between fullHd:justify-center gap-12 md:gap-18 lg:gap-24 fullHd:gap-52 pt-8 md:py-28 md:pl-28 bg-primary relative z-20">
        <div className="md:max-w-xs p-4 md:p-0">
          <H2 arrow fake>{data.section_title}</H2>
          <H1 className="mt-4 md:mt-10" fake>{data.title}</H1>
          <p className="text-xl text-base-text mt-4 md:mt-9">{data.text}</p>
          <Button
            variant="primary"
            className="max-w-max mt-6 md:mt-10"
            text="Commencer"
            onClick={() => {
              dispatch(setJoinBetaVisible())
            }}
          />
        </div>
        <div className="relative basis-8/12 fullHd:basis-6/12">
          <div className="pb-[76.4%]">
            <ResponsiveImg 
              isStatic
              data={data.img.data.attributes.url}
              alt={data.img.data.attributes.alternativeText}
              w={{xs:500, sm:750, md:500, lg:750, fullHd:900}}
              className="object-contain top-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
