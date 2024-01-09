import Image from "next/image";
import { useDispatch } from "react-redux";
import { setJoinBetaVisible } from "@/store/slices/joinBetaSlice";
import { Video } from "../_shared/video/Video";
import { ClassicContent } from "../_shared/UI/ClassicContent";

export const YourVideoSection = ({ data }: any) => {
  const dispatch = useDispatch();

  if (data)
    return (
      <div className="relative">
        <div className="flex flex-col items-center justify-center gap-12 md:gap-18 lg:gap-18 md:py-20 relative z-20">
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
          
          {data.media && data.media.data && (
            <div className="relative border rounded-dashboard-button-square-radius overflow-hidden">
              {data.media &&
              data.media.data.attributes.mime.split("/")[0] === "video" ? (
                <Video
                  video={data.media.data.attributes}
                  autoPlay
                  muted
                  noPlayer
                  trigger={true}
                />
              ) : (
                <Image
                  src={data.media.data.attributes.url}
                  alt={data.media.data.attributes.alternativeText}
                  width={data.media.data.attributes.width}
                  height={data.media.data.attributes.height}
                  className="object-contain top-0"
                />
              )}
            </div>
          )}
        </div>
      </div>
    );

  return <></>;
};
