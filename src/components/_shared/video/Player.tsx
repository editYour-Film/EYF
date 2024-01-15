import { useEffect, useRef, useState } from "react"

import PlayIcon from '@/icons/player-play.svg'
import PauseIcon from '@/icons/pause.svg'
import { getDurationFromTime } from "@/utils/Video"
import gsap from "gsap"
import { useWindowSize } from "@uidotdev/usehooks"

type PlayerProps = {
  isPlaying: boolean,
  onPlay: () => void,
  onPause: () => void,
  onTrackClick: (progress:number) => void,
  duration: number | null,
  currentTime: number | undefined,
  className?: string
}

export const Player = ({isPlaying, onPlay, onPause, onTrackClick, duration = 0, currentTime = 0, className}: PlayerProps) => {
  const windowS = typeof window !== 'undefined' ? useWindowSize() : undefined
  const trackButton = useRef<HTMLDivElement>(null)
  const trackPlayed = useRef<HTMLDivElement>(null)
  const trackParent = useRef<HTMLDivElement>(null)
  
  const timingFromEnd = duration ? getDurationFromTime(Math.abs(-Math.ceil(duration) + Math.ceil(currentTime))) : null
  const timingFromStart = duration ? getDurationFromTime(Math.ceil(currentTime)) : null

  const progress = duration ? currentTime / duration : 0

  const handleTooglePlayback = () => {
    if( isPlaying ) {
      onPause();
    } else {
      onPlay();
    }
  }

  useEffect(() => {    
    gsap.set(trackPlayed.current, {
      xPercent: progress * 100 - 100
    })

    gsap.set(trackButton.current, {
      x: (progress) * trackParent.current!.offsetWidth
    })

  }, [progress, windowS])

  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const normalizedClickedProgress = e.nativeEvent.offsetX / trackParent.current!.offsetWidth;    
    onTrackClick && onTrackClick(normalizedClickedProgress)
  }

  return (
    <div className={`video_player flex flex-col items-center gap-[20px] ${className ?? ''}`}>
      
      <button
        className="video__play-button group w-[47px] h-[47px] border border-transparent bg-dashboard-button-white-default rounded-full flex justify-center items-center hover:border-dashboard-button-stroke-hover"
        onClick={ () => { handleTooglePlayback() } }
      >
        {isPlaying 
          ? <PauseIcon className='w-1/3' /> 
          : <PlayIcon className='w-1/3 translate-x-[2px]' />}
      </button>

      <div className="w-full relative">
        <div
         ref={trackParent}
         onClick={(e) => { 
            e.stopPropagation()
            handleTrackClick(e) 
          }}
          className="absolute top-0 left-0 w-full h-full -translate-y-1/2 z-20"
        >
        </div>
        <div 
          className="video__track relative w-full h-[4px]"
        >
          <div ref={trackButton} className="video__track-button absolute h-full z-10">
            <div className="relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[13px] h-[13px] rounded-full bg-dashboard-text-title-white-high"></div>
          </div>

          <div className="relative w-full h-full bg-neutral-02 rounded-full overflow-hidden">
            <div ref={trackPlayed} className="video__track-played absolute w-full h-full z-0 bg-blueBerry"></div>
          </div>

        </div>

        <div className="video__timings w-full flex justify-between mt-[6px]">
          {timingFromStart && <div className="text-neutral-01 text-small">{timingFromStart.mmss}</div>}
          {timingFromEnd && <div className="text-neutral-01 text-small">-{timingFromEnd.mmss}</div>}
        </div>
      </div>
      
    </div>
  )
}