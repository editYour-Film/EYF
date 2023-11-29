import { useEffect, useRef, useState } from "react";
import { IslandButton } from "../buttons/IslandButton";
import { ModelsProps } from "./ModelLarge";
import Image from "next/image";
import Undo from '@/icons/undo.svg'
import { Video } from "./Video";
interface ModelProps extends ModelsProps {
  active: boolean;
}

export const Model = ({
  active,
  video,
  thumbnail,
  handleModify,
  handleDisable,
  handleDelete,
  handleSetHighlighted,
  handleEnable,
}: ModelProps) => {
  const [hover, setHover] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
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

  useEffect(() => {
    if (hover) {      
      videoRef.current && videoRef.current.play()
    } else {
      if (videoRef.current) {
        videoRef.current.pause()
        setTimeout(() => { if (videoRef.current) videoRef.current.currentTime = 0 }, 500)
      }
    }
  }, [hover])

  return (
    <div
      className={`model group bg-dashboard-button-dark md:rounded-dashboard-button-square-radius overflow-hidden border border-transparent ${
        active ? "hover:border-dashboard-button-stroke-hover" : ""
      } focus-within:outline-blueBerry`}
      onMouseOver={() => {
        setHover(true)
      }}
      onMouseLeave={() => {
        setHover(false)
      }}
    >
      <div className={`model__image w-full relative h-0 ${imgRatio}`}>
        {thumbnail ? (
          <Image src={thumbnail} alt="" fill className="object-cover group-hover:opacity-0 transition-opacity duration-500 z-10" />
        ) : (
          <></>
        )}

        <div className="relative h-full w-full z-0">
          <Video
            video={video.video}
            ref={videoRef}
            noPlayer
          />
        </div>
      </div>

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
    </div>
  );
};
