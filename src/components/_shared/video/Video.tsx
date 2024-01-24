import { RefObject, forwardRef, useEffect, useRef, useState } from "react";
import { Player } from "./Player";

type VideoProps = {
  video: any;
  defaultPlayer?: boolean;
  playerFullWidth?: boolean;
  noPlayer?: boolean;
  className?: string;
  hFull?: boolean;
  onLoadedMetadata?: () => void;
  onPlay?: () => void; 
  onPause?: () => void; 
  trigger?: boolean;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
};

export const Video = forwardRef<HTMLVideoElement, VideoProps>(function Video(
  {
    video,
    defaultPlayer = false,
    playerFullWidth = false,
    noPlayer = false,
    className,
    hFull,
    onLoadedMetadata,
    onPlay,
    onPause,
    trigger,
    autoPlay,
    muted,
    loop,
  },
  ref
) {
  const [isPlaying, setIsPlaying] = useState(false);
  const createdRef = useRef<HTMLVideoElement>(null);
  const videoEl = (ref as RefObject<HTMLVideoElement>) ?? createdRef;
  const [currentTime, setCurrentTime] = useState<number | undefined>(0);
    
  const handlePause = () => {
    onPause && onPause()
    videoEl.current && videoEl.current.pause();
  };

  const handlePlay = () => {    
    onPlay && onPlay()
    videoEl.current && videoEl.current.play();
  };

  const handleTrackClick = (progress: number) => {
    videoEl.current!.currentTime = progress * videoEl.current!.duration;
  };

  const handleClick = () => {
    if (isPlaying) {
      handlePause()
    } else {
      handlePlay()
    }
  };

  const handleTimeUpdate = () => {
    setCurrentTime(videoEl.current?.currentTime);
  };

  useEffect(() => {  
    if (trigger || autoPlay) {
      handlePlay()
    } else {
      handlePause()
    }
  }, [trigger, autoPlay])

  return (
    <div
      className={`video group relative w-full ${hFull ? "h-full" : "h-auto"} ${
        className ?? ""
      }`}
    >
      <video
        ref={videoEl}
        className={`video relative w-full h-full object-cover z-0`}
        controls={(defaultPlayer && !noPlayer)}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        onClick={(e) => {
          e.preventDefault();
          handleClick();
        }}
        onPlay={(e) => {
          setIsPlaying(true);
        }}
        onPause={() => {
          setIsPlaying(false);
        }}
        onTimeUpdate={(e) => {
          handleTimeUpdate();
        }}
        onLoadedMetadata={() => {
          onLoadedMetadata && onLoadedMetadata();
        }}
      >
        {video.url ? (
          <source src={video.url} type={video.mime} />
        ) : (
          video.data && (
            <source
              src={video.url}
              type={video.mime}
            />
          )
        )}
      </video>

      {(!defaultPlayer && !noPlayer) && (
        <>
          <Player
            isPlaying={isPlaying}
            duration={videoEl.current && videoEl.current?.duration}
            currentTime={currentTime}
            onPause={() => {
              handlePause();
            }}
            onPlay={() => {
              handlePlay();
            }}
            onTrackClick={(e) => {
              handleTrackClick(e);
            }}
            className={`absolute z-10 ${
              playerFullWidth
                ? "w-full px-dashboard-button-separation-spacing"
                : "w-1/2"
            } bottom-dashboard-button-separation-spacing left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-80 transition-opacity duration-500`}
          />
          <div className="player-bg player-bg-gradient pointer-events-none absolute w-full h-full top-0 left-0 opacity-0 group-hover:opacity-80 transition-opacity duration-500"></div>
        </>
      )}
    </div>
  );
});
