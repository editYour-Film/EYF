import Button from "../_shared/form/Button";
import { H1 } from "../_shared/typography/H1";
import { H2 } from "../_shared/typography/H2";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { setJoinBetaVisible } from "@/store/slices/joinBetaSlice";
import { ResponsiveImg } from "../_shared/ResponsiveImg";

export const YourVideoSection = ({ data }: any) => {
  const dispatch = useDispatch();

  if (data)
    return (
      <div className="relative border-b mt-14 md:mt-56 w-full mx-auto">
        <div className="flex flex-col items-center justify-center gap-12 md:gap-18 lg:gap-24 fullHd:gap-52 pt-8 md:py-28 relative z-20">
          
          <div className="flex flex-col items-center gap-dashboard-spacing-element-medium text-center max-w-[600px]">
            <H1 fake className="text-title-medium">
              {data.title}
            </H1>
            <p className="text-base text-dashboard-text-description-base max-w-[80%]">{data.text}</p>
            <Button
              variant="primary"
              className="max-w-max"
              text="Commencer"
              onClick={() => {
                dispatch(setJoinBetaVisible());
              }}
            />
          </div>
          
          <div className="relative">
            <Image 
              src={data.img.data.attributes.url}
              alt={data.img.data.attributes.alternativeText}
              width={data.img.data.attributes.width}
              height={data.img.data.attributes.height}
              className="object-contain top-0"
            />
          </div>

        </div>
      </div>
    );

  return <></>;
};
