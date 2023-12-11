import { useInView } from "react-intersection-observer";
import { VideoSlider } from "./VideoSlider";
import useMediaQuery from "@/hooks/useMediaQuery";
import { useRef, createRef, useEffect, useState } from "react";
import PlayButton from "../../../public/icons/play.svg";
import { Video } from "../model/videos";
import { formatVideoDuration } from "@/utils/utils";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ClassicContent } from "../_shared/UI/ClassicContent";
import { appearBottom } from "@/Animations/appearBottom";
import gsap from "gsap";

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
  const slider = useRef<HTMLDivElement>(null)
  const tl = useRef<GSAPTimeline>()

  useEffect(() => {
    const _vids: videoInterface[] = [];
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

  useEffect(() => {
    const ctx = gsap.context(() => {
      tl.current = appearBottom({elmts:slider.current, rotateX: true}).pause()
    })

    const trigger = ScrollTrigger.create({
      trigger: slider.current,
      start: `top-=${200} bottom`,
      end: 'bottom bottom',
      id: 'slider',
      onUpdate: (self) => {
        tl.current && tl.current.progress(self.progress)
      }
    })

    return () => {
      ctx.revert()
      trigger.kill()
    }
  }, [inView])

  return (
    <div ref={ref} className={`${inView ? " inView" : ""}`}>
      <ClassicContent 
        className="flex flex-col items-center text-center px-5 md:px-0 max-w-[660px] mx-auto"
        suptitle={data.section_title}
        title={data.title1 + data.title2}
        titleClassName="text-title-medium font-medium"
        titleType="h2"
      />
      {vids.length && (
        <div className="mt-dashboard-spacing-element-medium perspective">
          {isMobile ? (
            <VideoGrid videos={vids} />
          ) : (
            <div
              ref={slider}
            >
              <VideoSlider videos={vids} />
            </div>
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
