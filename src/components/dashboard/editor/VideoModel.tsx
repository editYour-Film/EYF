import Button from "@/components/_shared/form/Button";
import { VideoDuration, getDuration } from "@/utils/Video";
import { SyntheticEvent, useRef, useState } from "react";
import Image from "next/image";

type VideoModelProps = {
  data: any;
  thumbnail: any;
  onModify: Function;
  onDelete: Function;
};

export const VideoModel = ({
  data,
  thumbnail,
  onModify,
  onDelete,
}: VideoModelProps) => {
  const video = useRef<HTMLVideoElement>(null);
  const [videoDuration, setVideoDuration] = useState<VideoDuration>();

  const handleLoadedMetadata = (e: SyntheticEvent<HTMLVideoElement>) => {
    setVideoDuration(getDuration(e.currentTarget));
  };

  return (
    <div className="video-model relative bg-primary-middle rounded-2xl overflow-hidden translate-z-0">
      <div className="video-model__video relative w-[101%] h-0 pb-[56%]">
        {thumbnail && (
          <Image
            alt={""}
            src={thumbnail}
            width={200}
            height={200}
            className="absolute top-0 left-0 w-full h-full object-cover bg-black"
          />
        )}
        {data && data.attributes && (
          <video
            ref={video}
            className="hidden absolute top-0 left-0 w-full h-full object-cover"
            onLoadedMetadata={(e) => {
              handleLoadedMetadata(e);
            }}
          >
            <source src={data.attributes.url} type={data.attributes.mime} />
          </video>
        )}
      </div>
      <div className="video-model__ui p-2 pr-4 w-full flex flex-wrap justify-between items-center text-[13px]">
        <div className="flex flex-wrap gap-3">
          <Button
            text="Retirer"
            variant="light"
            size="sm"
            className="w-max h-max py-1 px-3"
            onClick={() => {
              onDelete();
            }}
          />
          <Button
            text="Modifier"
            variant="light"
            size="sm"
            className="w-max h-max py-1 px-3 "
            onClick={() => {
              onModify();
            }}
          />
        </div>
        <div className="video-model__duration ml-2 mt-1 sm:m-0">
          {videoDuration && videoDuration.mmss}
        </div>
      </div>
    </div>
  );
};
