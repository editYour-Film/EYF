import { H2 } from "../_shared/typography/H2";
import { useInView } from "react-intersection-observer";
import { Title } from "../_shared/Title";
import { VideoSlider } from "./VideoSlider";
import useMediaQuery from "@/hooks/useMediaQuery";
import { useRef, createRef, useEffect, useState, forwardRef } from "react";
import PlayButton from "../../../public/icons/play.svg";
import { AdvancedVideo } from "@cloudinary/react";
import { CloudinaryVideo } from "@cloudinary/url-gen";
import { Video } from "../model/videos";

type ConfidenceSectionProps = {
  videos: Video[];
  data: any;
};

export interface videoInterface {
  id: number;
  title: string;
  madeBy: string;
  path: string;
  thumbnail: string;
  type: string;
  isMobile: boolean;
  profilePath?: string;
  publicId: string;
}

export const ConfidenceSection = ({ videos, data }: ConfidenceSectionProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  const isMobile = useMediaQuery("(max-width: 768px)");

  const [vids, setVids] = useState<videoInterface[]>([]);

  useEffect(() => {
    const _vids: videoInterface[] = [];
    const _cld: any = [];
    data.videos.forEach((item: any) => {
      _vids.push({
        id: item.id,
        title: item.title,
        madeBy: item.creator,
        path: item.video.data?.attributes.url,
        thumbnail: item.thumbnail.data?.attributes.formats.small.url,
        type: "",
        isMobile: false,
        profilePath: "#",
        publicId:
          "" /*item.video.data?.attributes.provider_metadata.public_id*/,
      });
    });

    setVids(_vids);
  }, [data]);

  return (
    <div ref={ref} className={`md:pb-20 ${inView ? " inView" : ""}`}>
      <div className="mt-32 flex flex-col items-center text-center md:pb-16 px-5 md:px-0">
        {isMobile ? (
          <span className="text-violet text-[22px] font-medium md:text-xl flex items-start gap-5">
            {data.section_title}
          </span>
        ) : (
          <H2 arrow className="text-[22px] md:text-[22px] font-medium" fake>
            {data.section_title}
          </H2>
        )}
        <Title titleType="h1" anim className="mt-7 leading-[110%]" fake>
          {data.title1}
        </Title>
        <Title
          titleType="h1"
          anim
          className="mt-2 opacity-50 mb-6 text-[32px] leading-[110%]"
          fake
        >
          {data.title2}
        </Title>
      </div>
      {vids.length && (
        <div className="mt-14">
          {isMobile ? (
            <VideoGrid videos={vids} />
          ) : (
            <VideoSlider videos={vids} />
          )}
        </div>
      )}
    </div>
  );
};

type VideoGridProps = {
  videos: Array<videoInterface>;
};

const VideoGrid = ({ videos }: VideoGridProps) => {
  const videosRef = useRef<any>([]);
  videosRef.current = videos.map(
    (element, i) =>
      videosRef.current[i] ?? createRef<React.Ref<HTMLVideoElement>>()
  );

  return (
    <div className="grid grid-cols-3 gap-4">
      {videos.map((video, i) => {
        return <VideoVignet videoInfo={video} key={i}></VideoVignet>;
      })}
      {videos.length < 9 &&
        [...Array(9 - videos.length).keys()].map((el, i) => {
          return (
            <div
              key={i}
              className="relative rounded-lg pb-[117%] h-0 border overflow-hidden bg-white opacity-20"
            ></div>
          );
        })}
    </div>
  );
};

type videoVignetProps = {
  videoInfo: videoInterface;
};

const VideoVignet = ({ videoInfo }: videoVignetProps) => {
  const video = useRef<HTMLVideoElement>(null);

  const [isOpen, setIsOpen] = useState(false);

  const formatVideoDuration = (duration: number) => {
    var mzminutes = Math.floor(duration / 60);
    var mzseconds = Math.floor(duration - mzminutes * 60);
    return mzminutes + ":" + (mzseconds < 10 ? "0" + mzseconds : mzseconds);
  };

  const handleClick = (videoRef: any) => {
    setIsOpen(!isOpen);
  };

  const requestFullscreenVideo = (videoRef: any) => {
    if (videoRef.requestFullscreen) {
      videoRef.requestFullscreen();
      videoRef.classList.remove("object-cover");
    } else {
      videoRef.webkitEnterFullscreen();
    }
  };

  const [videoDuration, setVideoDuration] = useState<string>();

  useEffect(() => {
    if (isOpen) {
      requestFullscreenVideo(video.current);
    }
  }, [isOpen]);

  const handleFullscreenChange = () => {
    if (!document.fullscreenElement) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    let videoRef = video.current;

    if (videoRef) {
      videoRef.addEventListener("fullscreenchange", handleFullscreenChange);
      videoRef.addEventListener("loadedmetadata", () => {
        setVideoDuration(formatVideoDuration(videoRef!.duration));
      });
    }

    return () => {
      videoRef &&
        videoRef.removeEventListener(
          "fullscreenchange",
          handleFullscreenChange
        );
    };
  }, []);

  return (
    <div
      className="relative rounded-lg pb-[117%] h-0 border overflow-hidden"
      onClick={() => {
        handleClick(video.current);
      }}
    >
      {videoInfo && (
        <video
          ref={video}
          className={`absolute top-0 left-0 w-full h-full z-0 ${
            !isOpen && "object-cover"
          }`}
        >
          <source src="" />
        </video>
      )}
      <div className="overlay absolute top-0 left-0 w-full h-full flex flex-col justify-center object-cover items-center z-10">
        <PlayButton />
        <div>{videoDuration}</div>
      </div>
    </div>
  );
};
