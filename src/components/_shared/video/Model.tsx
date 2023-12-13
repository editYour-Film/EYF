import { useEffect, useRef, useState } from "react";
import { IslandButton } from "../buttons/IslandButton";
import { ModelsProps } from "./ModelLarge";
import Image from "next/image";
import Undo from "@/icons/undo.svg";
import Maximize from "@/icons/maximize.svg";

import { Video } from "./Video";
import useMediaQuery from "@/hooks/useMediaQuery";
interface ModelProps extends ModelsProps {
  active: boolean;
}

export const Model = ({
  type,
  active,
  video,
  thumbnail,
  handleModify,
  handleDisable,
  handleDelete,
  handleSetHighlighted,
  handleEnable,
  handleOpenDetail,
}: ModelProps) => {
  const [hover, setHover] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  let imgRatio;

  switch (video.model) {
    case "model 16/9 \u00E8me":
      imgRatio = "pb-[56.25%]";
      break;
    case "model 9/16 \u00E8me":
      imgRatio = "pb-[177.77%]";
      break;
    case "Carr\u00E9":
      imgRatio = "pb-[100%]";
      break;
    case "Mobile":
      imgRatio = "pb-[168%]";
      break;
    default:
      imgRatio = "pb-[56.25%]";
      break;
  }

  let buttons = [];

  if (active) {
    type === "editor" &&
      handleModify &&
      buttons.push(
        <IslandButton
          key={buttons.length}
          type="small"
          label="Modifier"
          onClick={() => {
            handleModify();
          }}
          className="basis-[120px] leading-none shrink-1"
        />
      );

    type === "editor" &&
      handleDisable &&
      buttons.push(
        <IslandButton
          key={buttons.length}
          type="small"
          label="Retirer"
          onClick={() => {
            handleDisable();
          }}
          className="basis-[120px] leading-none shrink-1"
        />
      );
  } else {
    type === "editor" &&
      handleDisable &&
      buttons.push(
        <IslandButton
          key={buttons.length}
          type="small"
          disabled={!hover}
          Icon={Undo}
          label="Retiré"
          onClick={() => {
            handleEnable && handleEnable();
          }}
          className="w-full leading-none shrink-1"
        />
      );
  }

  if (type === "creator") {
    buttons.push(
      <IslandButton
        key={buttons.length}
        type="small"
        disabled={!hover}
        Icon={Maximize}
        onClick={() => {
          handleOpenDetail && handleOpenDetail();
        }}
        className="w-full leading-none shrink-1"
      />
    );
  }

  useEffect(() => {
    if (hover) {
      type !== "creator" && videoRef.current && videoRef.current.play();
    } else {
      if (videoRef.current) {
        type !== "creator" && videoRef.current.pause();
        type !== "creator" &&
          setTimeout(() => {
            if (videoRef.current) videoRef.current.currentTime = 0;
          }, 300);
      }
    }
  }, [hover]);

  return (
    <div
      className={`model group bg-dashboard-button-dark rounded-dashboard-button-square-radius overflow-hidden border border-transparent ${
        active ? "hover:border-dashboard-button-stroke-hover" : ""
      } focus-within:outline-blueBerry`}
      onMouseOver={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
    >
      <div className={`model__image w-full relative h-0 ${imgRatio}`}>
        {type === "creator" && (
          <div
            className="absolute flex flex-col justify-end gap-dashboard-button-separation-spacing p-[18px] top-0 left-0 w-full h-full z-20 bg-blackBerry bg-opacity-80 backdrop-blur opacity-0 group-hover:opacity-100 transition-opacity duration-400"
            onClick={() => {
              isMobile && handleOpenDetail && handleOpenDetail();
            }}
          >
            <div className="flex flex-col gap-dashboard-mention-padding-top-bottom">
              <div className="text-base text-dashboard-text-title-white-high">
                {video.title}
              </div>
              <div className="text-dashboard-text-description-base text-base">
                {video.user_info.data.attributes.f_name}{" "}
                {video.user_info.data.attributes.l_name}
              </div>
            </div>

            <div className="flex gap-dashboard-button-separation-spacing">
              {buttons}
            </div>
          </div>
        )}
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt=""
            fill
            className="object-cover group-hover:opacity-0 transition-opacity duration-500 z-10"
          />
        ) : (
          <></>
        )}

        {video.video && video.video.data && (
          <div className="absolute h-full w-full z-0">
            <Video
              video={video.video.data.attributes}
              ref={videoRef}
              noPlayer
              className="h-full"
            />
          </div>
        )}
      </div>

      {type === "editor" && (
        <div
          className={`model-infos flex flex-col gap-dashboard-button-separation-spacing p-dashboard-button-separation-spacing ${
            active
              ? "text-dashboard-text-title-white-high"
              : "text-dashboard-text-disabled"
          }`}
        >
          <div>{video.title}</div>

          <div>{video.length}</div>
          <div className="flex gap-dashboard-button-separation-spacing">
            {buttons}
          </div>
        </div>
      )}
    </div>
  );
};
