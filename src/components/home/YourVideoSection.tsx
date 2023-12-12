import Button from "../_shared/form/Button";
import { H1 } from "../_shared/typography/H1";
import { H2 } from "../_shared/typography/H2";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { setJoinBetaVisible } from "@/store/slices/joinBetaSlice";
import { ResponsiveImg } from "../_shared/ResponsiveImg";
import { Video } from "../_shared/video/Video";
import { IslandButton } from "../_shared/buttons/IslandButton";
import { Title } from "../_shared/typography/TitleAnim";
import { ClassicContent } from "../_shared/UI/ClassicContent";

export const YourVideoSection = ({ data }: any) => {
  const dispatch = useDispatch();

  if (data)
    return (
      <div className="relative">
        <div className="flex flex-col items-center justify-center gap-12 md:gap-18 lg:gap-24 fullHd:gap-52 md:py-20 relative z-20">
          <ClassicContent 
            className="flex flex-col items-center text-center max-w-[600px]"
            title={data.title}
            titleType="h2"
            titleClassName="text-title-medium"
            paragraph={data.text}
            paragraphClassName="max-w-[80%]"
            cta="Commencer"
            ctaType="primary"
            ctaOnClick={() => {
              dispatch(setJoinBetaVisible());
            }}
            ctaClassName="max-w-max"
          />

          {/* <div className="">
            <Title
              type="h2"
              text={data.title}
              className="text-title-medium"
            />

            <p className="text-base text-dashboard-text-description-base max-w-[80%]">{data.text}</p>
            <IslandButton
              type="primary"
              className="max-w-max"
              label="Commencer"
              enableTwist
              onClick={() => {
                dispatch(setJoinBetaVisible());
              }}
            />
          </div> */}
          
          <div className="relative border rounded-dashboard-button-square-radius overflow-hidden">
            {
              data.media && data.media.data.attributes.mime.split('/')[0] === 'video' 
              ?
                <Video
                  video={data.media.data.attributes}
                  autoPlay
                  muted
                  noPlayer
                  trigger={true}
                />
              :
                <Image 
                  src={data.media.data.attributes.url}
                  alt={data.media.data.attributes.alternativeText}
                  width={data.media.data.attributes.width}
                  height={data.media.data.attributes.height}
                  className="object-contain top-0"
                />
            }

          </div>

        </div>
      </div>
    );

  return <></>;
};
