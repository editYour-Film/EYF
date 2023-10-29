import { Video as VideoType} from "@/components/model/videos"
import { useRef, useState } from "react"
import { Player } from "./Player"

type VideoProps = {
  video: string,
  defaultPlayer?: boolean,
  className?: string
}

export const Video = ({video, defaultPlayer = false, className}:VideoProps) => {
  const [isPlaying, setIsPlaying] = useState(false)
  
  const videoEl = useRef<HTMLVideoElement>(null)
  const [currentTime, setCurrentTime] = useState<number | undefined>(0)

  const handlePause = () => {
    videoEl.current && videoEl.current.pause()
  }

  const handlePlay = () => {
    videoEl.current && videoEl.current.play()
  }

  const handleTrackClick = (progress: number) => {    
    videoEl.current!.currentTime = progress * videoEl.current!.duration
  }

  const handleClick = () => {
    if (isPlaying) {
      videoEl.current && videoEl.current.pause()
    } else {
      videoEl.current && videoEl.current.play()
    }
  }

  const handleTimeUpdate = () => {
    setCurrentTime(videoEl.current?.currentTime)
  }

  return (
    <div className={`video group w-full h-full ${className ?? ''}`}>
      <video 
        ref={videoEl}
        className={`video relative w-full h-full object-cover z-0`} src={video}
        controls={defaultPlayer}

        onClick={(e) => {
          e.preventDefault()
          handleClick()
        }}

        onPlay={(e) => {
          setIsPlaying(true)
        }}

        onPause={() => {
          setIsPlaying(false)
        }}

        onTimeUpdate={(e) => {
          handleTimeUpdate()
        }}
      >
      </video>

      {
        !defaultPlayer && 
        <>
          <Player 
            isPlaying={isPlaying}
            duration={videoEl.current && videoEl.current?.duration}
            currentTime={currentTime}
            onPause={() => { handlePause() }}
            onPlay={() => { handlePlay() }}
            onTrackClick={(e) => { handleTrackClick(e) }}
            className='absolute z-10 w-1/2 bottom-0 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-80 transition-opacity duration-500'
          />
          <div className="player-bg player-bg-gradient pointer-events-none absolute w-full h-full top-0 left-0 opacity-0 group-hover:opacity-80 transition-opacity duration-500">

          </div>
        </>
      }
    </div>

  )
}